-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "roleId" INTEGER NOT NULL,
    "regionalOfficeId" INTEGER NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "maxEmployeesAllowed" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepositOrder" (
    "id" SERIAL NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "solitudeDate" TIMESTAMP(3) NOT NULL,
    "deliveryDate" TIMESTAMP(3),
    "amount" DOUBLE PRECISION NOT NULL,
    "regionalId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Emitido',
    "revisionStatus" TEXT NOT NULL DEFAULT 'No Asignado',
    "moneyCollectionAmount" DOUBLE PRECISION,
    "expenseAmount" DOUBLE PRECISION,
    "dollarAmountUSD" DOUBLE PRECISION,
    "dollarAmountBs" DOUBLE PRECISION,
    "envelopeAmount" DOUBLE PRECISION,
    "depositAmount" DOUBLE PRECISION,
    "deliveredDate" TIMESTAMP(3),
    "documentUrl" TEXT DEFAULT '',
    "generatedReportUrl" TEXT DEFAULT '',
    "reportUrl" TEXT DEFAULT '',

    CONSTRAINT "DepositOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepositOrderBranchOffice" (
    "id" SERIAL NOT NULL,
    "depositOrderId" INTEGER NOT NULL,
    "branchOfficeId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DepositOrderBranchOffice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegionalOffice" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "regionalAbbr" TEXT,
    "techobolDepositOrderCounter" INTEGER NOT NULL DEFAULT 0,
    "megadisDepositOrderCounter" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RegionalOffice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BranchOffice" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "regionalOfficeId" INTEGER NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "BranchOffice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubAccount" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SubAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoneyCollention" (
    "id" SERIAL NOT NULL,
    "depositOrderId" INTEGER NOT NULL,
    "branchOfficeId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "deliveredBy" TEXT NOT NULL,
    "receivedById" INTEGER NOT NULL,

    CONSTRAINT "MoneyCollention_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "depositOrderId" INTEGER NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "branchOfficeId" INTEGER NOT NULL,
    "expenseType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "accountId" INTEGER NOT NULL,
    "subAccountId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dollar" (
    "id" SERIAL NOT NULL,
    "depositOrderId" INTEGER NOT NULL,
    "branchOfficeId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "amountBs" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Dollar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Envelope" (
    "id" SERIAL NOT NULL,
    "depositOrderId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "fromBranchOfficeId" INTEGER NOT NULL,
    "toBranchOfficeId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Envelope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deposit" (
    "id" SERIAL NOT NULL,
    "depositOrderId" INTEGER NOT NULL,
    "voucherNumber" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Deposit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_regionalOfficeId_fkey" FOREIGN KEY ("regionalOfficeId") REFERENCES "RegionalOffice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepositOrder" ADD CONSTRAINT "DepositOrder_regionalId_fkey" FOREIGN KEY ("regionalId") REFERENCES "RegionalOffice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepositOrder" ADD CONSTRAINT "DepositOrder_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepositOrderBranchOffice" ADD CONSTRAINT "DepositOrderBranchOffice_depositOrderId_fkey" FOREIGN KEY ("depositOrderId") REFERENCES "DepositOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepositOrderBranchOffice" ADD CONSTRAINT "DepositOrderBranchOffice_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "BranchOffice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BranchOffice" ADD CONSTRAINT "BranchOffice_regionalOfficeId_fkey" FOREIGN KEY ("regionalOfficeId") REFERENCES "RegionalOffice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubAccount" ADD CONSTRAINT "SubAccount_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyCollention" ADD CONSTRAINT "MoneyCollention_depositOrderId_fkey" FOREIGN KEY ("depositOrderId") REFERENCES "DepositOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyCollention" ADD CONSTRAINT "MoneyCollention_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "BranchOffice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyCollention" ADD CONSTRAINT "MoneyCollention_receivedById_fkey" FOREIGN KEY ("receivedById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_depositOrderId_fkey" FOREIGN KEY ("depositOrderId") REFERENCES "DepositOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "BranchOffice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_subAccountId_fkey" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dollar" ADD CONSTRAINT "Dollar_depositOrderId_fkey" FOREIGN KEY ("depositOrderId") REFERENCES "DepositOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dollar" ADD CONSTRAINT "Dollar_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "BranchOffice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envelope" ADD CONSTRAINT "Envelope_depositOrderId_fkey" FOREIGN KEY ("depositOrderId") REFERENCES "DepositOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envelope" ADD CONSTRAINT "Envelope_fromBranchOfficeId_fkey" FOREIGN KEY ("fromBranchOfficeId") REFERENCES "BranchOffice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envelope" ADD CONSTRAINT "Envelope_toBranchOfficeId_fkey" FOREIGN KEY ("toBranchOfficeId") REFERENCES "BranchOffice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deposit" ADD CONSTRAINT "Deposit_depositOrderId_fkey" FOREIGN KEY ("depositOrderId") REFERENCES "DepositOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
