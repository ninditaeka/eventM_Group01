import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware for soft delete
prisma.$use(async (params, next) => {
  if (params.model === 'Event') {
    // Convert delete to update (soft delete)
    if (params.action === 'delete' || params.action === 'deleteMany') {
      params.action = 'updateMany';
      params.args.data = { deleted: true };
    }

    // Automatically exclude soft-deleted events in find queries
    if (params.action === 'findFirst' || params.action === 'findMany') {
      if (!params.args.where) {
        params.args.where = {};
      }
      params.args.where.deleted = false;
    }
  }

  return next(params);
});

export default prisma;
