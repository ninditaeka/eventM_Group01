'use client';

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export const createReview = async (req: Request, res: Response) => {
  const { userId, eventId, rating, comment } = req.body;

  try {
    const review = await prisma.review_Rating.create({
      data: {
        userId: userId,
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

  try {
    const review = await prisma.review_Rating.findMany({
      where: {
        eventId: Number(eventId),
      },
    });
    res.status(201).json({
      status: 'success',
      message: 'get review successfully',
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(error),
      data: null,
    });
  }
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
