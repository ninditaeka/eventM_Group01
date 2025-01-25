import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const checkReferralCode = async (req: Request, res: Response) => {
  const { referral_code } = req.params;
  console.log(req.params);
  try {
    const referral = await prisma.referral_code.findFirst({
      where: {
        referral_code: referral_code,
      },
    });

    if (referral) {
      return res.status(200).json({ exists: true });
    } else {
      console.log(referral);
      return res.status(404).json({ exists: false });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
