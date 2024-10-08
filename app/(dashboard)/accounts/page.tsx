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
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDelete } from "@/features/accounts/api/use-bulk-delete-accounts";

const AccountPage = () => {
  const newAccount = useNewAccount();
  const accountsQuery = useGetAccount();
  const accounts = accountsQuery.data || [];
  const deleteAccounts = useBulkDelete();

  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

  if (accountsQuery.isLoading) {
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
          <CardTitle className="text-xl line-clamp-1">Accounts Page</CardTitle>
          <Button onClick={newAccount.onOpen} size={"sm"}>
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <DataTable
          columns={columns}
          data={accounts}
          filterKey="name"
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            console.log(ids);
            deleteAccounts.mutate({ids})
          }}
          disabled={isDisabled}
        />
      </Card>
    </div>
  );
};

export default AccountPage;
