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
import { Edit, MoreHorizontal } from 'lucide-react'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'

type Props = {
    id: string
}
const Actions = ({id}: Props) => {

    const {onClose, onOpen} = useOpenAccount();
  return (
    <>
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
                <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
                    <Edit className='size-4 mr-2'/>
                    Edit
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}

export default Actions