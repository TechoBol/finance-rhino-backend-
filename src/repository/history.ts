import prisma from "../config/db";

export const createDepositOrderHistory = async (
  depositOrderId: number,
  orderNumber: string,
  action: string,
  modifiedById: number,
  snapshot?: object,
  reason?: string
) => {
  return prisma.depositOrderHistory.create({
    data: {
      depositOrderId,
      orderNumber,
      action,
      modifiedById,
      description: reason?.trim() || null,
      snapshot: snapshot ?? undefined,
    },
  });
};

export const getDepositOrderHistoryByOrderNumber = async (
  orderNumber: string,
) => {
  return prisma.depositOrderHistory.findMany({
    where: { orderNumber },
    select: {
      id: true,
      depositOrderId: true,
      orderNumber: true,
      action: true,
      modifiedAt: true,
      description: true,
      snapshot: true,
      modifiedBy: {
        select: {
          name: true,
          lastName: true,
        },
      },
    },
    orderBy: { modifiedAt: "desc" },
  });
};
