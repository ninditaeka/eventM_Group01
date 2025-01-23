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
router.get('/', getEvents);
router.delete('/:id', verifyToken, deleteEvent);
router.patch('/:id', verifyToken, editEvent);
router.get('/:id', getEventById);

export default router;
