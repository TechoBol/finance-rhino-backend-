import prisma from "../config/db";

type CashItem = {
  payer: string;
  amount: number;
  source: string;
  description: string;
};

export const getAllCashFlowRepository = async () => {
  return prisma.cashFlow.findMany({
    orderBy: { date: "asc" },
  });
};

export const createCashFlowRepository = async (data: any) => {
  const existing = await prisma.cashFlow.findFirst({
    where: {
      date: new Date(data.date),
      account: data.account,
      type: data.type,
      source: "manual",
    },
  });

  if (existing) {
    const existingItems = (existing.items as CashItem[]) || [];
    const newItems = (data.items as CashItem[]) || [];

    const mergedItems = [...existingItems, ...newItems];

    const newAmount = mergedItems.reduce(
      (acc, item) => acc + Number(item.amount || 0),
      0,
    );
    console.log("existe")
    return prisma.cashFlow.update({
      where: { id: existing.id },
      data: {
        items: mergedItems,
        amount: newAmount,
      },
    });
  }
console.log("no existe")
  return prisma.cashFlow.create({
    data: {
      date: new Date(data.date),
      account: data.account,
      type: data.type,
      amount: data.amount,
      items: data.items,
      isUSD: data.isUSD,
      source: "manual",
    },
  });
};

export const updateCashFlowRepository = async (id: number, data: any) => {
  return prisma.cashFlow.update({
    where: { id },
    data: {
      date: new Date(data.date),
      account: data.account,
      type: data.type,
      amount: data.amount,
      items: data.items,
      isUSD: data.isUSD,
    },
  });
};
