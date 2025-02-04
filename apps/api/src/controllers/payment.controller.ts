import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPayment = async (req: Request, res: Response) => {
  // try {
  const { checkoutId } = req.body;
  const user = req.user as User;
  if (!user || !user.id) {
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }

  console.log('Received params:', req.body);

  const id = user.id;
  console.log(`Raw EOId: ${id}`);

  const eoIdNumber = Number(id);
  console.log(`Converted EOId: ${eoIdNumber}`);

  if (!eoIdNumber || isNaN(eoIdNumber)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid Event Organizer ID',
      data: null,
    });
  }

  const dataCheckout: [
    {
      eventid: any;
      co_id: any;
      price: any;
      final_price: any;
      discount_nominal_use: any;
      userid: any;
    },
  ] = await prisma.$queryRaw`
  
      WITH dataTransaction AS (
        SELECT 
          u.first_name, 
          u.last_name, 
          e.title, 
          e.id AS eventId, 
          c.id AS co_id,
          c.created_at,
          c.price,
          c.final_price,
          c.discount_nominal_use,
          c."userId" AS userId -- Ensure we fetch userId from checkout
        FROM users u 
        JOIN checkouts c ON u.id = c."userId"
        JOIN events e ON c."eventId" = e.id
        WHERE e.created_by = ${eoIdNumber} and c.id = ${checkoutId}
      )
      SELECT dt.*, p.is_paid
      FROM dataTransaction dt
      LEFT JOIN payments p 
      ON dt.co_id = p."checkoutId";
    `;

  console.log(
    `✅ Data fetched successfully:`,
    JSON.stringify(dataCheckout[0], null, 2),
  );
  console.log(`eventId: ${dataCheckout[0].eventid}`);

  console.log('eventId: ', dataCheckout[0].eventid);

  // const newPayment = await prisma.payment.create({
  //   data: {
  //     userId: parseInt(user.id),
  //     eventId: parseInt(dataCheckout[0].eventid),
  //     checkoutId: parseInt(dataCheckout[0].co_id),
  //     price_paid: parseInt(dataCheckout[0].final_price),
  //     is_paid: true,
  //   },
  // });

  if (!dataCheckout.length) {
    return res.status(404).json({ message: 'Checkout not found' });
  }

  // const eventId = parseInt(dataCheckout[0].eventid);
  // const discountNominalUse =
  //   parseFloat(dataCheckout[0].discount_nominal_use) || 0;
  // const discountUserId = parseInt(dataCheckout[0].user_id);

  const eventId = parseInt(dataCheckout[0].eventid);
  const discountNominalUse =
    parseFloat(dataCheckout[0].discount_nominal_use) || 0;
  const discountUserId = parseInt(dataCheckout[0].userid); // Now correctly fetching the userId from checkout

  console.log(
    '✅ Data fetched successfully:',
    JSON.stringify(dataCheckout[0], null, 2),
  );
  console.log(`eventId: ${eventId}`);

  // Start transaction
  const newPaymentResult = await prisma.$transaction(async (tx) => {
    // Create the payment
    const newPayment = await tx.payment.create({
      data: {
        userId: parseInt(user.id),
        eventId: eventId,
        checkoutId: parseInt(dataCheckout[0].co_id),
        price_paid: parseInt(dataCheckout[0].final_price),
        is_paid: true,
      },
    });

    // If a discount was used, validate `total_transaction_discount`
    if (discountNominalUse > 0) {
      // Get event total_transaction_discount
      const eventData = await tx.event.findUnique({
        where: { id: eventId },
        select: { total_transaction_discount: true },
      });

      if (!eventData) {
        throw new Error('Event not found');
      }

      // Count payments where checkout.voucher_activation_status = 'activate'
      const activeVoucherCount = await tx.payment.count({
        where: {
          eventId: eventId,
          checkout: { voucher_activation_status: 'activate' },
        },
      });

      console.log(
        `Checking discount availability: Event Discount: ${eventData.total_transaction_discount}, Active Vouchers: ${activeVoucherCount}`,
      );

      // Ensure `total_transaction_discount` is still available
      if (eventData.total_transaction_discount > activeVoucherCount) {
        // Update checkout to mark voucher as activated
        await tx.checkout.update({
          where: { id: parseInt(dataCheckout[0].co_id) },
          data: { voucher_activation_status: 'activate' },
        });

        // Create a new `discount_coupon` entry with `discount = 0` and `action = 'debit'`
        await tx.discount_coupon.create({
          data: {
            userId: parseInt(dataCheckout[0].userid),
            discount: '0%',
            action: 'debit',
            expired_date: new Date(), // Setting immediate expiration
          },
        });
      }
    }

    return newPayment;
  });

  res.status(200).json({
    status: 'success',
    data: newPaymentResult,
  });
};

//   catch (err) {
//     res.status(500).json({
//       status: 'error',
//       message: JSON.stringify(err),
//       data: null,
//     });
//   }
// };

export const getPaymenttById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const checkout = await prisma.checkout.findUnique({
      where: {
        id: id,
      },
      include: {
        event: {
          select: {
            title: true,
            price: true,
          },
        },
      },
    });

    if (!checkout) {
      res.status(400).json({
        status: 'check out not found',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: checkout,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
    });
  }
};
