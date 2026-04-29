import prisma from '../config/db'
import { DepositOrderBranchOffice } from '@prisma/client'

export const createManyDepositOrderBranchOffice = async (
  depositOrderBranchOffices: DepositOrderBranchOffice[]
) => {
  return prisma.depositOrderBranchOffice.createMany({
    data: depositOrderBranchOffices
  })
}

export const getAllDespositOrderBranchOffice = async () => {
  return prisma.depositOrderBranchOffice.findMany({
    select: {
      id: true,
      depositOrderId: true,
      branchOfficeId: true,
      amount: true,
      branchOffice: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
}

export const getAllDespositOrderBranchOfficeGivenAnDepositOrderId = async (
  depositOrderId: number
) => {
  return prisma.depositOrderBranchOffice.findMany({
    where: {
      depositOrderId: depositOrderId
    },
    select: {
      id: true,
      depositOrderId: true,
      branchOfficeId: true,
      amount: true,
      branchOffice: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
}
