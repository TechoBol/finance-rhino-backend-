import prisma from "../config/db";

// repository/rastreoVentas.repository.ts
export const getRastreoVentasRepository = async (month: number, year: number) => {
  return prisma.regionalOffice.findMany({
    where: {
      isVisible: true,
      name: { not: "Sede Nacional" }, // ← excluye Sede Nacional
      branches: {
        some: { isVisible: true },    // ← solo regionales que tienen al menos una sucursal
      },
    },
    include: {
      branches: {
        where: { isVisible: true },
        include: {
          rastreoVentas: {
            where: { month, year },
          },
        },
      },
    },
    orderBy: { id: "asc" },
  });
};

export const upsertRastreoVentasRepository = async (data: {
  branchOfficeId: number;
  regionalId: number;
  month: number;
  year: number;
  startDate?: string;
  endDate?: string;
  depositDate?: string;
  amount?: number;
}) => {
  // Buscar si ya existe
  const existing = await prisma.rastreoVentas.findFirst({
    where: {
      branchOfficeId: data.branchOfficeId,
      month: data.month,
      year: data.year,
    },
  });

  if (existing) {
    // Actualizar
    return prisma.rastreoVentas.update({
      where: { id: existing.id },
      data: {
        startDate: data.startDate
          ? new Date(data.startDate)
          : existing.startDate,
        endDate: data.endDate ? new Date(data.endDate) : existing.endDate,
        depositDate: data.depositDate
          ? new Date(data.depositDate)
          : existing.depositDate,
        amount: data.amount ?? existing.amount,
      },
    });
  }

  // Crear nuevo
  return prisma.rastreoVentas.create({
    data: {
      branchOfficeId: data.branchOfficeId,
      regionalId: data.regionalId,
      month: data.month,
      year: data.year,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      depositDate: data.depositDate ? new Date(data.depositDate) : undefined,
      amount: data.amount,
    },
  });
};
