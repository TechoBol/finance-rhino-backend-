import prisma from '../config/db'
import { BranchOffice } from '@prisma/client'

export const getAllBranchOfficesRepository = async () => {
  return prisma.branchOffice.findMany({
    where: {
      isVisible: true
    },
    select: {
      id: true,
      name: true,
      address: true,
      regionalOfficeId: true,
      regionalOffice: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      regionalOffice: {
        name: 'asc'
      }
    }
  })
}

export const registerBranchOfficeRepository = async (
  newBranchOfficeData: BranchOffice
) => {
  return prisma.branchOffice.create({
    data: {
      name: newBranchOfficeData.name,
      address: newBranchOfficeData.address,
      regionalOfficeId: newBranchOfficeData.regionalOfficeId
    },
    select: {
      id: true,
      name: true,
      address: true,
      regionalOfficeId: true,
      regionalOffice: {
        select: {
          name: true
        }
      }
    }
  })
}

export const changeVisibilityOfBranchOfficeRepository = async (id: number) => {
  return prisma.branchOffice.update({
    where: {
      id: id
    },
    data: {
      isVisible: false
    }
  })
}
