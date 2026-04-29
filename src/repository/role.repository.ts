import prisma from "../config/db";


export const getAllRolesRepository = async () => {
    return prisma.role.findMany()
}