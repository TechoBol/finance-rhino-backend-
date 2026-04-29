-- CreateIndex
CREATE INDEX "Expense_date_idx" ON "Expense"("date");

-- CreateIndex
CREATE INDEX "Expense_depositOrderId_idx" ON "Expense"("depositOrderId");

-- CreateIndex
CREATE INDEX "Expense_branchOfficeId_idx" ON "Expense"("branchOfficeId");

-- CreateIndex
CREATE INDEX "Expense_accountId_idx" ON "Expense"("accountId");
