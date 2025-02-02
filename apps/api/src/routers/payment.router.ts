import { Router } from 'express';
import {
  createPayment,
  getPaymenttById,
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
// router.post('/', verifyToken, checkoutValidate, validateCheckout);
// router.get('/', getEvents);
// router.delete('/:id', verifyToken, deleteEvent);
// router.patch('/:id', verifyToken, editEvent);
router.get('/:id', getPaymenttById);

export default router;
