import prisma from '../config/db'

export const getAllBanksRepository = async () => {
  return prisma.banks.findMany({
    where: {
      isVisible: true
    },
    select: {
      id: true,
      name: true,
    },
     orderBy: {
      id: 'asc'
    }
  })
}

export const registerBankRepository = async (
  newBankData: { name: string }
) => {
  return prisma.banks.create({
    data: {
      name: newBankData.name
    },
    select: {
      id: true,
      name: true,
    }
  })
}

export const changeVisibilityOfBankRepository = async (id: number) => {
  return prisma.banks.update({
    where: {
      id: id
    },
    data: {
      isVisible: false
    }
  })
}

