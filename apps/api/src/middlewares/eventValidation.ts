import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const eventValidate = [
  body('title').notEmpty().withMessage('title is empty'),
  body('description').notEmpty().withMessage('description is empty'),
  // body('image').notEmpty().withMessage('image is empty'),
  body('location').notEmpty().withMessage('location is empty'),
  body('date').notEmpty().withMessage('date is empty'),
  body('event_type').notEmpty().withMessage('location is empty'),
  body('price').notEmpty().withMessage('price is empty'),
  body('total_seat').notEmpty().withMessage('total_seat is empty'),
  body('total_transaction_discount')
    .notEmpty()
    .withMessage('total_transaction_discount'),

  body('category').notEmpty().withMessage('category'),

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
