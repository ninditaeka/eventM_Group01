import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const paymentValidate = [
  body('checkoutId').notEmpty().withMessage('checkoutId is empty'),
  body('price_paid').notEmpty().withMessage('price_paid is empty'),
  // body('eventId').notEmpty().withMessage('eventId is empty'),

  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
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
