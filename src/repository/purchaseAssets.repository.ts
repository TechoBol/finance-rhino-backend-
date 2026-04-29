import prisma from "../config/db";

interface ProjectInput {
  projectName: string;
  region?: string;
  total?: number;
}

export const registerProjectRepository = async (
  newProjectData: ProjectInput,
) => {
  return prisma.project.create({
    data: {
      projectName: newProjectData.projectName,
      region: newProjectData.region ?? "",
      total: newProjectData.total ?? 0,
    },
  });
};

export const getAllProjectsRepository = async () => {
  return prisma.project.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      purchaseAssetDetails: {
        select: {
          id: true,
          documentType: true,
          documentNumber: true,
          date: true,
          period: true,
          status: true,
          description: true,
          amount: true,
          order: true,
          subAccount: true,
          projectId: true,
          createdAt: true,
          regional: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
};
export const getAllRegionalOfficesRepository = async () => {
  return prisma.regionalOffice.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export const createPurchaseAssetDetailRepository = async (data: any) => {
  return prisma.$transaction(async (tx) => {
    await tx.purchaseAssetDetail.create({
      data: {
        documentType: data.documentType,
        documentNumber: data.documentNumber,
        date: new Date(data.date),
        period: data.period,
        status: data.status,
        regionalId: Number(data.regional),
        description: data.description,
        amount: Number(data.amount),
        order: data.order,
        subAccount: data.subAccount,
        projectId: Number(data.projectId),
      },
    });
    const regional = await tx.regionalOffice.findUnique({
      where: { id: Number(data.regional) },
    });
    const newRegion = regional?.name?.trim();
    const project = await tx.project.findUnique({
      where: { id: Number(data.projectId) },
    });
    let updatedRegion = project?.region || "";
    if (newRegion) {
      const regionsArray = updatedRegion
        ? updatedRegion.split(" - ").map((r) => r.trim())
        : [];

      const exists = regionsArray.some(
        (r) => r.toLowerCase() === newRegion.toLowerCase(),
      );
      if (!exists) {
        regionsArray.push(newRegion);
        updatedRegion = regionsArray.join(" - ");
      }
    }
    const updatedProject = await tx.project.update({
      where: { id: Number(data.projectId) },
      data: {
        total: {
          increment: Number(data.amount),
        },
        region: updatedRegion,
      },
      include: {
        purchaseAssetDetails: {
          include: {
            regional: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return updatedProject;
  });
};

export const updatePurchaseAssetDetailRepository = async (data: any) => {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.purchaseAssetDetail.findUnique({
      where: { id: Number(data.id) },
    });

    if (!existing) {
      throw new Error("Detalle no encontrado");
    }
    await tx.purchaseAssetDetail.update({
      where: { id: Number(data.id) },
      data: {
        documentType: data.documentType,
        documentNumber: data.documentNumber,
        date: new Date(data.date),
        period: data.period,
        status: data.status,
        regionalId: Number(data.regional),
        description: data.description,
        amount: Number(data.amount),
        order: data.order,
        subAccount: data.subAccount,
      },
    });
    const difference = Number(data.amount) - Number(existing.amount);
    await tx.project.update({
      where: { id: Number(data.projectId) },
      data: {
        total: {
          increment: difference,
        },
      },
    });
    const allDetails = await tx.purchaseAssetDetail.findMany({
      where: { projectId: Number(data.projectId) },
      include: {
        regional: true,
      },
    });
    const uniqueRegions = [
      ...new Set(
        allDetails.map((d) => d.regional?.name?.trim()).filter(Boolean),
      ),
    ];
    const updatedRegion = uniqueRegions.join(" - ");
    const updatedProject = await tx.project.update({
      where: { id: Number(data.projectId) },
      data: {
        region: updatedRegion,
      },
      include: {
        purchaseAssetDetails: {
          include: {
            regional: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return updatedProject;
  });
};
