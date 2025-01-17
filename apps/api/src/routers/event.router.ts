import { Router } from 'express';
import { createEvent, getEvents } from '@/controllers/event.controller';
import { verifyToken } from '@/middlewares/auth.middleware';

const router = Router();
router.post('/event', verifyToken, createEvent);
router.get('/events/', verifyToken, getEvents);

export default router;
