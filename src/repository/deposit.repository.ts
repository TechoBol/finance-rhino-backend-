import { Deposit } from '@prisma/client'
import prisma from '../config/db'

export const createManyDepositsRepository = async (data: Deposit[]) => {
  return prisma.deposit.createMany({
    data: data
  })
}

export const getAllDepositsReposiory = async () => {
  return prisma.deposit.findMany({
    where: { 
      depositOrder: { 
        status: { 
          not: 'Cancelado'
        }
      },
    },
    select: {
      depositOrder: {
        select: {
          id: true,
          orderNumber: true
        }
      },
      voucherNumber: true,
      bank: true,
      date: true,
      amount: true,
      description: true
    }
  })
}

export const getAllDepositsFromDepositOrderRepository = async (id: number) => {
  return prisma.deposit.findMany({
    where: {
      depositOrderId: id
    },
    select: {
      depositOrder: {
        select: {
          id: true,
          orderNumber: true
        }
      },
      voucherNumber: true,
      bank: true,
      date: true,
      amount: true,
      description: true
    }
  })
}

export const getAllDepositsByRegionalRepository = async (regional: string) => {
 return prisma.deposit.findMany({ 
  where: { 
    depositOrder: { 
      regional: { 
        name: regional
      },
      status: { 
        not: 'Cancelado'
      }
    },
  },
  select: {
    depositOrder: {
      select: {
        id: true,
        orderNumber: true
      }
    },
    voucherNumber: true,
    bank: true,
    date: true,
    amount: true,
    description: true
  }
 })
} 
export const deleteDepositsByDepositOrderIdRepository = async (
  depositOrderId: number
) => {
  return prisma.deposit.deleteMany({
    where: {
      depositOrderId: depositOrderId
    }
  })
}