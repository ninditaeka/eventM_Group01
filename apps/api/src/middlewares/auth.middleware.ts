import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

type User = {
  email: string;
  role: string;
  id: string;
};

export const verifyToken = async (
  req: Request<User>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      res.status(401).json({
        status: 'unauthenticated',
        message: 'cannot access this page',
        data: null,
      });
      return;
    }
    const verifiedUser = await verify(token, String(process.env.JWT_KEY));

    if (!verifiedUser) {
      res.status(401).json({
        status: 'unauthenticated',
        message: 'token invalid',
        data: null,
      });
      return;
    }

    req.user = verifiedUser as User;
    next();
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
      data: null,
    });
  }
};

export const eventOrganizerGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req?.user as User;

    if (user?.role != 'event_organizer') {
      res.status(401).json({
        status: 'unauthorized',
        message: 'token invalid',
        data: null,
      });
      return;
    }
    next();
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
      data: null,
    });
  }
};

export const participantGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req?.user as User;

    if (user?.role != 'participant') {
      res.status(401).json({
        status: 'unauthorized',
        message: 'token invalid',
        data: null,
      });
      return;
    }
    next();
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
      data: null,
    });
  }
};
