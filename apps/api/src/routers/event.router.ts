import { Router } from 'express';
import {
  createEvent,
  getEvents,
  deleteEvent,
  getEventById,
} from '@/controllers/event.controller';
import { verifyToken } from '@/middlewares/auth.middleware';

const router = Router();
router.post('/', verifyToken, createEvent);
router.get('/', verifyToken, getEvents);
router.delete('/:id', verifyToken, deleteEvent);
router.get('/:id', getEventById);

export default router;
