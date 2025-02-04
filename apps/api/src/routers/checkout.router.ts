import { Router } from 'express';
import {
  createCheckout,
  getCheckoutById,
  getCheckoutByEOId,
  getPreCheckout,
  getCheckoutByParticipantId,
} from '@/controllers/checkout.controller';
import {
  eventOrganizerGuard,
  participantGuard,
  verifyToken,
} from '@/middlewares/auth.middleware';

const router = Router();

router.post('/', verifyToken, participantGuard, createCheckout);
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
router.get('/pre-checkout/:id', verifyToken, participantGuard, getPreCheckout);

export default router;
