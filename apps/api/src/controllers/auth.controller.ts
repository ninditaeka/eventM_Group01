import { compare, genSalt, hash } from 'bcrypt';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';

// export const authUser = () => {

// }
const prisma = new PrismaClient();

export const loginProcess = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const findUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    const passCompare = await compare(password, String(findUser?.password));

    if (!passCompare) {
      throw new Error('invalid email or password');
    }
    //jwt
    const jwtPayload = {
      id: findUser?.id,
      email: findUser?.email,
      role: findUser?.role,
    };
    const token = sign(jwtPayload, String(process.env.JWT_KEY));

    if (findUser) {
      res.status(200).json({
        status: 'success',
        message: 'login success',
        data: {
          token: token,
          role: findUser?.role,
        },
      });
    } else {
      res.status(400).json({
        status: 'bad request',
        message: 'email or password invalid',
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
      data: null,
    });
  }
};

export const registerProcess = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    const checkUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (checkUser) {
      res.status(400).json({
        status: 'email already used',
        data: null,
      });
      return;
    }
    const salt = await genSalt(10);

    const passCrypt = await hash(password, salt);

    const register = await prisma.user.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        role: role,
        password: passCrypt,
      },
    });

    if (!first_name || !last_name || !password || !role) {
      res.status(400).send('all fields are required');
    }

    if (!['event_organizer', 'customer'].includes(role)) {
      res.status(400).send('invalid type');
    }

    if (register) {
      res.status(200).json({
        status: 'success register!!!',
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          role: role,
        },
      });
    }

    if (role == 'event_organizer') {
      res.status(201).send('event organizer registed success');
    } else {
      res.status(201).send('customer registered successfully');
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
      data: null,
    });
  }
};
