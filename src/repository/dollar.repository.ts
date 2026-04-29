import prisma from '../config/db'
import { Dollar } from '@prisma/client'

export const createManyDollarsRepository = async (data: Dollar[]) => {
  return prisma.dollar.createMany({
    data: data
  })
}

export const getAllDollarsRepository = async () => {
  return prisma.dollar.findMany({
    where: { 
      depositOrder: { 
        status: { 
          not: 'Cancelado'
        }
      },
    },
    select: {
      id: true,
      depositOrder: {
        select: {
          id: true,
          orderNumber: true
        }
      },
      branchOffice: {
        select: {
          id: true,
          name: true
        }
      },
      date: true,
      amount: true,
      amountBs: true,
      description: true
    }
  })
}

export const getAllDollarsFromDepositOrderRepository = async (id: number) => {
  return prisma.dollar.findMany({
    where: {
      depositOrderId: id
    },
    select: {
      id: true,
      depositOrder: {
        select: {
          id: true,
          orderNumber: true
        }
      },
      branchOffice: {
        select: {
          id: true,
          name: true
        }
      },
      date: true,
      amount: true,
      amountBs: true,
      description: true
    }
  })
}

export const getAllDollarsByRegionalRepository = async (regional: string) => {
  return prisma.dollar.findMany({
    where: { 
      branchOffice: { 
        regionalOffice: { 
          name: regional
        }
      },
      depositOrder: { 
        status: {
          not: 'Cancelado'
        }
      }
    },
    select: {
      id: true,
      depositOrder: {
        select: {
          id: true,
          orderNumber: true
        }
      },
      branchOffice: {
        select: {
          id: true,
          name: true
        }
      },
      date: true,
      amount: true,
      amountBs: true,
      description: true
    }
  })
} 

export const deleteDollarsByDepositOrderIdRepository = async (
  depositOrderId: number
) => {
  return prisma.dollar.deleteMany({
    where: {
      depositOrderId: depositOrderId
    }
  })
}