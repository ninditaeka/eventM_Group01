import { Router } from 'express';
import {
  createEvent,
  getEvents,
  deleteEvent,
} from '@/controllers/event.controller';
import { verifyToken } from '@/middlewares/auth.middleware';

const router = Router();
router.post('/', verifyToken, createEvent);
router.get('/', verifyToken, getEvents);
router.delete('/:id', verifyToken, deleteEvent);

export default router;
