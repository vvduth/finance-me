"use client"

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction'
import { useDeleteTransaction } from '@/features/transactions/api/use-delete-transaction'
import useConfirm from '@/hooks/use-confirm'

type Props = {
    id: string
}
const Actions = ({id}: Props) => {
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?", 
        "You are about to delet this tramsaction"
    )

    const deleteMutation = useDeleteTransaction(id);

    const {onClose, onOpen} = useOpenTransaction();

    const handleDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate()
        }
    }
  return (
    <>
    <ConfirmDialog/>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                 variant={"ghost"}
                 className='size-8 p-0'
                >
                    <MoreHorizontal className='size-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem disabled={deleteMutation.isPending} onClick={() => onOpen(id)}>
                    <Edit className='size-4 mr-2'/>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleDelete}>
                    <Trash className='size-4 mr-2'/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}

export default Actions