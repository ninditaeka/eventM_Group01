'use client';
import { Express, Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import moment from 'moment-timezone';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

type User = {
  email: string;
  role: string;
  id: string;
};

// // const multer = require('multer');
// const path = require('path');

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
  console.log(req.body);
  try {
    // console.log({
    //   data: {
    //     title: title || '',
    //     description: description || '',
    //     image: image || '',
    //     location: location || '',
    //     date: date || '',
    //     event_type: event_type || '',
    //     price: price || '',
    //     total_seat: total_seat || '',
    //     total_transaction_discount: total_transaction_discount || '',
    //     category: category || '',
    //     created_by: parseInt(user.id),
    //   },
    // });

    const newPost = await prisma.event.create({
      data: {
        title: title || '',
        description: description || '',
        image: image || '',
        location: location || '',
        date: new Date(date) || '',
        event_type: event_type || '',
        price: price || 0,
        total_seat: total_seat || 0,
        total_transaction_discount: total_transaction_discount || 0,
        category: category || '',
        created_by: parseInt(user.id),
      },
    });

    const priceLocal = price.toLocaleString();
    const timeLocal = moment
      .utc(newPost.date)
      .tz('Asia/Jakarta')
      .format('YYYY-MM-DD HH:mm:ss');

    const outputData = { ...newPost };

    console.log({ ...outputData, date: timeLocal, price: priceLocal });

    res.status(201).json({
      status: 'success',
      message: 'create event success',
      data: { ...outputData, date: timeLocal, price: priceLocal },
    });
  } catch (err: any) {
    console.log(err?.message);
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
      data: null,
    });
  }
};

// const diskStorage = multer.diskStorage({
//   destination: (req: Request, file: any, cb: any) => {
//     cb(null, path.join(__dirname, 'public/images'));
//   },
//   filename: (req: Request, file: any, cb: any) => {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
//     );
//   },
// });

// const upload = multer({
//   storage: diskStorage,
//   limits: {
//     fileSize: 1024 * 1024 * 25, // Max file size 25MB
//   },
// });

export const createEventTwo = async (req: Request, res: Response) => {
  // upload(req, res, (err) => {
  //   if (err) {
  //     console.log('upload error');
  //   } else {
  //     console.log('upload ok');
  //   }
  // });
  // const {
  //   title,
  //   description,
  //   image,
  //   location,
  //   date,
  //   event_type,
  //   price,
  //   total_seat,
  //   total_transaction_discount,
  //   category,
  // } = req.body;

  // const user = req.user as User;
  console.log('req.body: ', req.body);
  console.log('req.file: ', req.file);
  // try {
  //   ({
  //     data: {
  //       title: title || '',
  //       description: description || '',
  //       image: image || '',
  //       location: location || '',
  //       date: date || '',
  //       event_type: event_type || '',
  //       price: price || 0,
  //       total_seat: total_seat || 0,
  //       total_transaction_discount: total_transaction_discount || 0,
  //       category: category || '',
  //       created_by: parseInt(user.id),
  //     },
  //   });

  //   const newPost = await prisma.event.create({
  //     data: {
  //       title: title || '',
  //       description: description || '',
  //       image: image || '',
  //       location: location || '',
  //       date: new Date(date) || '',
  //       event_type: event_type || '',
  //       price: parseInt(price) || 0,
  //       total_seat: parseInt(total_seat) || 0,
  //       total_transaction_discount: parseInt(total_transaction_discount) || 0,
  //       category: category || '',
  //       created_by: parseInt(user.id),
  //     },
  //   });

  //   const priceLocal = price.toLocaleString();
  //   const timeLocal = moment
  //     .utc(newPost.date)
  //     .tz('Asia/Jakarta')
  //     .format('YYYY-MM-DD HH:mm:ss');

  //   const outputData = { ...newPost };

  //   console.log({ ...outputData, date: timeLocal, price: priceLocal });

  //   res.status(201).json({
  //     status: 'success',
  //     message: 'create event success',
  //     data: { ...outputData, date: timeLocal, price: priceLocal },
  //   });
  // } catch (err) {
  //   res.status(500).json({
  //     status: 'error',
  //     message: JSON.stringify(err),
  //     data: null,
  //   });
  // }

  res.status(200).json({
    status: 'sucess',
    message: JSON.stringify({}),
    data: null,
  });
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
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            email: true,
            role: true,
          },
        },
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

export const getEventByUserId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.created_by);

    if (isNaN(id)) {
      return res.status(400).json({ status: 'Invalid user ID' });
    }

    const event = await prisma.event.findMany({
      where: {
        created_by: id,
      },
    });

    if (!event || event.length === 0) {
      return res.status(404).json({ status: 'Event not found' });
    }

    return res.status(200).json({
      status: 'success',
      data: event,
    });
  } catch (err) {
    console.error('Error fetching events: ', err);
    return res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
    });
  }
};

export const editEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const {
      title,
      description,
      date,
      image,
      location,
      event_type,
      price,
      total_seat,
      total_transaction_discount,
      category,
    } = req.body;

    const event = await prisma.event.findUnique({
      where: {
        id: id,
      },
    });
    if (!event) {
      res.status(404).json({
        status: 'not found',
      });
    } else {
      const eventUpdate = await prisma.event.update({
        where: {
          id: id,
        },
        data: {
          title: title || '',
          description: description || '',
          image: image || '',
          location: location || '',
          date: new Date(date) || '',
          event_type: event_type || '',
          price: price || 0,
          total_seat: total_seat || 0,
          total_transaction_discount: total_transaction_discount || 0,
          category: category || '',
        },
      });

      const TimeLocal = moment
        .utc(eventUpdate.date)
        .tz('Asia/Jakarta')
        .format('YYYY-MM-DD HH:mm:ss');

      const outputData = { ...eventUpdate };

      console.log({ ...outputData, date: TimeLocal });

      res.status(201).json({
        status: 'success',
        message: 'update event success',
        data: { ...outputData, date: TimeLocal },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
    });
  }
};

export const searchEvents = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.search || '';

    const events = await prisma.event.findMany({
      where: {
        OR: [
          {
            title: { contains: searchQuery as string, mode: 'insensitive' },
          },
          {
            description: {
              contains: searchQuery as string,
              mode: 'insensitive',
            },
          },
          {
            location: { contains: searchQuery as string, mode: 'insensitive' },
          },
          {
            category: { contains: searchQuery as string, mode: 'insensitive' },
          },
        ],
      },
    });

    res.status(200).json({ status: 'success', data: events });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(error),
    });
  }
};
