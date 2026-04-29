
import prisma from '../config/db'

export const createPayerRepository = async (data: {
  name: string;
  numeral: number;
}) => {
  return prisma.payer.create({
    data: {
      name: data.name,
      numeral: String(data.numeral),
    },
  });
};

export const getAllPayersRepository = async () => {
  return prisma.payer.findMany({
    where: {
      isVisible: true
    },
    select: {
      id: true,
      name: true,
      numeral: true
    },
     orderBy: {
      id: 'asc'
    }
  })
}

export const changeVisibilityOfPayerRepository = async (id: number) => {
  return prisma.payer.update({
    where: {
      id: id
    },
    data: {
      isVisible: false
    }
  })
}

