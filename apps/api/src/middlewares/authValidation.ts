import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const LogInValidate = [
  body('email').notEmpty().withMessage('email is empty'),
  body('password').notEmpty().withMessage('password is empty'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'error',
        message: errors.array(),
        data: null,
      });
      return;
    }
    next();
  },
];

export const RegisterValidate = [
  body('first_name')
    .notEmpty()
    .withMessage('first name is empty')
    .isAlphanumeric()
    .withMessage('first name must be alphanumeric'),

  body('last_name')
    .notEmpty()
    .withMessage('last name is empty')
    .isAlphanumeric()
    .withMessage('last name must be alphanumeric'),

  body('email').notEmpty().withMessage('email is empty'),

  body('password').notEmpty().withMessage('password is empty'),

  body('role').notEmpty().withMessage('role is empty'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'error',
        message: errors.array(),
        data: null,
      });
      return;
    }
    next();
  },
];
//akses validate
