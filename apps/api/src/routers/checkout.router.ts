import { Router } from 'express';
import {
  validateCheckout,
  createCheckout,
  getCheckoutById,
  getCheckoutByEOId,
  getPreCheckout2,
  getCheckoutByParticipantId,
} from '@/controllers/checkout.controller';
import {
  eventOrganizerGuard,
  participantGuard,
  verifyToken,
} from '@/middlewares/auth.middleware';

const router = Router();

router.post('/', verifyToken, participantGuard, createCheckout);
router.post('/validate', verifyToken, participantGuard, validateCheckout);
// router.post('/validate', participantGuard, checkoutValidate, validateCheckout);
// router.get('/', getEvents);
// router.delete('/:id', verifyToken, deleteEvent);
// router.patch('/:id', verifyToken, editEvent);
router.get('/:id', getCheckoutById);
router.get(
  '/attendant-list/:id',
  verifyToken,
  eventOrganizerGuard,
  getCheckoutByEOId,
);
router.get(
  '/my-events/:id',
  verifyToken,
  participantGuard,
  getCheckoutByParticipantId,
);
router.get('/pre-checkout/:id', verifyToken, participantGuard, getPreCheckout2);

export default router;
