'use client';

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export const createReview = async (req: Request, res: Response) => {
  const { eventId, rating, comment } = req.body;

  try {
    const review = await prisma.review_Rating.create({
      data: {
        userId: Number(req.user?.id),
        eventId: eventId,
        rating: rating,
        comment: comment,
      },
    });
    res.status(201).json({
      status: 'success',
      message: 'add review successfully',
      data: review,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
      data: null,
    });
  }
};

export const getReviewsByEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  if (!eventId) {
    return res.status(400).json({
      status: 'error',
      message: 'Event ID is required',
    });
  }

  const reviews = await prisma.review_Rating.findMany({
    where: { eventId: Number(eventId) },
    include: {
      user: {
        select: { first_name: true, last_name: true }, // Include user details
      },
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Reviews retrieved successfully',
    data: reviews,
  });
  // } catch (error) {
  // console.error('Error fetching reviews:', error);
  // res.status(500).json({
  //   status: 'error',
  //   message: 'Internal server error',
  // });
  // }
  // const { eventId } = req.params;

  // try {
  //   const review = await prisma.review_Rating.findMany({
  //     where: {
  //       eventId: Number(eventId),
  //     },
  //   });
  //   res.status(200).json({
  //     status: 'success',
  //     message: 'get review successfully',
  //     data: review,
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     status: 'error',
  //     message: JSON.stringify(error),
  //     data: null,
  //   });
  // }
};

export const getAverageRatingForProduct = async (
  req: Request,
  res: Response,
) => {
  const { eventId } = req.params;

  try {
    const reviews = await prisma.review_Rating.findMany({
      where: { eventId: Number(eventId) },
    });

    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        : 0; // Handle case where there are no reviews

    res.json({ averageRating });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Error fetching average rating' });
  }
};
