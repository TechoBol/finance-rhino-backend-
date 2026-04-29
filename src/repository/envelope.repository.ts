import prisma from '../config/db'
import { Envelope } from '@prisma/client'

export const createManyEnvelopesRepository = async (data: Envelope[]) => {
  return prisma.envelope.createMany({
    data: data
  })
}

export const getAllEnvelopesRepository = async () => {
  return prisma.envelope.findMany({
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
      fromBranchOffice: {
        select: {
          id: true,
          name: true
        }
      },
      toBranchOffice: {
        select: {
          id: true,
          name: true
        }
      },
      date: true,
      amount: true,
      description: true
    }
  })
}

export const getAllEnvelopesFromDepositOrderRepository = async (id: number) => {
  return prisma.envelope.findMany({
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
      fromBranchOffice: {
        select: {
          id: true,
          name: true
        }
      },
      toBranchOffice: {
        select: {
          id: true,
          name: true
        }
      },
      date: true,
      amount: true,
      description: true
    }
  })
}

export const getAllEnvelopesByRegionalRepository = async (regional: string) => {
  return prisma.envelope.findMany({
    where: {
      fromBranchOffice: {
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
      depositOrder: {
        select: {
          id: true,
          orderNumber: true
        }
      },
      fromBranchOffice: {
        select: {
          id: true,
          name: true
        }
      },
      toBranchOffice: {
        select: {
          id: true,
          name: true
        }
      },
      date: true,
      amount: true,
      description: true
    }
  })
}

export const deleteEnvelopesByDepositOrderIdRepository = async (
  depositOrderId: number
) => {
  return prisma.envelope.deleteMany({
    where: {
      depositOrderId: depositOrderId
    }
  })
}