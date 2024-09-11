import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FileSearch, Loader, PieChart, Radar, Radio, Target } from "lucide-react";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PieVariant from "./pie-variant";
import RadarVariant from "./radar-variant";
import RadioVariant from "./radio-variant";
import { Skeleton } from "./ui/skeleton";
type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};
const SpendingPie = ({ data = [] }: Props) => {
  const [spendingPieType, setspendingPieType] = useState("pie");

  const onTypeChanghe = (type: string) => {
    // TODO: add paywall

    setspendingPieType(type);
  };
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader
        className="flex space-y-2 lg:space-y-0 
      lg:flex-row lg:items-center justify-between"
      >
        <CardTitle className="text-xl line-clamp-1">Category</CardTitle>
        <Select defaultValue={spendingPieType} onValueChange={onTypeChanghe}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="spendingPie Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pie">
              <div className="flex items-center">
                <PieChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Pie Chart</p>
              </div>
            </SelectItem>
            <SelectItem value="radar">
              <div className="flex items-center">
                <Radar className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radar</p>
              </div>
            </SelectItem>
            <SelectItem value="radio">
              <div className="flex items-center">
                <Target className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radio Chart</p>
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
            {spendingPieType === "pie" && <PieVariant data={data} />}
            {spendingPieType === "radar" && <RadarVariant data={data} />}

            {spendingPieType === "radio" && <RadioVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const SpendingPieLoading = () => {
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
export default SpendingPie;
