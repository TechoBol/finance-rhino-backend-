import prisma from '../config/db'
import { Account } from '@prisma/client'

export const getAllAccountsRepository = async () => {
  return prisma.account.findMany({
    where: {
      isVisible: true
    },
    select: {
      id: true,
      name: true
    }
  })
}

export const registerAccountRepository = async (newAccountData: Account) => {
  return prisma.account.create({
    data: {
      id: newAccountData.id,
      name: newAccountData.name
    }
  })
}

export const changeVisibilityAccountRepository = async (id: number) => {
  return prisma.account.update({
    where: {
      id
    },
    data: {
      isVisible: false
    }
  })
}
