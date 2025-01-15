import { Router } from 'express';
import { registerProcess, loginProcess } from '../controllers/auth.controller';
import { RegisterValidate, LogInValidate } from '../middlewares/authValidation';
const router = Router();

router.post('/login', LogInValidate, loginProcess);
router.post('/register', RegisterValidate, registerProcess);

// router.post('/login', loginProcess);
// router.post('/register', registerProcess);

export default router;
