import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        first_name: true,
        last_name: true,
        email: true,
        role: true,
        created_at: true,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'get users success',
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
      data: null,
    });
  }
};

export const getUserDetail = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const userDetail = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        role: true,
        created_at: true,
      },
    });

    if (!userDetail) {
      res.status(404).json({
        status: 'not found',
        message: 'user not found',
        data: null,
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'get users success',
      data: userDetail,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
      data: null,
    });
  }
};
