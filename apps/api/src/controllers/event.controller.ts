import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

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
    event_type,
    price,
    total_seat,
    total_transaction_discount,
    category,
  } = req.body;

  const user = req.user as User;
  try {
    console.log({
      data: {
        title: title || '',
        description: description || '',
        image: image || '',
        location: location || '',
        date: date || '',
        event_type: event_type || '',
        price: price || '',
        total_seat: total_seat || '',
        total_transaction_discount: total_transaction_discount || '',
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
        total_seat: total_seat || '',
        total_transaction_discount: total_transaction_discount || '',
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

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();

    res.status(200).json({
      status: 'success',
      message: 'get events success',
      data: events,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
      data: null,
    });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteEvent = await prisma.event.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      status: 'delete success',
      data: deleteEvent,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
    });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const event = await prisma.event.findUnique({
      where: {
        id: id,
      },
    });

    if (!event) {
      res.status(400).json({
        status: 'event not found',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: event,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
    });
  }
};
