import prisma from '../config/db'
import { MoneyCollention } from '@prisma/client'

export const createManyMoneyCollentionsRepository = async (
  data: MoneyCollention[]
) => {
  return prisma.moneyCollention.createMany({
    data: data
  })
}

export const getAllMoneyCollectionsRepository = async () => {
  return prisma.moneyCollention.findMany({
    where: {
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
      deliveredBy: true,
      receivedBy: {
        select: {
          id: true,
          name: true,
          lastName: true
        }
      }
    }
  })
}

export const getAllMoneyCollectionFromDepositOrderRepository = async (
  id: number
) => {
  return prisma.moneyCollention.findMany({
    where: {
      depositOrderId: id
    },
    select: {
      id: true,
      depositOrder: {
        select: {
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
      deliveredBy: true,
      receivedBy: {
        select: {
          id: true,
          name: true,
          lastName: true
        }
      }
    }
  })
}

export const getAllMoneyCollectionsByRegionalRepository = async (
  regional: string
) => {
  return prisma.moneyCollention.findMany({
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
      deliveredBy: true,
      receivedBy: {
        select: {
          id: true,
          name: true,
          lastName: true
        }
      }
    }
  })
}
export const deleteMoneyCollectionsByDepositOrderIdRepository = async (
  depositOrderId: number
) => {
  return prisma.moneyCollention.deleteMany({
    where: {
      depositOrderId: depositOrderId
    }
  })
}
