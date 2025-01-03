import React from 'react'
import { MdSearch } from 'react-icons/md'
import { Input } from '@/components/ui/input'

export default function search({placeholder}: {
    placeholder: string
}) {
  return (
    <div><div className="flex items-center bg-gray-100 rounded-md px-2 py-1">
          <MdSearch size={20} className="text-gray-500" />
          <Input 
            type="text" 
            placeholder="Search..." 
            className="border-none focus:ring-0 focus:outline-none"
          />
        </div></div>
  )
}
