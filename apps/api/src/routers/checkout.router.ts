import { Router } from 'express';
import {
  validateCheckout,
  createCheckout,
  getCheckoutById,
} from '@/controllers/checkout.controller';
import { participantGuard, verifyToken } from '@/middlewares/auth.middleware';

const router = Router();

router.post('/', verifyToken, participantGuard, createCheckout);
router.post('/validate', verifyToken, participantGuard, validateCheckout);
// router.post('/validate', participantGuard, checkoutValidate, validateCheckout);
// router.get('/', getEvents);
// router.delete('/:id', verifyToken, deleteEvent);
// router.patch('/:id', verifyToken, editEvent);
router.get('/:id', getCheckoutById);

export default router;
