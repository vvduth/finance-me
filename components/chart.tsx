import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AreaChart, BarChart, FileSearch, LineChart, Loader } from "lucide-react";
import AreaVariant from "./area-variant";
import BarVariant from "./bar-variant";
import LineVariant from "./line-variant";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "./ui/skeleton";
type Props = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};
const Chart = ({ data = [] }: Props) => {
  const [chartType, setChartType] = useState("area");

  const onTypeChanghe = (type: string) => {
    // TODO: add paywall

    setChartType(type);
  };
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 
      lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Transactions</CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChanghe}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-center">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Area chart</p>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center">
                <LineChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Line chart</p>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-center">
                <BarChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Bar chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        
      </CardHeader>
      <CardContent>
          {data.length === 0 ? (
            <div className="flex flex-col gap-y-4 items-center justify-center h-[350px]">
              <FileSearch className="size-6 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">
                No data for this period
              </p>
            </div>
          ) : (
           <>
            {
                chartType === "line" && <LineVariant data={data} />
            }
            {
                chartType === "area" && <AreaVariant data={data} />
            }
            {
                chartType === "bar" && <BarVariant data={data} />
            }
           </>
          )}
        </CardContent>
    </Card>
  );
};

export const ChartLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader
        className="flex space-y-2 lg:space-y-0 
      lg:flex-row lg:items-center justify-between"
      >
        <Skeleton className="h-8 w-48" />
        <p>
            <span><Loader className="size-4 mr-2" />
            
            </span>
        </p>
      </CardHeader>
    </Card>
  );
};


export default Chart;
