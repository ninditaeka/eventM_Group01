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

    const serviceResponse = (await preCheckoutValidation(req)) as ICheckout;
    if (serviceResponse?.HttpStatusCode > 399) {
      return res
        .status(serviceResponse?.HttpStatusCode)
        .json({ error: serviceResponse.message });
    }

    const result = await prisma.$transaction(async (tx) => {
      const newCheckout = await tx.checkout.create({
        data: {
          quantity: 1,
          point_balance_use: serviceResponse?.data.pointBalanceUse || 0,
          discount_nominal_use: serviceResponse?.data.discountNominalUse || 0,
          price: Number(serviceResponse?.data?.event?.price) || 1000,
          final_price: serviceResponse?.data.finalPrice || 0,
          event: { connect: { id: eventId } },
          user: { connect: { id: parseInt(user.id) } },
          voucher_activation_status:
            (serviceResponse?.data.discountNominalUse ?? 0) > 0
              ? 'pending'
              : null,
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
    const id = req.params.id;

    const eoIdNumber = Number(id);

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
    const userId = req.params.id;

    const userIdNumber = Number(userId);

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

export const getPreCheckout = async (req: Request, res: Response) => {
  try {
    const serviceResponse = await preCheckoutValidation(req);

    if (serviceResponse.HttpStatusCode > 399) {
      return res

        .status(serviceResponse.HttpStatusCode)
        .json({ error: serviceResponse.message });
    } else {
      return res
        .status(serviceResponse.HttpStatusCode)
        .json(serviceResponse.data);
    }
  } catch (err) {
    console.error('Error fetching pre-checkout data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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
        discount: '10%',
        expired_date: { gte: new Date() },
      },
      orderBy: { created_at: 'desc' },
    });

    const InvalidDiscountCoupon = await prisma.discount_coupon.findFirst({
      where: {
        userId: Number(userId),
        action: 'debit',
      },
      orderBy: { created_at: 'desc' },
    });

    let discountNominalUse = 0;
    if (InvalidDiscountCoupon) {
      discountNominalUse = 0;
    } else {
      if (
        latestDiscountCoupon &&
        latestDiscountCoupon.action === 'credit' &&
        event.total_transaction_discount > 0
      ) {
        // Calculate discount amount (10% of event price)
        discountNominalUse = (event.price ?? 0) * 0.1;
      }
    }

    // {
    //   // If the latest discount entry is 'debit' and discount is 0, user no longer has a discount
    //   const hasNoDiscount =
    //     latestDiscountCoupon?.action === 'debit' &&
    //     Number(latestDiscountCoupon?.discount) === 0;
    //   console.log('latestDiscountCoupon?.action', latestDiscountCoupon?.action);
    //   console.log(
    //     'latestDiscountCoupon?.discount',
    //     latestDiscountCoupon?.discount,
    //   );

    //   if (hasNoDiscount) {
    //     console.log('preCheckoutValidation entry 8');
    //     discountNominalUse = 0;
    //   }
    //   // console.log('hasNoDiscount', hasNoDiscount);
    // }

    const latestPointBalance = await prisma.point_balance.findFirst({
      where: { userId: Number(userId), expired_date: { lte: new Date() } },
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
      if (availablePoints <= 0) {
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
