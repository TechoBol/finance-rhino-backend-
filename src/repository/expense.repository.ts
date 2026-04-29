import prisma from '../config/db'
import { Expense } from '@prisma/client'

export const createManyExpensesRepository = async (data: Expense[]) => {
  return prisma.expense.createMany({
    data: data
  })
}

export const getAllExpensesRepository = async () => {
  return prisma.expense.findMany({
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
      documentType: true,
      documentNumber: true,
      date: true,
      amount: true,
      expenseType: true,
      account: {
        select: {
          id: true,
          name: true
        }
      },
      subAccount: {
        select: {
          id: true,
          name: true
        }
      },
      description: true
    },
    orderBy: {
      date: 'desc'
    }
  })
}

export const getAllExpensesFromDepositOrderRepository = async (id: number) => {
  return prisma.expense.findMany({
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
      documentType: true,
      documentNumber: true,
      date: true,
      amount: true,
      expenseType: true,
      account: {
        select: {
          id: true,
          name: true
        }
      },
      subAccount: {
        select: {
          id: true,
          name: true
        }
      },
      description: true
    }
  })
}

export const getAllExpensesByRegionalRepository = async (regional: string) => {
  return prisma.expense.findMany({
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
      documentType: true,
      documentNumber: true,
      date: true,
      amount: true,
      expenseType: true,
      account: {
        select: {
          id: true,
          name: true
        }
      },
      subAccount: {
        select: {
          id: true,
          name: true
        }
      },
      description: true
    },
    orderBy: {
      date: 'desc'
    }
  })
}

export const deleteExpensesByDepositOrderIdRepository = async (
  depositOrderId: number
) => {
  return prisma.expense.deleteMany({
    where: {
      depositOrderId: depositOrderId
    }
  })
}