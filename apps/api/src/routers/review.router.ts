import { Router } from 'express';
import {
  createReview,
  getAverageRatingForProduct,
  getReviewsByEvent,
} from '@/controllers/review.controller';

const router = Router();

router.post('/', createReview);
router.get('/:id/reviews', getReviewsByEvent);
router.get('/:id/average-rating', getAverageRatingForProduct);

export default router;
