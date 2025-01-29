import { Router } from 'express';
import {
  createEvent,
  createEventTwo,
  getEvents,
  deleteEvent,
  getEventById,
  editEvent,
  getEventByUserId,
  searchEvents,
} from '@/controllers/event.controller';
import {
  eventOrganizerGuard,
  participantGuard,
  verifyToken,
} from '@/middlewares/auth.middleware';
import { eventValidate } from '@/middlewares/eventValidation';
// import {multer} from 'multer';
import { uploader } from 'uploader';

const router = Router();

router.get('/', getEvents);
router.delete('/:id', verifyToken, eventOrganizerGuard, deleteEvent);
router.patch('/:id', verifyToken, eventOrganizerGuard, editEvent);
router.get(
  '/:id',
  // verifyToken,
  // eventOrganizerGuard,
  // participantGuard,
  getEventById,
);
router.post('/', verifyToken, eventOrganizerGuard, eventValidate, createEvent);
router.get('/user/:created_by', verifyToken, getEventByUserId);
router.get('/search', searchEvents);

export default router;
