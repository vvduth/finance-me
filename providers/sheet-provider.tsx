"use client";

import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet";
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { EditCatergorySheet } from "@/features/categories/components/edit-category-sheet";
import { NewCategorySheet } from "@/features/categories/components/new-category-sheet";
import { EditTransactionSheet } from "@/features/transactions/components/edit-transaction-sheet";
import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet";

import { useEffect, useState } from "react";
export const SheetProvider = () => {
  //const isMounted = useMountedState();

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true);
  },[])
  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet/>

      <NewCategorySheet/>
      <EditCatergorySheet />
      
      <NewTransactionSheet />
      <EditTransactionSheet />
    </>
  );
};
