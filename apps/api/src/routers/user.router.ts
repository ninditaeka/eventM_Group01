import { Router } from 'express';
import { getUserDetail, getUsers } from '@/controllers/user.controller';

const router = Router();
router.get('/', getUsers);
router.get('/:id', getUserDetail);

export default router;
