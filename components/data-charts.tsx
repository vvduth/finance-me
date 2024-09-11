"use client";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import React from "react";
import Chart from "./chart";

const DataCharts = () => {
  const { data, isLoading } = useGetSummary();
  
  if (data?.days) {
    console.log(data.days)
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data?.days} />
      </div>
    </div>
  );
};

export default DataCharts;
