"use client";
import React from "react";
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

const TransactionPage = () => {
  const newTransaction = useNewTransaction();
  const transactionsQuery = useGetTransactions();
  const transactions = transactionsQuery.data || [];
  const deleteTransaction = useBulkDeleteTransactions();

  const isDisabled = transactionsQuery.isLoading || deleteTransaction.isPending;

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
          <Button onClick={newTransaction.onOpen} size={"sm"}>
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
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
      </Card>
    </div>
  );
};

export default TransactionPage;
