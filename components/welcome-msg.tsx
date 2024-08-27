"use client"
import { useUser } from '@clerk/nextjs'
import { Highlighter } from 'lucide-react'
import React from 'react'

const WelcomeMsg = () => {
    const {user, isLoaded} = useUser()
  return (
    <div className='space-y-2 mb-4'>
        <h2 className='text-2xl lg:text-4xl text-white font-medium'>Welcome{isLoaded ? ", " : " "} {user?.firstName}</h2>
        <p className='text-sm lg:text-base'>
            This is your financial overview report
        </p>
    </div>
  )
}

export default WelcomeMsg