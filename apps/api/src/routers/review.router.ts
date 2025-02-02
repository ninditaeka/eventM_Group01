import { Router } from 'express';
import {
  createReview,
  getAverageRatingForProduct,
  getReviewsByEvent,
} from '@/controllers/review.controller';
import { verifyToken, participantGuard } from '@/middlewares/auth.middleware';

const router = Router();

router.post('/', verifyToken, participantGuard, createReview);
router.get('/:eventId', getReviewsByEvent);
// router.get(
//   '/:id/average-rating',
//   verifyToken,
//   participantGuard,
//   getAverageRatingForProduct,
// );

export default router;
