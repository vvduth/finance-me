import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

  type Props ={
    headers: string[], 
    body: string[][],
    selectedColumns: Record<string , string | null>,
    onTableHeadSelectChange: (columnIndex:number, value: string | null ) => void,
}
const ImportTable = ({headers, body, selectedColumns, onTableHeadSelectChange}: Props) => {
  return (
    <div>ImportTable</div>
  )
}

export default ImportTable