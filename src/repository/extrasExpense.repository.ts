import prisma from "../config/db";

export const registerExtraExpense = async (data: any, user: any) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Crear el gasto extra
    const extraExpense = await tx.extraExpenses.create({
      data: {
        typeDocument: data.typeDocument,
        numberDocument: data.numberDocument,
        date: new Date(data.date),
        period: data.period,
        state: data.state,
        expenseType: data.expenseType,
        regionalId: Number(data.regionalId),
        branchOfficeId: Number(data.branchOfficeId),
        accountId: Number(data.accountId),
        subAccountId: Number(data.subAccountId),
        expenseName: data.expenseName,
        description: data.description,
        amount: Number(data.amount),
        order:
          data.expenseType === "Movimiento Interno"
            ? data.bankOrigin
            : data.order,
        bankOrigin:
          data.expenseType === "Movimiento Interno" ? data.bankOrigin : null,

        bankDestination:
          data.expenseType === "Movimiento Interno"
            ? data.bankDestination
            : null,
      },
      include: {
        regional: true,
        branchOffice: true,
        account: true,
        subAccount: true,
      },
    });
    const dbUser = await tx.employee.findUnique({
      where: { id: user.id },
      select: {
        name: true,
        lastName: true,
      },
    });
    const fullName = dbUser ? `${dbUser.name} ${dbUser.lastName}` : user.email;

    // 2. Crear el cashflow usando datos del gasto
    const amountBs = Number(data.amount);
    //const rounded = Math.round(amountBs * 100) / 100;
    const cashFlow = await tx.cashFlow.create({
      data: {
        date: new Date(data.date),
        account:
          data.expenseType === "Movimiento Interno"
            ? data.bankOrigin
            : data.order,
        type: "expense",
        amount: amountBs,
        items: [
          {
            amount: amountBs,
            payer: fullName || "Sistema",
            description: data.description || "Gasto automático",
          },
        ],
        isUSD: false,
        source: "extraExpense",
        extraExpenseId: extraExpense.id,
      },
    });
    let cashFlowDestination;
    if (data.expenseType === "Movimiento Interno") {
      cashFlowDestination = await tx.cashFlow.create({
        data: {
          date: new Date(data.date),
          account: data.bankDestination,
          type: "income",
          amount: amountBs,
          items: [
            {
              amount: amountBs,
              payer: fullName || "Sistema",
              description: data.description || "Gasto automático",
            },
          ],
          isUSD: false,
          source: "extraExpense",
          extraExpenseId: extraExpense.id,
        },
      });
    }
    return {
      extraExpense,
      cashFlow,
      cashFlowDestination,
    };
  });
};

export const getAllExtraExpensesRepository = async () => {
  return prisma.extraExpenses.findMany({
    include: {
      regional: true,
      branchOffice: true,
      account: true,
      subAccount: true,
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

export const updateExtraExpensesRepository = async (
  id: number,
  data: any,
  user: any,
) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Actualizar el gasto
    const updatedExpense = await tx.extraExpenses.update({
      where: {
        id: Number(id),
      },
      data: {
        typeDocument: data.typeDocument,
        numberDocument: data.numberDocument,
        date: new Date(data.date),
        period: data.period,
        state: data.state,
        expenseType: data.expenseType,
        regionalId: Number(data.regionalId),
        branchOfficeId: Number(data.branchOfficeId),
        accountId: Number(data.accountId),
        subAccountId: Number(data.subAccountId),
        expenseName: data.expenseName,
        description: data.description,
        amount: Number(data.amount),
        order:
          data.expenseType === "Movimiento Interno"
            ? data.bankOrigin
            : data.order,
        bankOrigin:
          data.expenseType === "Movimiento Interno" ? data.bankOrigin : null,

        bankDestination:
          data.expenseType === "Movimiento Interno"
            ? data.bankDestination
            : null,
      },
      include: {
        regional: true,
        branchOffice: true,
        account: true,
        subAccount: true,
      },
    });

    // 2. Conversión monto
    const amountBs = Number(data.amount);
    //const rounded = Math.round(amountBs * 100) / 100;

    // 3. Usuario
    const dbUser = await tx.employee.findUnique({
      where: { id: user.id },
      select: {
        name: true,
        lastName: true,
      },
    });

    const fullName = dbUser ? `${dbUser.name} ${dbUser.lastName}` : user.email;

    // 4. Buscar cashflows existentes
    const existingCashFlows = await tx.cashFlow.findMany({
      where: {
        extraExpenseId: updatedExpense.id,
        source: "extraExpense",
      },
    });

    const existingExpenseFlow = existingCashFlows.find(
      (f) => f.type === "expense",
    );

    const existingIncomeFlow = existingCashFlows.find(
      (f) => f.type === "income",
    );

    // 5. CASHFLOW ORIGEN (expense)
    let cashFlow;

    if (existingExpenseFlow) {
      cashFlow = await tx.cashFlow.update({
        where: { id: existingExpenseFlow.id },
        data: {
          date: new Date(data.date),
          account: String(data.order),
          type: "expense",
          amount: amountBs,
          items: [
            {
              amount: amountBs,
              payer: fullName || "Sistema",
              description: data.description || "Gasto automático",
            },
          ],
          isUSD: data.isUSD ?? true,
        },
      });
    } else {
      cashFlow = await tx.cashFlow.create({
        data: {
          date: new Date(data.date),
          account: String(data.order),
          type: "expense",
          amount: amountBs,
          items: [
            {
              amount: amountBs,
              payer: fullName || "Sistema",
              description: data.description || "Gasto automático",
            },
          ],
          isUSD: data.isUSD ?? true,
          source: "extraExpense",
          extraExpenseId: updatedExpense.id,
        },
      });
    }

    // 6. CASHFLOW DESTINO (solo Movimiento Interno)
    let cashFlowDestination = null;

    if (data.expenseType === "Movimiento Interno") {
      if (existingIncomeFlow) {
        cashFlowDestination = await tx.cashFlow.update({
          where: { id: existingIncomeFlow.id },
          data: {
            date: new Date(data.date),
            account: String(data.bankDestination),
            type: "income",
            amount: amountBs,
            items: [
              {
                amount: amountBs,
                payer: fullName || "Sistema",
                description: data.description || "Movimiento interno",
              },
            ],
            isUSD: data.isUSD ?? true,
          },
        });
      } else {
        cashFlowDestination = await tx.cashFlow.create({
          data: {
            date: new Date(data.date),
            account: String(data.bankDestination),
            type: "income",
            amount: amountBs,
            items: [
              {
                amount: amountBs,
                payer: fullName || "Sistema",
                description: data.description || "Movimiento interno",
              },
            ],
            isUSD: data.isUSD ?? true,
            source: "extraExpense",
            extraExpenseId: updatedExpense.id,
          },
        });
      }
    } else {
      // si ya no es movimiento interno → eliminar destino si existe
      if (existingIncomeFlow) {
        await tx.cashFlow.delete({
          where: { id: existingIncomeFlow.id },
        });
      }
    }

    // 7. RETURN FINAL
    return {
      updatedExpense,
      cashFlow,
      cashFlowDestination,
    };
  });
};
