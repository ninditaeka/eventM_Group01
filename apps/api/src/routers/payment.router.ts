import { Router } from 'express';
import {
  createPayment,
  getGrafikData,
  getGrafikData2,
  getMostPopularEvent,
  getPaymenttById,
  getRevenuePayment,
  getTotalSeat,
} from '@/controllers/payment.controller';
import {
  eventOrganizerGuard,
  participantGuard,
  verifyToken,
} from '@/middlewares/auth.middleware';
import { paymentValidate } from '@/middlewares/paymentValidation';

const router = Router();

router.post(
  '/',
  verifyToken,
  eventOrganizerGuard,
  paymentValidate,
  createPayment,
);
router.get('/total-seat', verifyToken, eventOrganizerGuard, getTotalSeat);
// router.get('/:id', getPaymenttById);

router.get('/revenue', verifyToken, eventOrganizerGuard, getRevenuePayment);

router.get(
  '/popular-event',
  verifyToken,
  eventOrganizerGuard,
  getMostPopularEvent,
);

router.get('/grafik', verifyToken, eventOrganizerGuard, getGrafikData2);

export default router;
