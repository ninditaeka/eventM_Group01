import { Router } from 'express';
import { checkReferralCode } from '../controllers/referralCode.controller';
import { participantGuard } from '@/middlewares/auth.middleware';

const router = Router();

// Define the route for checking the referral code
router.get(
  '/check-referral-code/:referral_code',
  participantGuard,
  checkReferralCode,
);

export default router;
