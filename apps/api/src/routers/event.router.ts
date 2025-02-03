import { Router } from 'express';
import {
  createEvent,
  createEventTwo,
  getEvents,
  deleteEvent,
  editEvent,
  getEventByEoId,
  getEventByParticipantId,
  searchEvents,
  getEventById,
} from '@/controllers/event.controller';
import {
  eventOrganizerGuard,
  participantGuard,
  verifyToken,
} from '@/middlewares/auth.middleware';
import { eventValidate } from '@/middlewares/eventValidation';
// import {multer} from 'multer';

const router = Router();

router.get('/', getEvents);
router.get('/eo', verifyToken, eventOrganizerGuard, getEventByEoId);
router.get(
  '/participant',
  verifyToken,
  participantGuard,
  getEventByParticipantId,
);
router.delete('/:eventId', verifyToken, eventOrganizerGuard, deleteEvent);
router.patch('/:id', verifyToken, eventOrganizerGuard, editEvent);
router.get('/search', searchEvents);
router.get(
  '/:id',
  // verifyToken,
  // eventOrganizerGuard,
  // participantGuard,
  getEventById,
);
router.post('/', verifyToken, eventOrganizerGuard, eventValidate, createEvent);
// router.get('/user/:created_by', verifyToken, getEventByUserId);

export default router;
