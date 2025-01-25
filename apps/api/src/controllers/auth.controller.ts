import { compare, genSalt, hash } from 'bcrypt';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { generateReferralCode } from '@/utils/utils';
import { addMonths } from 'date-fns';

const prisma = new PrismaClient();

export const loginProcess = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(`req.body: ${JSON.stringify(req.body)}`);

    // const salt = await genSalt(10);
    // console.log(`gensalt ${salt}`);
    const passCryptLogIn = await hash(
      password,
      String(process.env.PASSWORD_SALT),
    );
    console.log(`pascrypt login ${passCryptLogIn}`);

    const findUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    console.log(`FIND USER: ${JSON.stringify(findUser)}`);

    console.log(`password: ${password}`);
    console.log(`find user password: ${findUser?.password}`);
    console.log(`compare : ${passCryptLogIn === findUser?.password} `);

    if (passCryptLogIn !== findUser?.password) {
      throw new Error('invalid email or password');
    }

    // console.log(`pass compare: ${JSON.stringify(passCompare)}`);
    //jwt
    const jwtPayload = {
      id: findUser?.id,
      email: findUser?.email,
      role: findUser?.role,
    };
    const token = sign(jwtPayload, String(process.env.JWT_SECRET));

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
  console.log('entry 3');
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      referral_code_use,
      referral_code,
    } = req.body;

    const checkUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (checkUser) {
      console.log('entry 4');
      res.status(400).json({
        status: 'email already used',
        data: null,
      });
      return;
    }
    // const salt = await genSalt(10);
    const passCrypt = await hash(password, String(process.env.PASSWORD_SALT));

    const register = await prisma.user.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        role: role,
        referral_code_use: referral_code_use,

        password: passCrypt,
      },
    });

    let createGeneratedReferralCode = null;
    if (role === 'participant') {
      console.log('entry 5');
      createGeneratedReferralCode = generateReferralCode();

      const refferal = await prisma.referral_code.create({
        data: {
          referral_code: createGeneratedReferralCode,
          userId: register.id,
        },
      });
      console.log(`create referral: ${JSON.stringify(refferal)}`);
    }

    if (referral_code) {
      console.log('entry 2');
      const validReferral = await prisma.referral_code.findFirst({
        where: {
          referral_code: referral_code,
        },
      });

      if (validReferral) {
        console.log('entry 1');
        const expirationDate = addMonths(new Date(), 3);

        await prisma.discount_coupon.create({
          data: {
            discount: '10%',
            userId: register.id,
            expired_date: expirationDate,
          },
        });
        const referrerUser = await prisma.user.findUnique({
          where: {
            id: validReferral.userId, // Get the user associated with the referral code
          },
        });

        if (referrerUser) {
          // Check if the referrer already has a point balance entry
          const existingBalance = await prisma.point_balance.findFirst({
            where: {
              userId: referrerUser.id, // Assuming userId is the foreign key in point_balances
            },
          });

          if (existingBalance) {
            // If the user already has a balance, update it
            await prisma.point_balance.update({
              where: {
                id: existingBalance.id,
              },
              data: {
                point: (existingBalance.point || 0) + 10000, // Add 10,000 points
                updated_at: new Date(), // Update the timestamp
              },
            });
          } else {
            // If the user does not have a balance, create a new entry
            await prisma.point_balance.create({
              data: {
                userId: referrerUser.id,
                point: 10000, // Initialize with 10,000 points
                expired_date: addMonths(new Date(), 3), // Set expiration date to 3 months from now
              },
            });
          }
        }
      }
    }

    res.status(201).json({
      status: 'success register!!!',
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        role: role,
        referral_code:
          role === 'participant' ? createGeneratedReferralCode : null, // Include the referral code in the response if needed
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: JSON.stringify(err),
      data: null,
    });
  }
};
