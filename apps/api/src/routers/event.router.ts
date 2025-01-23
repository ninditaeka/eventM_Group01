import { Router } from 'express';
import {
  createEvent,
  getEvents,
  deleteEvent,
  getEventById,
  editEvent,
} from '@/controllers/event.controller';
import { verifyToken } from '@/middlewares/auth.middleware';
import { eventValidate } from '@/middlewares/eventValidation';

const router = Router();
router.post('/', verifyToken, eventValidate, createEvent);
router.get('/', verifyToken, getEvents);
router.delete('/:id', verifyToken, deleteEvent);
router.patch('/:id', verifyToken, editEvent);
router.get('/:id', verifyToken, getEventById);

export default router;
