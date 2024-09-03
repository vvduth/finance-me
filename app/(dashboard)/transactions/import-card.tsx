import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImportTable from "./import-table";
const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outoutFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

interface SelectedColumnsState {
  [key: string]: string | null;
}

type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};
const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const headers = data[0];
  const body = data.slice(1);

  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {}
  );
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader
          className="gap-y-2 lg:flex-row l
            g:items-center lg:justify-between"
        >
          <CardTitle className="text-xl line-clamp-1">
            Import transaction
          </CardTitle>
          <div className="flex gap-x-2 items-center">
            <Button onClick={onCancel} size={"sm"}>
              Cancel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportCard;
