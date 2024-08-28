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
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteCategory } from "@/features/categories/api/use-bulk-delete-category";

const CategoriesPage = () => {
  const newcategory = useNewCategory();
  const categorysQuery = useGetCategories();
  const categories = categorysQuery.data || [];
  const deleteCategories = useBulkDeleteCategory();

  const isDisabled = categorysQuery.isLoading || deleteCategories.isPending;

  if (categorysQuery.isLoading) {
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
          <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>
          <Button onClick={newcategory.onOpen} size={"sm"}>
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <DataTable
          columns={columns}
          data={categories}
          filterKey="name"
          onDelete={(row) => {
            const ids = row.map((r) => r.original.id);
            deleteCategories.mutate({ids})
          }}
          disabled={isDisabled}
        />
      </Card>
    </div>
  );
};

export default CategoriesPage;
