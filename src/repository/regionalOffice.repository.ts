import prisma from '../config/db'

export const getAllRegionals = async () => {
  return prisma.regionalOffice.findMany({
    orderBy: {
      name: 'asc'
    }
  })
}

export const updateDepositOrderNumberInRegionalOffice = async (
  regional: number
) => {
  return prisma.regionalOffice.update({
    where: {
      id: regional
    },
    data: {
      techobolDepositOrderCounter: {
        increment: 1
      }
    }
  })
}
