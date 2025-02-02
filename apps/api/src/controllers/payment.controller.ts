import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPayment = async (req: Request, res: Response) => {
  // try {
  const { eventId, price_paid, checkoutId } = req.body;
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
          c.price
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

  const newPayment = await prisma.payment.create({
    data: {
      userId: parseInt(user.id),
      eventId: parseInt(dataCheckout[0].eventid),
      checkoutId: parseInt(dataCheckout[0].co_id),
      price_paid: parseInt(dataCheckout[0].price),
      is_paid: true,
    },
  });

  res.status(200).json({
    status: 'success',
    data: newPayment,
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
