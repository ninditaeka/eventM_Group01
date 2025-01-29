import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { eventId, price_paid, checkoutId } = req.body;
    const user = req.user as User;
    const newPayment = await prisma.payment.create({
      data: {
        userId: parseInt(user.id),
        eventId: eventId,
        checkoutId: checkoutId,
        price_paid: price_paid,
      },
    });

    res.status(200).json({
      status: 'success',
      data: newPayment,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
      data: null,
    });
  }
};

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
