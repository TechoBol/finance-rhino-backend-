import prisma from '../config/db'
import { SubAccount } from '@prisma/client'

export const getAllSubAccountsRepository = async () => {
  return prisma.subAccount.findMany({
    where: {
      isVisible: true
    },
    select: {
      id: true,
      name: true,
      accountId: true,
      account: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
}

export const registerSubAccountRepository = async (
  newSubAccountData: SubAccount
) => {
  return prisma.subAccount.create({
    data: {
      name: newSubAccountData.name,
      accountId: newSubAccountData.accountId
    },
    select: {
      id: true,
      name: true,
      account: {
        select: {
          name: true
        }
      }
    }
  })
}

export const changeVisibilityOfSubAccountRepository = async (id: number) => {
  return prisma.subAccount.update({
    where: {
      id: id
    },
    data: {
      isVisible: false
    }
  })
}

export const changeVisibilityGivenAnAccountId = async (id: number) => {
  return prisma.subAccount.updateMany({
    where: {
      accountId: id
    },
    data: {
      isVisible: false
    }
  })
}
