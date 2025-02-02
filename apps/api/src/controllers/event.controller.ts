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

    // Use current time if date is not provided
    const eventDate = date ? new Date(date) : new Date(); // Use current time if date is not provided

    // Log the event date before insertion
    console.log('Event Date:', eventDate);

    // Validate the date if provided
    if (date && isNaN(eventDate.getTime())) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid date format',
        data: null,
      });
    }

    // Create a moment object in Jakarta timezone
    const eventDateTimeInJakarta = moment.tz(date, 'Asia/Jakarta');

    // Store the original input and the converted time in the database
    const utcTime = eventDateTimeInJakarta.utc().format();

    console.log('utcTime: ', utcTime);

    console.log(eventDate);
    const newPost = await prisma.event.create({
      data: {
        title: title || '',
        description: description || '',
        image: image || '',
        location: location || '',
        date: utcTime || '',
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
    // Get query category
    const category = req.query.category;
    const validCategories = [
      'sport',
      'festival',
      'food & drink',
      'conference',
      'concert',
    ];

    if (category && !validCategories.includes(category.toString())) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid category',
        data: null,
      });
    }

    const events = await prisma.event.findMany({
      where: category
        ? { category: { equals: category.toString(), mode: 'insensitive' } }
        : {},
    });

    res.status(200).json({
      status: 'success',
      message: 'Get events success',
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

// export const deleteEvent = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const deleteEvent = await prisma.event.delete({
//       where: {
//         id: Number(id),
//       },
//     });

//     res.status(200).json({
//       status: 'delete success',
//       data: deleteEvent,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 'error',
//       message: JSON.stringify(err),
//     });
//   }
// };

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

    const paymentCount = await prisma.payment.count({
      where: {
        eventId: id,
        is_paid: true,
      },
    });

    console.log('payment:', paymentCount);

    console.log(event);

    const availableSeats = (event?.total_seat || 0) - paymentCount;

    console.log('availableSeats:', availableSeats);

    // TODO: event.totalSeat - count dari checkout yang is paid true

    //   const data = await prisma.$queryRaw`
    //   WITH dataTransaction AS (
    //     SELECT
    //       u.first_name,
    //       u.last_name,
    //       e.title,
    //       e.id AS eventId,
    //       c.id AS co_id,
    //       c.created_at
    //     FROM users u
    //     JOIN checkouts c ON u.id = c."userId"
    //     JOIN events e ON c."eventId" = e.id
    //     WHERE c."eventId" = ${id}
    //   )
    //   SELECT dt.*, p.is_paid
    //   FROM dataTransaction dt
    //   LEFT JOIN payments p
    //   ON dt.co_id = p."checkoutId";
    // `;
    // console.log('data: ', data);
    if (!event) {
      res.status(400).json({
        status: 'event not found',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: {
          ...event,
          availableSeats,
        },
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
    // const id = Number(req.params.created_by);
    const user = req.user as User;

    if (isNaN(parseInt(user.id))) {
      return res.status(400).json({ status: 'Invalid user ID' });
    }

    const event = await prisma.event.findMany({
      where: {
        created_by: parseInt(user.id),
        deleted: false,
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

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.eventId);
    console.log(`cek req.params: ${JSON.stringify(req.params)}`);
    console.log(`id cetak: ${id}`);

    // Perform soft delete
    await prisma.event.update({
      where: { id: id },
      data: { deleted: true },
    });

    return res.status(200).json({ message: 'Event soft deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting event', error });
  }
};
