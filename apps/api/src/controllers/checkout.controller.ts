import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { HttpStatusCode } from 'axios';

const prisma = new PrismaClient();

type User = {
  email: string;
  role: string;
  id: string;
};

type ICheckout = {
  data: {
    event?: { price: number };
    availableSeats?: number;
    discountNominalUse?: number;
    pointBalanceUse?: number;
    finalPrice?: number;
    quantity?: number;
    point_balance_use?: number;
    discount_nominal_use?: number;
    price?: number;
    final_price?: number;
  };
  HttpStatusCode: number;
  message?: string;
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

// export const createCheckout = async (req: Request, res: Response) => {
//   try {
//     const {
//       point_balance_use,
//       discount_nominal_use,
//       final_price,
//       price,
//       eventId,
//     } = req.body;
//     const user = req.user as User;
//     const dataEvent = await prisma.event.findUnique({
//       where: { id: eventId },
//       select: {
//         total_seat: true,
//         total_transaction_discount: true,
//         price: true,
//       },
//     });

//     if (!dataEvent) {
//       console.log(`checkout validate 2`);
//       return res.status(404).json({ message: 'Event not found' });
//     }

//     const totalSeat = dataEvent.total_seat;
//     const dataSeatBooked = await prisma.payment.count({
//       where: { eventId: eventId },
//     });

//     const availableSeats = totalSeat - dataSeatBooked;
//     if (availableSeats <= 0) {
//       console.log(`checkout validate 3`);
//       return res
//         .status(400)
//         .json({ message: 'No available seats for checkout' });
//     }
//     const newCheckout = await prisma.checkout.create({
//       data: {
//         quantity: 1,
//         point_balance_use: point_balance_use,
//         discount_nominal_use: discount_nominal_use,
//         price: Number(dataEvent.price),
//         final_price: price,
//         userId: parseInt(user.id),
//         eventId: eventId,
//       },
//     });

//     res.status(200).json({
//       status: 'success',
//       data: newCheckout,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 'error',
//       message: JSON.stringify(err),
//       data: null,
//     });
//   }
// };

// export const createCheckout = async (req: Request, res: Response) => {
//   // try {
//   const user = req.user as User;
//   const { eventId, discountNominalUse, pointBalanceUse, finalPrice } = req.body;
//   console.log('user', user);

//   if (!eventId) {
//     console.log('req.body', req.body);
//     return res.status(400).json({ message: 'Invalid event data' });
//   }

//   // Fetch event details
//   const dataEvent = await prisma.event.findUnique({
//     where: { id: eventId },
//     select: {
//       total_seat: true,
//       total_transaction_discount: true,
//       price: true,
//     },
//   });

//   if (!dataEvent) {
//     return res.status(404).json({ message: 'Event not found' });
//   }

//   // Count how many payments exist for this event (to determine booked seats)
//   const bookedSeats = await prisma.payment.count({
//     where: { eventId: eventId },
//   });

//   // Calculate available seats
//   const availableSeats = dataEvent.total_seat - bookedSeats;

//   // Ensure seats are available before proceeding
//   if (availableSeats <= 0) {
//     return res.status(400).json({ message: 'No available seats for checkout' });
//   }

//   const serviceResponse = (await preCheckoutValidation(req)) as ICheckout;
//   if (serviceResponse?.HttpStatusCode > 399) {
//     console.log('entry 2');
//     return res

//       .status(serviceResponse?.HttpStatusCode)
//       .json({ error: serviceResponse.message });
//   } else {
//     console.log('user1', user);
//     const newCheckout = await prisma.checkout.create({
//       data: {
//         quantity: 1,
//         point_balance_use: serviceResponse?.data.pointBalanceUse || 0,
//         discount_nominal_use: serviceResponse?.data.discountNominalUse || 0,
//         price: Number(serviceResponse?.data.price) || 1000, // Ensure event price is correctly passed
//         final_price: serviceResponse?.data.finalPrice || 0,
//         // userId: 100, // Convert user ID to number
//         // userId: parseInt(user.id), // Convert user ID to number
//         event: {
//           connect: { id: eventId },
//         },
//         user: {
//           connect: { id: parseInt(user.id) },
//         },
//       },
//     });

//     return res
//       .status(serviceResponse.HttpStatusCode)
//       .json({ data: newCheckout, statuscode: serviceResponse?.HttpStatusCode });
//   }
// };

export const createCheckout = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: 'Invalid event data' });
    }

    // Fetch event details
    const dataEvent = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        total_seat: true,
        total_transaction_discount: true,
        price: true,
      },
    });

    if (!dataEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Count booked seats
    const bookedSeats = await prisma.payment.count({
      where: { eventId },
    });

    // Calculate available seats
    const availableSeats = dataEvent.total_seat - bookedSeats;

    if (availableSeats <= 0) {
      return res
        .status(400)
        .json({ message: 'No available seats for checkout' });
    }

    // Validate checkout logic before proceeding
    const serviceResponse = (await preCheckoutValidation(req)) as ICheckout;
    if (serviceResponse?.HttpStatusCode > 399) {
      return res
        .status(serviceResponse?.HttpStatusCode)
        .json({ error: serviceResponse.message });
    }

    // Start transaction
    console.log('service response', serviceResponse);
    const result = await prisma.$transaction(async (tx) => {
      // Create checkout entry
      const newCheckout = await tx.checkout.create({
        data: {
          quantity: 1,
          point_balance_use: serviceResponse?.data.pointBalanceUse || 0,
          discount_nominal_use: serviceResponse?.data.discountNominalUse || 0,
          price: Number(serviceResponse?.data?.event?.price) || 1000,
          final_price: serviceResponse?.data.finalPrice || 0,
          event: { connect: { id: eventId } },
          user: { connect: { id: parseInt(user.id) } },
        },
      });

      // If a discount is applied, decrement `total_transaction_discount`
      // if (serviceResponse?.data.discountNominalUse ?? 0 > 0) {
      //   await tx.event.update({
      //     where: { id: eventId },
      //     data: {
      //       total_transaction_discount: {
      //         decrement: 1,
      //       },
      //     },
      //   });
      // }

      // If points are used, update the user's point balance
      if (serviceResponse?.data.pointBalanceUse ?? 0 > 0) {
        await tx.point_balance.create({
          data: {
            userId: parseInt(user.id),
            point: -(serviceResponse?.data.pointBalanceUse ?? 0), // Deduct points
            action: 'debit',
            expired_date: new Date(), // Assuming immediate deduction
          },
        });
      }

      return newCheckout;
    });

    return res.status(serviceResponse.HttpStatusCode).json({
      data: result,
      statuscode: serviceResponse?.HttpStatusCode,
    });
  } catch (err) {
    console.error('Error in createCheckout:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      error: err,
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

export const getCheckoutByParticipantId = async (
  req: Request,
  res: Response,
) => {
  try {
    console.log('Received params:', req.params);

    const userId = req.params.id; // Extract user ID from request params
    console.log(`Raw userId: ${userId}`);

    const userIdNumber = Number(userId);
    console.log(`Converted userId: ${userIdNumber}`);

    if (!userIdNumber || isNaN(userIdNumber)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid User ID',
        data: null,
      });
    }

    // Fetch checkouts by user ID
    const data = await prisma.$queryRaw`
      SELECT 
      u.first_name,
        u.last_name,
        c.id AS checkout_id,
        c.created_at,
        e.title AS event_title,
        e.id AS event_id,
        p.is_paid
      FROM checkouts c
      JOIN events e ON c."eventId" = e.id
      JOIN users u ON c."userId" = u.id  -- Fetch user details
      LEFT JOIN payments p ON c.id = p."checkoutId"
      WHERE c."userId" = ${userIdNumber};
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

// export const getPreCheckout = async (req: Request, res: Response) => {
//   try {
//     const id = Number(req.params.id);

//     if (isNaN(id)) {
//       return res.status(400).json({ error: 'Invalid event ID' });
//     }

//     const preCheckout = await prisma.event.findUnique({
//       where: {
//         id: id,
//       },
//       select: {
//         id: true,
//         title: true,
//         price: true,
//       },
//     });

//     if (!preCheckout) {
//       return res.status(404).json({ error: 'Event not found' });
//     }

//     res.status(200).json(preCheckout);
//   } catch (err) {
//     console.error('Error fetching event:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
// export const getPreCheckout = async (req: Request, res: Response) => {
//   try {
//     const eventId = Number(req.params.id);
//     // const userId = req.user?.id; // Assuming authentication middleware attaches user info
//     console.log('eventiD :', eventId);
//     const userId = (req.user as User).id;
//     console.log('userID :', userId);

//     if (isNaN(eventId)) {
//       return res.status(400).json({ error: 'Invalid event ID' });
//     }

//     // Fetch Event Details
//     const event = await prisma.event.findUnique({
//       where: { id: eventId },
//       select: { id: true, title: true, price: true },
//     });

//     if (!event) {
//       return res.status(404).json({ error: 'Event not found' });
//     }

//     // Fetch Discount Coupon and Point Balance in parallel
//     const [discountCoupon, pointBalances] = await Promise.all([
//       prisma.discount_coupon.findFirst({
//         where: {
//           userId: Number(userId),
//           expired_date: { gte: new Date() }, // Only valid discounts
//           action: 'credit', // Must be a credit discount
//         },
//         orderBy: { created_at: 'desc' }, // Get the latest valid discount
//       }),
//       prisma.point_balance.findMany({
//         where: {
//           userId: Number(userId),
//           expired_date: { gte: new Date() }, // Only valid points
//           action: 'credit', // Only sum credit points
//         },
//       }),
//     ]);

//     // Calculate Discount Nominal Use
//     let discountNominalUse = 0;
//     if (discountCoupon) {
//       discountNominalUse = event.price ? event.price * 0.1 : 0; // 10% discount
//     }

//     // Calculate Point Balance Use
//     let pointBalanceUse = pointBalances.reduce(
//       (sum, p) => sum + (p.point || 0),
//       0,
//     );

//     // Calculate Final Price
//     const finalPrice =
//       (event.price || 0) - discountNominalUse - pointBalanceUse;

//     res.status(200).json({
//       eventId: event.id,
//       title: event.title,
//       price: event.price,
//       discountNominalUse,
//       pointBalanceUse,
//       finalPrice,
//     });
//   } catch (err) {
//     console.error('Error fetching pre-checkout details:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export const getPreCheckout = async (req: Request, res: Response) => {
//   try {
//     const eventId = Number(req.params.id);
//     const userId = req.user?.id; // Assuming user ID is available in the request

//     if (isNaN(eventId)) {
//       return res.status(400).json({ error: 'Invalid event ID' });
//     }

//     // Fetch event details and user discount and points in parallel using Prisma transaction
//     const [event, discountCoupon, userPoints] = await prisma.$transaction([
//       // Fetch event details
//       prisma.event.findUnique({
//         where: { id: eventId },
//         select: {
//           id: true,
//           title: true,
//           price: true,
//           total_transaction_discount: true, // For checking discount availability
//         },
//       }),

//       // Fetch user's valid discount coupon (if any)
//       prisma.discount_coupon.findFirst({
//         where: {
//           userId: Number(userId),
//           expired_date: { gte: new Date() }, // Ensure discount is not expired
//           action: 'credit', // Only 'credit' action discount is valid
//         },
//         orderBy: { created_at: 'desc' }, // Get the latest valid discount
//       }),

//       // Fetch all valid points of the user (credits not expired)
//       prisma.point_balance.findMany({
//         where: {
//           userId: Number(userId),
//           expired_date: { gte: new Date() }, // Only non-expired points
//           action: 'credit', // Only 'credit' action points are usable
//         },
//       }),
//     ]);

//     if (!event) {
//       return res.status(404).json({ error: 'Event not found' });
//     }

//     // Calculate Discount Nominal Use
//     let discountNominalUse = 0;

//     // Check if user has valid discount
//     if (discountCoupon) {
//       // Check if discount is still valid
//       if (
//         discountCoupon.expired_date &&
//         discountCoupon.expired_date < new Date()
//       ) {
//         // Discount expired, proceed to point balance check
//         discountNominalUse = 0;
//       } else {
//         // Discount is valid
//         if (
//           event.total_transaction_discount > 0 &&
//           discountCoupon.action === 'credit'
//         ) {
//           // Apply 10% discount if valid
//           discountNominalUse = event.price ? event.price * 0.1 : 0;
//           // Update event's total_transaction_discount to indicate discount used
//           await prisma.event.update({
//             where: { id: event.id },
//             data: {
//               total_transaction_discount: event.total_transaction_discount - 1,
//             },
//           });
//         }
//       }
//     }

//     // Calculate Point Balance Use
//     let pointBalanceUse = 0;
//     if (userPoints.length > 0) {
//       // Sum up all points that are not expired and have 'credit' action
//       pointBalanceUse = userPoints.reduce((sum, p) => sum + (p.point || 0), 0);
//     }

//     // Calculate Final Price after applying discount and points
//     const finalPrice =
//       (event.price || 0) - discountNominalUse - pointBalanceUse;

//     res.status(200).json({
//       eventId: event.id,
//       title: event.title,
//       price: event.price,
//       discountNominalUse,
//       pointBalanceUse,
//       finalPrice,
//     });
//   } catch (err) {
//     console.error('Error fetching pre-checkout details:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const getPreCheckout = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const eventId = Number(req.params.id);
    if (isNaN(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        title: true,
        price: true,
        total_transaction_discount: true,
        total_seat: true,
      },
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check available seats
    const seatCount = await prisma.payment.count({
      where: { eventId: event.id },
    });
    const availableSeats = event.total_seat - seatCount;
    if (availableSeats <= 0) {
      return res.status(400).json({ error: 'No available seats' });
    }

    // Check for discount coupon
    const discountCoupon = await prisma.discount_coupon.findFirst({
      where: { userId: Number(userId), expired_date: { gt: new Date() } },
      orderBy: { created_at: 'desc' },
    });

    let discountNominalUse = 0;
    if (
      discountCoupon &&
      discountCoupon.action === 'credit' &&
      event.total_transaction_discount > 0
    ) {
      discountNominalUse = (event.price ?? 0) * 0.1;
      await prisma.event.update({
        where: { id: event.id },
        data: { total_transaction_discount: { decrement: 1 } },
      });
    }

    // Check for point balance
    const pointBalance = await prisma.point_balance.findMany({
      where: {
        userId: Number(userId),
        expired_date: { gt: new Date() },
        action: 'credit',
      },
    });
    const pointBalanceUse = pointBalance.reduce(
      (sum, p) => sum + (p.point || 0),
      0,
    );

    // Final price calculation
    const finalPrice =
      (event.price ?? 0) - discountNominalUse - pointBalanceUse;

    res.status(200).json({
      event,
      availableSeats,
      discountNominalUse,
      pointBalanceUse,
      finalPrice,
    });
  } catch (err) {
    console.error('Error fetching pre-checkout data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPreCheckout2 = async (req: Request, res: Response) => {
  try {
    console.log('entry 1');
    const serviceResponse = await preCheckoutValidation(req);

    if (serviceResponse.HttpStatusCode > 399) {
      console.log('entry 2');
      return res

        .status(serviceResponse.HttpStatusCode)
        .json({ error: serviceResponse.message });
    } else {
      console.log('entry 3');
      return res
        .status(serviceResponse.HttpStatusCode)
        .json(serviceResponse.data);
    }
    console.log('entry 4');
  } catch (err) {
    console.error('Error fetching pre-checkout data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const preCheckoutValidation = async (params: any) => {
//   try {
//     const userId = params.user?.id;
//     if (!userId) {
//       return { message: 'Unauthorized', HttpStatusCode: 401 };
//     }

//     let eventId = Number(params.params.id);
//     if (!eventId) {
//       eventId = params.body.eventId;
//     }
//     if (isNaN(eventId)) {
//       return { message: 'Invalid event ID', HttpStatusCode: 400 };
//     }

//     const event = await prisma.event.findUnique({
//       where: { id: eventId },
//       select: {
//         id: true,
//         title: true,
//         price: true,
//         total_transaction_discount: true,
//         total_seat: true,
//       },
//     });

//     if (!event) {
//       return { message: 'Event not found', HttpStatusCode: 404 };
//     }

//     // Check available seats
//     const seatCount = await prisma.payment.count({
//       where: { eventId: event.id },
//     });
//     const availableSeats = event.total_seat - seatCount;
//     if (availableSeats <= 0) {
//       return { message: 'No available seats', HttpStatusCode: 400 };
//     }

//     if (event.price === 0) {
//       return {
//         data: {
//           event,
//           availableSeats,
//           discountNominalUse: 0,
//           pointBalanceUse: 0,
//           finalPrice: 0,
//         },
//         HttpStatusCode: 200,
//       };
//     }

//     // Check for discount coupon
//     const discountCoupon = await prisma.discount_coupon.findFirst({
//       where: { userId: Number(userId), expired_date: { gt: new Date() } },
//       orderBy: { created_at: 'desc' },
//     });

//     let discountNominalUse = 0;
//     if (
//       discountCoupon &&
//       discountCoupon.action === 'credit' &&
//       event.total_transaction_discount > 0
//     ) {
//       discountNominalUse = (event.price ?? 0) * 0.1;
//       await prisma.event.update({
//         where: { id: event.id },
//         data: { total_transaction_discount: { decrement: 1 } },
//       });
//     }

//     // Check for point balance
//     const pointBalance = await prisma.point_balance.findMany({
//       where: {
//         userId: Number(userId),
//         expired_date: { gt: new Date() },
//         action: 'credit',
//       },
//     });
//     const pointBalanceUse = pointBalance.reduce(
//       (sum, p) => sum + (p.point || 0),
//       0,
//     );

//     // Final price calculation
//     const finalPrice =
//       (event.price ?? 0) - discountNominalUse - pointBalanceUse;

//     return {
//       data: {
//         event,
//         availableSeats,
//         discountNominalUse,
//         pointBalanceUse,
//         finalPrice,
//       },
//       HttpStatusCode: 200,
//     };
//   } catch (err) {
//     console.error('Error fetching pre-checkout data:', err);
//     return { message: 'Internal Server Error', HttpStatusCode: 500 };
//   }
// };

const preCheckoutValidation = async (params: any) => {
  try {
    const userId = params.user?.id;
    if (!userId) {
      return { message: 'Unauthorized', HttpStatusCode: 401 };
    }

    let eventId = Number(params.params.id);
    if (!eventId) {
      eventId = params.body.eventId;
    }
    if (isNaN(eventId)) {
      return { message: 'Invalid event ID', HttpStatusCode: 400 };
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        id: true,
        title: true,
        price: true,
        total_transaction_discount: true,
        total_seat: true,
      },
    });

    if (!event) {
      return { message: 'Event not found', HttpStatusCode: 404 };
    }

    // Check available seats
    const seatCount = await prisma.payment.count({
      where: { eventId: event.id },
    });
    const availableSeats = event.total_seat - seatCount;
    if (availableSeats <= 0) {
      return { message: 'No available seats', HttpStatusCode: 400 };
    }

    console.log(event);

    if (event.price === 0) {
      return {
        data: {
          event,
          availableSeats,
          discountNominalUse: 0,
          pointBalanceUse: 0,
          finalPrice: 0,
        },
        HttpStatusCode: 200,
      };
    }

    // --- Enhanced Discount Coupon Logic ---
    // Retrieve the most recent discount coupon ledger entry for the user (by created_at descending)
    const latestDiscountCoupon = await prisma.discount_coupon.findFirst({
      where: {
        userId: Number(userId),
        expired_date: { gt: new Date() },
      },
      orderBy: { created_at: 'desc' },
    });

    let discountNominalUse = 0;
    console.log('discount1', latestDiscountCoupon);
    console.log('discount2', latestDiscountCoupon?.action === 'credit');

    console.log('discount3', event.total_transaction_discount > 0);
    if (
      latestDiscountCoupon &&
      latestDiscountCoupon.action === 'credit' &&
      event.total_transaction_discount > 0
    ) {
      // Calculate discount amount (10% of event price)
      discountNominalUse = (event.price ?? 0) * 0.1;

      // Decrement event's total_transaction_discount count
      // await prisma.event.update({
      //   where: { id: event.id },
      //   data: { total_transaction_discount: { decrement: 1 } },
      // });

      // // Instead of updating the existing record, add a new ledger entry marking the coupon as used (debit)
      // await prisma.discount_coupon.create({
      //   data: {
      //     userId: Number(userId),
      //     action: 'debit',
      //     expired_date: new Date(), // Marking it as used now
      //     // Include any additional required fields as per your schema
      //   },
      // });
    }

    // --- Enhanced Point Balance Calculation ---
    // First, check the latest point balance ledger entry for the user.
    // If the latest record is a debit, then available points are considered 0.
    const latestPointBalance = await prisma.point_balance.findFirst({
      where: { userId: Number(userId) },
      orderBy: { created_at: 'desc' },
    });

    let availablePoints = 0;
    if (latestPointBalance && latestPointBalance.action === 'debit') {
      availablePoints = 0;
    } else {
      // Otherwise, calculate available "credit" points (only those not expired)
      const creditPoints = await prisma.point_balance.aggregate({
        _sum: { point: true },
        where: {
          userId: Number(userId),
          expired_date: { gt: new Date() },
          action: 'credit',
        },
      });
      const totalCredits = creditPoints._sum.point || 0;

      // Sum up the points already used (debits)
      const debitPoints = await prisma.point_balance.aggregate({
        _sum: { point: true },
        where: {
          userId: Number(userId),
          action: 'debit',
        },
      });
      const totalDebits = debitPoints._sum.point || 0;

      availablePoints = totalCredits - totalDebits;
      if (availablePoints < 0) {
        availablePoints = 0;
      }
    }

    // Limit the points usage to the remaining price after discount (and ensure it’s not negative)
    const remainingPrice = Math.max((event.price ?? 0) - discountNominalUse, 0);
    const pointBalanceUse = Math.min(availablePoints, remainingPrice);

    // Final price calculation
    const finalPrice =
      (event.price ?? 0) - discountNominalUse - pointBalanceUse;

    return {
      data: {
        event,
        availableSeats,
        discountNominalUse,
        pointBalanceUse,
        finalPrice,
      },
      HttpStatusCode: 200,
    };
  } catch (err) {
    console.error('Error fetching pre-checkout data:', err);
    return { message: 'Internal Server Error', HttpStatusCode: 500 };
  }
};
