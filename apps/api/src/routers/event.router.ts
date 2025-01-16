import { Router } from 'express';
import { createEvent } from '@/controllers/event.controller';
import { verifyToken } from '@/middlewares/auth.middleware';

const router = Router();
router.post('/event', verifyToken, createEvent);

export default router;
