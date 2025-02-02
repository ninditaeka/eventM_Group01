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

    // Find the user by email
    const findUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    // If user is not found, return an error
    if (!findUser) {
      return res.status(400).json({
        status: 'bad request',
        message: 'email or password invalid',
        data: null,
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await compare(password, findUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: 'bad request',
        message: 'email or password invalid',
        data: null,
      });
    }

    // Create JWT token
    const jwtPayload = {
      id: findUser.id,
      email: findUser.email,
      role: findUser.role,
      name: findUser.first_name,
    };
    const token = sign(jwtPayload, String(process.env.JWT_SECRET));

    // Respond with success
    res.status(200).json({
      status: 'success',
      message: 'login success',
      data: {
        token: token,
        role: findUser.role,
      },
    });
  } catch (err: any) {
    console.error('Error during login:', err); // Log the error for debugging
    res.status(500).json({
      status: 'error',
      message: 'An error occurred during login. Please try again later.',
      data: null,
    });
  }
};

export const registerProcess = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password, role, referral_code } =
      req.body;

    // Check if the email is already used
    const checkUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (checkUser) {
      console.log('entry 4');
      return res.status(400).json({
        status: 'email already used',
        data: null,
      });
    }

    // Hash the password
    const passCrypt = await hash(password, Number(process.env.PASSWORD_SALT));

    // Create the user
    const register = await prisma.user.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        role: role,
        referral_code_use: referral_code,
        password: passCrypt,
      },
    });

    let createGeneratedReferralCode = null;
    if (role === 'participant') {
      console.log('entry 5');
      createGeneratedReferralCode = generateReferralCode();

      // Ensure the generated referral code is unique
      while (
        await prisma.referral_code.findUnique({
          where: { referral_code: createGeneratedReferralCode },
        })
      ) {
        createGeneratedReferralCode = generateReferralCode();
      }

      await prisma.referral_code.create({
        data: {
          referral_code: createGeneratedReferralCode,
          userId: register.id,
        },
      });
    }

    // Check for a valid referral code
    if (referral_code) {
      const validReferral = await prisma.referral_code.findFirst({
        where: {
          referral_code: referral_code,
        },
      });

      if (validReferral) {
        console.log('entry 1');
        const expirationDate = addMonths(new Date(), 3);

        // Create a discount coupon for the new user
        await prisma.discount_coupon.create({
          data: {
            discount: '10%',
            userId: register.id,
            expired_date: expirationDate,
            action: 'credit',
          },
        });

        // Find the referrer user
        const referrerUser = await prisma.user.findUnique({
          where: {
            id: validReferral.userId,
          },
        });

        // Credit points to the referrer
        if (referrerUser) {
          await prisma.point_balance.create({
            data: {
              userId: referrerUser.id,
              point: 10000, // Initialize with 10,000 points
              expired_date: addMonths(new Date(), 3), // Set expiration date to 3 months from now
              action: 'credit',
            },
          });
        }
      } else {
        console.log('Invalid referral code:', referral_code);
      }
    }

    // Respond with success
    res.status(201).json({
      status: 'success register!!!',
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        role: role,
        referral_code:
          role === 'participant' ? createGeneratedReferralCode : null,
      },
    });
  } catch (err) {
    console.error('Error during registration:', err); // Log the error for debugging
    res.status(500).json({
      status: 'error',
      message: 'An error occurred during registration. Please try again later.',
      data: null,
    });
  }
};
