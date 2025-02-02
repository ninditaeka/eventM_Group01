import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type User = {
  email: string;
  role: string;
  id: string;
};

export const validateCheckout = async (req: Request, res: Response) => {
  console.log(`checkout validate 6`);

  const { eventId } = req.body;
  const user = req.user as User;

  if (isNaN(eventId)) {
    console.log(`checkout validate 1`);
    return res.status(400).json({ message: 'Invalid eventId' });
  }

  const dataEvent = await prisma.event.findUnique({
    where: { id: eventId },
    select: { total_seat: true, total_transaction_discount: true, price: true },
  });

  if (!dataEvent) {
    console.log(`checkout validate 2`);
    return res.status(404).json({ message: 'Event not found' });
  }

  let isUserHasDiscountCoupon = false;
  let isDiscountReachLimit = false;

  // Step 1: Check for discount coupon
  const discountCoupon = await prisma.discount_coupon.findFirst({
    where: {
      userId: parseInt(user.id),
      action: 'credit',
      expired_date: {
        gte: new Date(), // Check if not expired
      },
    },
  });

  //cari event.id di

  if (discountCoupon) {
    isUserHasDiscountCoupon = true;
    // console.log(`checkout validate 4`);
    // return res
    //   .status(400)
    //   .json({ message: 'No valid discount coupon available.' });
  }

  // Step 2: Check total transaction discount in the event
  if (dataEvent.total_transaction_discount <= 0) {
    // console.log(`checkout validate 5`);
    // return res
    //   .status(400)
    //   .json({ message: 'No available transaction discount for this event.' });
  }

  if (dataEvent.price) {
    const discountNominalUse = Math.floor(dataEvent.price * 0.1); // Assuming 10% discount
    const finalPrice = dataEvent.price - discountNominalUse;
  }

  // Step 3: Calculate discount nominal

  // Step 4: Update total transaction discount
  // await prisma.event.update({
  //   where: { id: eventId },
  //   data: {
  //     total_transaction_discount: dataEvent.total_transaction_discount - 1,
  //   },
  // });

  // Step 5: Create new discount coupon entry
  await prisma.discount_coupon.create({
    data: {
      discount: '0', // Assuming discount is 0 after use
      userId: parseInt(user.id),
      action: 'credit',
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  // Step 6: Calculate point balance
  const dataPointBalanceAvailable = await prisma.point_balance.aggregate({
    _sum: {
      point: true, // Sum of points
    },
    where: {
      userId: parseInt(user.id), // Filter by the user ID
      expired_date: {
        gte: new Date(), // Ensure points are not expired
      },
      action: 'credit', // Points are available only if the action is "credit"
    },
  });

  const totalPoints = dataPointBalanceAvailable._sum.point || 0;
  console.log(`Total points available: ${totalPoints}`);

  // Step 7: Calculate final price
  let finalCheckoutPrice = 0;
  if (totalPoints > 0) {
    finalCheckoutPrice -= totalPoints; // Subtract total points from price
  }

  // Apply discount if available
  // if (discountNominalUse > 0) {
  //   finalCheckoutPrice -= discountNominalUse; // Subtract discount amount from price
  // }

  // Ensure final price is not negative
  finalCheckoutPrice = Math.max(finalCheckoutPrice, 0);

  // Step 8: Create checkout record
  // const newCheckout = await prisma.checkout.create({
  //   data: {
  //     quantity: 1,
  //     price: price,
  //     point_balance_use: totalPoints ?? null,
  //     discount_nominal_use: discountNominalUse ?? null,
  //     final_price: finalCheckoutPrice ?? null,
  //     eventId: eventId,
  //     userId: parseInt(user.id), // Make sure to pass the correct userId
  //   },
  // });

  // console.log(`Checkout created: ${JSON.stringify(newCheckout)}`);

  return res.status(200).json({
    status: 'success',
    message: 'Checkout validate ',
    data: {
      quantity: 1,
      price: dataEvent.price,
      point_balance_use: totalPoints ?? null,
      // discount_nominal_use: discountNominalUse ?? null,
      // final_price: finalCheckoutPrice ?? null,
      eventId: eventId,
      userId: parseInt(user.id), // Ensure correct userId is passed
    },
  });
};

export const createCheckout = async (req: Request, res: Response) => {
  try {
    const {
      point_balance_use,
      discount_nominal_use,
      final_price,
      price,
      eventId,
    } = req.body;
    const user = req.user as User;
    const dataEvent = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        total_seat: true,
        total_transaction_discount: true,
        price: true,
      },
    });

    if (!dataEvent) {
      console.log(`checkout validate 2`);
      return res.status(404).json({ message: 'Event not found' });
    }

    const totalSeat = dataEvent.total_seat;
    const dataSeatBooked = await prisma.payment.count({
      where: { eventId: eventId },
    });

    const availableSeats = totalSeat - dataSeatBooked;
    if (availableSeats <= 0) {
      console.log(`checkout validate 3`);
      return res
        .status(400)
        .json({ message: 'No available seats for checkout' });
    }
    const newCheckout = await prisma.checkout.create({
      data: {
        quantity: 1,
        point_balance_use: point_balance_use,
        discount_nominal_use: discount_nominal_use,
        price: Number(dataEvent.price),
        final_price: price,
        userId: parseInt(user.id),
        eventId: eventId,
      },
    });

    res.status(200).json({
      status: 'success',
      data: newCheckout,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
      data: null,
    });
  }
};

export const getCheckoutById = async (req: Request, res: Response) => {
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

    console.log('test1');

    if (!checkout) {
      res.status(400).json({
        status: 'event not found',
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

export const getCheckoutByEOId = async (req: Request, res: Response) => {
  try {
    console.log('Received params:', req.params);

    const id = req.params.id;
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

    const data = await prisma.$queryRaw`
    WITH dataTransaction AS (
      SELECT 
        u.first_name, 
        u.last_name, 
        e.title, 
        e.id AS eventId, 
        c.id AS co_id,
        c.created_at
      FROM users u 
      JOIN checkouts c ON u.id = c."userId"
      JOIN events e ON c."eventId" = e.id
      WHERE e.created_by = ${eoIdNumber}
    )
    SELECT dt.*, p.is_paid
    FROM dataTransaction dt
    LEFT JOIN payments p 
    ON dt.co_id = p."checkoutId";
  `;

    console.log(`✅ Data fetched successfully:`, JSON.stringify(data, null, 2));

    res.status(200).json({
      status: 'success',
      message: 'Checkouts retrieved successfully',
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
      data: null,
    });
  }
};

// BE checkout create diperbaiki tntg beneran
// PR
// -connect BE FE Create checkout
// -bikin api validasiPreCheckout,
// skip point and discount
// get evet tampilin price
// -coonect BE FE validasi pre checkout

export const getPreCheckout = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }

    const preCheckout = await prisma.event.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        price: true,
      },
    });

    if (!preCheckout) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json(preCheckout);
  } catch (err) {
    console.error('Error fetching event:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
