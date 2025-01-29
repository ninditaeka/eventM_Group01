import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

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

// export const getUserDetail = async (req: Request, res: Response) => {
//   console.log('entry findUnique');
//   try {
//     const id = Number(req.params.id);

//     const userDetail = await prisma.user.findUnique({
//       where: {
//         id: id,
//       },
//       select: {
//         first_name: true,
//         last_name: true,
//         email: true,
//         role: true,
//         created_at: true,
//         point_balances: true,
//         referral_codes: true,
//       },
//     });

//     // const userDetail = await prisma.$queryRaw`
//     //   select u.id,u.first_name,u.last_name,u.email,u.role ,sum(point) total_user_point from users u, referral_codes rc, point_balances pb where u.id  = rc."userId" and u.id = pb."userId" and u.id = ${id} group by u.id,u.first_name,u.last_name,u.email,u.role
//     //   `;

//     if (!userDetail) {
//       res.status(404).json({
//         status: 'not found',
//         message: 'user not found',
//         data: null,
//       });
//       return;
//     }

//     res.status(200).json({
//       status: 'success',
//       message: 'get users success',
//       data: userDetail,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 'error',
//       message: JSON.stringify(err),
//       data: null,
//     });
//   }
// };

export const getUserDetail = async (req: Request, res: Response) => {
  console.log('entry findUnique');
  try {
    const id = Number(req.params.id);

    // Fetch user details
    const userDetail = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
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

    // Fetch point balances
    const pointBalanceSum = await prisma.point_balance.aggregate({
      _sum: {
        point: true, // Assuming 'point' is the field you want to sum
      },
      where: {
        userId: id, // Filter by user ID
      },
    });

    // Fetch a single referral code (or the first one)
    const referralCode = await prisma.referral_code.findFirst({
      where: {
        userId: id, // Filter by user ID
      },
      select: {
        referral_code: true, // Assuming 'code' is the field you want to include
      },
    });

    // Combine user details with point balance and referral code
    res.status(200).json({
      status: 'success',
      message: 'get users success',
      data: {
        user: userDetail,
        totalPoints: pointBalanceSum._sum.point || 0, // Default to 0 if no points
        referralCode: referralCode ? referralCode.referral_code : null, // Include referral code or null if not found
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
