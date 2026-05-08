import prisma from "../config/db";

export const getAllFondosAvanceRepository = async () => {
  return prisma.fondoAvance.findMany({
    orderBy: { createdAt: "asc" },
  });
};

export const createFondoAvanceRepository = async (
  data: {
    name: string;
    amount: number;
    currency: string;
  }
) => {
  console.log(data)
  return prisma.fondoAvance.create({
    data,
  });
};

export const deleteFondoAvanceRepository = async (id: number) => {
  return prisma.fondoAvance.delete({ where: { id } });
};