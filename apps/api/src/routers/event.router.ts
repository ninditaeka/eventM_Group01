import { Router } from 'express';
import {
  createEvent,
  createEventTwo,
  getEvents,
  deleteEvent,
  getEventById,
  editEvent,
} from '@/controllers/event.controller';
import { verifyToken } from '@/middlewares/auth.middleware';
import { eventValidate } from '@/middlewares/eventValidation';
// import {multer} from 'multer';

//untuk menambahkan path
const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, path.join(__dirname, 'public/images'));
  },
  filename: (req: Request, file: any, cb: any) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({
  dest: 'public/images',
  storage: diskStorage,
  limits: {
    fileSize: 1024 * 1024 * 2, // Max file size 2MB
  },
});

const router = Router();
// router.post('/form', upload.single('file'), createEventTwo);
// router.post('/form', upload.single('file'), (req, res) => {
//   res.status(200).json({
//     status: 'sucess',
//     message: JSON.stringify({}),
//     data: null,
//   });
// });

// router.post('/upload', upload.single('file'), (req, res) => {
//   console.log(req.file);
//   if (!req.file) {
//     return res.status(400).send('No file uploaded');
//   }
//   res.send('File uploaded successfully');
// });

router.post('/', verifyToken, eventValidate, createEvent);
router.get('/', getEvents);
router.delete('/:id', verifyToken, deleteEvent);
router.patch('/:id', verifyToken, editEvent);
router.get('/:id', getEventById);

export default router;
