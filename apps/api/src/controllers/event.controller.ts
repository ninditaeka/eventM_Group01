import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type User = {
  email: string;
  role: string;
  id: string;
};

export const createEvent = async (req: Request, res: Response) => {
  const {
    title,
    description,
    image,
    location,
    date,
    time,
    event_type,
    price,
    max_voucher_discount,
    category,
  } = req.body;

  const user = req.user as User;
  try {
    // if (!user || !title || !description || !date) {
    //   return res.status(400).json({ error: 'All fields are required' });
    // }

    // const checkUser = await prisma.user.findFirst({
    //   where: {
    //     email: user?.email,
    //   },
    // });

    // if (!checkUser) {
    //   res.status(404).json({
    //     status: 'not found',
    //     message: 'user not found',
    //     data: null,
    //   });

    //   return;
    // }
    console.log({
      data: {
        title: title || '',
        description: description || '',
        image: image || '',
        location: location || '',
        date: date || '',
        time: time || '',
        event_type: event_type || '',
        price: price || '',
        max_voucher_discount: max_voucher_discount || '',
        category: category || '',
        created_by: parseInt(user.id),
      },
    });

    const newPost = await prisma.event.create({
      data: {
        title: title || '',
        description: description || '',
        image: image || '',
        location: location || '',
        date: new Date(date) || '',
        event_type: event_type || '',
        price: price || 0,
        max_voucher_discount: max_voucher_discount || 0,
        category: category || '',
        created_by: parseInt(user.id),
      },
    });
    res.status(201).json({
      status: 'success',
      message: 'create event success',
      data: newPost,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
      data: null,
    });
  }
};
