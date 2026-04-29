import prisma from "../config/db";
// import { DepositOrder } from '../models/DepositOrder.model'
import { DepositOrder } from "@prisma/client";

export const createDepositOrder = async (newOrderData: DepositOrder) => {
  const result = await prisma.depositOrder.create({
    data: {
      orderNumber: newOrderData.orderNumber,
      startDate: newOrderData.startDate,
      endDate: newOrderData.endDate,
      solitudeDate: newOrderData.solitudeDate,
      amount: Number(newOrderData.amount),
      deliveryDate: newOrderData.deliveryDate,
      regionalId: newOrderData.regionalId,
      employeeId: newOrderData.employeeId,
      documentUrl: newOrderData.documentUrl,
    },
    select: {
      id: true,
      orderNumber: true,
      startDate: true,
      endDate: true,
      solitudeDate: true,
      amount: true,
      deliveryDate: true,
      status: true,
      revisionStatus: true,
      documentUrl: true,
      reportUrl: true,
      generatedReportUrl: true,
      regional: {
        select: {
          id: true,
          name: true,
        },
      },
      employee: {
        select: {
          id: true,
          name: true,
          lastName: true,
        },
      },
    },
  });
  return result;
};

export const getAllDespositOrders = async () => {
  return prisma.depositOrder.findMany({
    select: {
      id: true,
      orderNumber: true,
      startDate: true,
      endDate: true,
      solitudeDate: true,
      amount: true,
      deliveryDate: true,
      status: true,
      revisionStatus: true,
      documentUrl: true,
      reportUrl: true,
      generatedReportUrl: true,

      regional: {
        select: {
          id: true,
          name: true,
          branches: {
            select: {
              id: true,
              name: true,
              address: true,
            },
          },
        },
      },
      depositOrders: {
        select: {
          id: true,
          amount: true,
          branchOffice: {
            select: {
              id: true,
              name: true,
              address: true,
            },
          },
        },
      },
      employee: {
        select: {
          id: true,
          name: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
};

export const getAllDepositOrdersByRegional = async (regional: string) => {
  return prisma.depositOrder.findMany({
    where: {
      regional: {
        name: regional,
      },
    },
    select: {
      id: true,
      orderNumber: true,
      startDate: true,
      endDate: true,
      solitudeDate: true,
      amount: true,
      deliveryDate: true,
      status: true,
      revisionStatus: true,
      documentUrl: true,
      reportUrl: true,
      generatedReportUrl: true,
      regional: {
        select: {
          id: true,
          name: true,
        },
      },
      employee: {
        select: {
          id: true,
          name: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
};

export const cancelDepositOrder = async (id: number) => {
  return prisma.depositOrder.update({
    where: {
      id: id,
    },
    data: {
      status: "Cancelado",
    },
    select: {
      id: true,
      orderNumber: true,
      startDate: true,
      endDate: true,
      solitudeDate: true,
      amount: true,
      deliveryDate: true,
      status: true,
      revisionStatus: true,
      documentUrl: true,
      reportUrl: true,
      generatedReportUrl: true,
      regional: {
        select: {
          id: true,
          name: true,
        },
      },
      employee: {
        select: {
          id: true,
          name: true,
          lastName: true,
        },
      },
    },
  });
};

export const getOneDespositOrderRepository = async (id: number) => {
  return prisma.depositOrder.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      orderNumber: true,
      startDate: true,
      endDate: true,
      solitudeDate: true,
      amount: true,
      deliveryDate: true,
      status: true,
      revisionStatus: true,
      documentUrl: true,
      reportUrl: true,
      generatedReportUrl: true,
      regional: {
        select: {
          id: true,
          name: true,
        },
      },
      employee: {
        select: {
          id: true,
          name: true,
          lastName: true,
        },
      },
      moneyCollectionAmount: true,
      expenseAmount: true,
      dollarAmountBs: true,
      dollarAmountUSD: true,
      envelopeAmount: true,
      depositAmount: true,
    },
  });
};

export const updateStatusAndReportURLAtCreatedReport = async (
  id: number,
  data: DepositOrder,
) => {
  return prisma.depositOrder.update({
    where: {
      id: id,
    },
    data: data,
    select: {
      id: true,
      orderNumber: true,
      startDate: true,
      endDate: true,
      solitudeDate: true,
      amount: true,
      deliveryDate: true,
      status: true,
      revisionStatus: true,
      documentUrl: true,
      reportUrl: true,
      generatedReportUrl: true,
      regional: {
        select: {
          id: true,
          name: true,
        },
      },
      employee: {
        select: {
          id: true,
          name: true,
          lastName: true,
        },
      },
    },
  });
};

export const updateRevitionStatusRepository = async (
  id: number,
  revisionStatus: string,
  user: any
) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Actualizar la orden
    const depositOrder = await tx.depositOrder.update({
      where: { id },
      data: { revisionStatus },
      select: {
        id: true,
        orderNumber: true,
        startDate: true,
        endDate: true,
        solitudeDate: true,
        amount: true,
        deliveryDate: true,
        status: true,
        revisionStatus: true,
        documentUrl: true,
        reportUrl: true,
        generatedReportUrl: true,
        regional: {
          select: { id: true, name: true },
        },
        employee: {
          select: { id: true, name: true, lastName: true },
        },
      },
    });

    let cashFlows: any[] = [];

    // 2. Solo si está aprobado
    if (revisionStatus === "Aprobado") {
      // 3. Traer todos los depósitos
      const deposits = await tx.deposit.findMany({
        where: {
          depositOrderId: depositOrder.id,
        },
      });

      if (!deposits.length) {
        throw new Error("No existen depósitos asociados a esta orden");
      }

      // 4. Usuario
      const dbUser = await tx.employee.findUnique({
        where: { id: user.id },
        select: {
          name: true,
          lastName: true,
        },
      });

      const fullName = dbUser
        ? `${dbUser.name} ${dbUser.lastName}`
        : user.email;

      // 5. Traer cashflows existentes de una sola vez (optimizado)
      const existingCashFlows = await tx.cashFlow.findMany({
        where: {
          source: "depositOrder",
          extraExpenseId: {
            in: deposits.map((d) => d.id),
          },
        },
      });

      const existingMap = new Map(
        existingCashFlows.map((cf) => [cf.extraExpenseId, cf])
      );

      // 6. Iterar depósitos
      for (const deposit of deposits) {
        const amountBs = Number(deposit.amount) / 6.95;
        //const rounded = Math.round(amountBs * 100) / 100;

        const existing = existingMap.get(deposit.id);

        if (!existing) {
          const created = await tx.cashFlow.create({
            data: {
              date: deposit.date,
              account: String(deposit.bank),
              type: "income",
              amount: amountBs,
              items: [
                {
                  amount: amountBs,
                  payer: fullName || "Sistema",
                  description:
                    "Ingreso de deposito " + depositOrder.orderNumber,
                },
              ],
              isUSD: true,
              source: "depositOrder",
              extraExpenseId: deposit.id,
            },
          });

          cashFlows.push(created);
        } else {
          const updated = await tx.cashFlow.update({
            where: {
              id: existing.id,
            },
            data: {
              date: deposit.date,
              account: String(deposit.bank),
              type: "income",
              amount: amountBs,
              items: [
                {
                  amount: amountBs,
                  payer: fullName || "Sistema",
                  description:
                    "Ingreso de deposito " + depositOrder.orderNumber,
                },
              ],
              isUSD: true,
            },
          });

          cashFlows.push(updated);
        }
      }
    }

    return { depositOrder, cashFlows };
  });
};
export const updateDepositOrder = async (
  id: number,
  updateData: DepositOrder,
) => {
  const result = await prisma.depositOrder.update({
    where: { id },
    data: {
      orderNumber: updateData.orderNumber,
      startDate: updateData.startDate,
      endDate: updateData.endDate,
      solitudeDate: updateData.solitudeDate,
      amount: Number(updateData.amount),
      deliveryDate: updateData.deliveryDate,
      employeeId: updateData.employeeId,
      documentUrl: updateData.documentUrl,
    },
    select: {
      id: true,
      orderNumber: true,
      startDate: true,
      endDate: true,
      solitudeDate: true,
      amount: true,
      deliveryDate: true,
      status: true,
      revisionStatus: true,
      documentUrl: true,
      reportUrl: true,
      generatedReportUrl: true,
      regional: {
        select: {
          id: true,
          name: true,
        },
      },
      employee: {
        select: {
          id: true,
          name: true,
          lastName: true,
        },
      },
    },
  });

  return result;
};

export const deleteDepositOrderBranchOfficeByOrderId = async (
  depositOrderId: number,
) => {
  return prisma.depositOrderBranchOffice.deleteMany({
    where: {
      depositOrderId,
    },
  });
};
