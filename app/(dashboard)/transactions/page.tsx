"use client";
import React from "react";
import {transactions as transactionSchema} from "@/db/schema"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useState } from "react";
import UploadButton from "./upload-button";
import ImportCard from "./import-card";
import useSelectAccount from "@/features/accounts/hooks/use-select-account";
import { toast } from "sonner";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";
enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULT = {
  data: [],
  errors: [],
  meta: {},
};
const TransactionPage = () => {
  const [AccountDialog, confirm] = useSelectAccount()
  const newTransaction = useNewTransaction();
  const transactionsQuery = useGetTransactions();
  const transactions = transactionsQuery.data || [];
  const deleteTransaction = useBulkDeleteTransactions();
  const bulkCreateTransaction = useBulkCreateTransactions();

  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResult, setImportResult] = useState(INITIAL_IMPORT_RESULT);

  const onUpload = (results: typeof INITIAL_IMPORT_RESULT) => {
    setImportResult(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCanCelImport = () => {
    setImportResult(INITIAL_IMPORT_RESULT);
    setVariant(VARIANTS.LIST);
  };

  const isDisabled = transactionsQuery.isLoading || deleteTransaction.isPending;

  const onSubmitImport = async (values: typeof transactionSchema.$inferInsert[]) => {
    const accountId = await confirm();

    if(!accountId) {
      return toast.error("Please select an account to continue")
    }

    const data = values.map((value)=>({
      ...value, 
      accountId: accountId as string 
    }))
    console.log("clicked")
    bulkCreateTransaction.mutate(data, {
      onSuccess: () => {
        onCanCelImport();
      }
    })
  }

  if (transactionsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
      <AccountDialog />
        <ImportCard
          data={importResult.data}
          onCancel={onCanCelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader
          className="gap-y-2 lg:flex-row l
            g:items-center lg:justify-between"
        >
          <CardTitle className="text-xl line-clamp-1">
            Transaction history
          </CardTitle>
          <div className="flex gap-x-2 items-center">
            <Button onClick={newTransaction.onOpen} size={"sm"}>
              <Plus className="size-4 mr-2" />
              Add new
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
        <DataTable
          columns={columns}
          data={transactions}
          filterKey="payee"
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteTransaction.mutate({ ids });
          }}
          disabled={isDisabled}
        />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionPage;
