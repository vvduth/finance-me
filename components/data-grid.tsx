"use client";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { formatDateRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FaArrowAltCircleDown, FaArrowCircleUp, FaPiggyBank } from "react-icons/fa";
import DataCard from "./data-card";

const DataGrid = () => {
  const { data } = useGetSummary();
  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;

  const dateRangeLabel = formatDateRange({ to, from });
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-3 
    gap-8 pb-2 mb-8"
    >
      <DataCard
        title="Remaining"
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        icon={FaPiggyBank}
        variant={"default"}
        dateRange={dateRangeLabel}
      />
      <DataCard
        title="Income"
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
        icon={FaArrowCircleUp}
        variant={"default"}
        dateRange={dateRangeLabel}
      />
      <DataCard
        title="Expenses"
        value={data?.expenseAmount}
        percentageChange={data?.expenseChange}
        icon={FaArrowAltCircleDown}
        variant={"default"}
        dateRange={dateRangeLabel}
      />
    </div>
  );
};

export default DataGrid;
