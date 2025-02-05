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

  const id = user.id;

  const eoIdNumber = Number(id);

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

// export const getTotalSeatbyId = async (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   try {
//     const totalSeats = await prisma.payment.count();

//     return res.status(200).json({ totalSeats });
//   } catch (err) {
//     return res
//       .status(500)
//       .json({ error: 'Internal Server Error', details: err });
//   }
// };

export const getTotalSeat = async (req: Request, res: Response) => {
  const user = req.user as User;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const eoId = user.id;

  try {
    // Count successful payments made by this event organizer (EO)
    const successfulPayments = await prisma.payment.count({
      where: {
        userId: parseInt(eoId), // Use the EO's ID from JWT
        is_paid: true, // Ensure payment is successful
      },
    });

    return res.status(200).json({
      totalSeats: successfulPayments, // Return the count
      eventId: eoId, // Return EO's ID for reference
    });
  } catch (err) {
    console.error('Error fetching total seats:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getRevenuePayment = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const userId = req.user?.id; // Extract user ID from JWT
    const eoId = user.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const totalPayment = await prisma.payment.aggregate({
      where: {
        userId: parseInt(eoId), // Filter payments by user ID
      },
      _sum: {
        price_paid: true,
      },
    });

    return res
      .status(200)
      .json({ totalPayment: totalPayment._sum.price_paid || 0 });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', details: err });
  }
};

export const getMostPopularEvent = async (req: Request, res: Response) => {
  const user = req.user as User;
  const eoId = user.id;
  try {
    const userId = req.user?.id; // Extract user ID from JWT

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const popularEvent = await prisma.payment.groupBy({
      by: ['eventId'],
      where: { userId: parseInt(eoId) }, // Filter payments by user ID
      _count: { eventId: true },
      orderBy: { _count: { eventId: 'desc' } },
      take: 1,
    });

    if (popularEvent.length === 0) {
      return res.status(404).json({ message: 'No events found' });
    }

    const event = await prisma.event.findUnique({
      where: { id: popularEvent[0].eventId },
      select: { id: true, title: true, date: true },
    });

    return res.status(200).json({ event });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', details: err });
  }
};

// export const getGrafikData = async (req: Request, res: Response) => {
//   try {
//     // Query payments, grouping by eventId and created_at (date only, no time)
//     const grafikData = await prisma.payment.groupBy({
//       by: ['eventId', 'created_at'], // Group by eventId and created_at
//       _count: {
//         id: true, // Count the number of payments (by the id field)
//       },
//       orderBy: {
//         created_at: 'asc', // Sort by created_at ascending
//       },
//     });

//     // Log grafikData to debug
//     console.log(grafikData);

//     // Define the type of the accumulator object explicitly
//     type Accumulator = {
//       [key: number]: { date: string; paymentCount: number }[]; // Event ID as key, array of {date, paymentCount}
//     };

//     // Prepare a response structure where each event has a list of dates and counts
//     const formattedData = grafikData.reduce<Accumulator>((acc, item) => {
//       const eventId = item.eventId;
//       const date = item.created_at.toISOString().split('T')[0]; // Extract date (no time)
//       const paymentCount = item._count.id;

//       // Initialize the event if not already in the accumulator
//       if (!acc[eventId]) {
//         acc[eventId] = [];
//       }

//       // Push the count for this date into the event's array
//       acc[eventId].push({
//         date,
//         paymentCount,
//       });

//       return acc;
//     }, {});

//     // Fetch events to include in the response
//     const events = await prisma.event.findMany({
//       where: {
//         id: {
//           in: Object.keys(formattedData).map(Number), // Get eventIds from formattedData
//         },
//       },
//     });

//     // Combine events with their respective payment data
//     const finalData = events.map((event) => {
//       const eventPayments = formattedData[event.id] || []; // Get payment data for the event

//       return {
//         event,
//         payments: eventPayments, // Include the payment counts
//       };
//     });

//     // Send the formatted data as the response
//     res.json(finalData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to retrieve grafik data' });
//   }
// };

export const getGrafikData = async (req: Request, res: Response) => {
  try {
    // Fetch events along with their associated payments and count of payments
    const eventsWithPayments = await prisma.event.findMany({
      include: {
        payments: {
          select: {
            created_at: true,
            price_paid: true,
            is_paid: true,
          },
        },
      },
    });

    // Format the response to include payment counts
    const formattedData = eventsWithPayments.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      paymentCount: event.payments.length, // Count of payments
      payments: event.payments.map((payment) => ({
        date: payment.created_at.toISOString().split('T')[0], // Format date
        pricePaid: payment.price_paid,
        isPaid: payment.is_paid,
      })),
    }));

    // Send the formatted data as the response
    res.json(formattedData);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'Failed to retrieve events with payment counts' });
  }
};

// export const getGrafikData = async (req: Request, res: Response) => {
//   try {
//     // Fetch events along with their associated payments and count of payments
//     const eventsWithPayments = await prisma.event.findMany({
//       include: {
//         payments: {
//           select: {
//             created_at: true,
//             price_paid: true,
//             is_paid: true,
//           },
//         },
//       },
//     });

//     // Format the response to include payment counts
//     const formattedData = eventsWithPayments.map((event) => ({
//       id: event.id,
//       title: event.title,
//       date: event.date,
//       paymentCount: event.payments.length, // Count of payments
//       payments: event.payments.map((payment) => ({
//         date: payment.created_at.toISOString().split('T')[0], // Format date
//         pricePaid: payment.price_paid,
//         isPaid: payment.is_paid,
//       })),
//     }));

//     // Send the formatted data as the response
//     res.json(formattedData);
//     console.log('formattedData', formattedData);
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .json({ error: 'Failed to retrieve events with payment counts' });
//   }
// };

export const getGrafikData2 = async (req: Request, res: Response) => {
  try {
    // Fetch events along with their associated payments and count of payments
    // const eventsWithPayments = await prisma.event.findMany({
    //   include: {
    //     payments: {
    //       select: {
    //         created_at: true,
    //         price_paid: true,
    //         is_paid: true,
    //       },
    //     },
    //   },
    // });

    // // Format the response to include payment counts
    // const formattedData = eventsWithPayments.map((event) => ({
    //   id: event.id,
    //   title: event.title,
    //   date: event.date,
    //   paymentCount: event.payments.length, // Count of payments
    //   payments: event.payments.map((payment) => ({
    //     date: payment.created_at.toISOString().split('T')[0], // Format date
    //     pricePaid: payment.price_paid,
    //     isPaid: payment.is_paid,
    //   })),
    // }));

    const formattedData = await prisma.$queryRaw`
    select * from (
    select substr(to_char(date_trunc('day',p."created_at"),'YYYY-MM-DD'),0,11) name,sum(p.price_paid)::numeric data  from events e, payments p 
where p."eventId" = e.id
and e.created_by = ${Number(req.user?.id)}
group by substr(to_char(date_trunc('day',p."created_at"),'YYYY-MM-DD'),0,11))
order by name
    `;
    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: 'Failed to retrieve events with payment counts' });
  }
};
