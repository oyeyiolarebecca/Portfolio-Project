import React from 'react';
import { Button } from "@/components/ui/button";
import { FaRegCalendarAlt, FaPlus } from "react-icons/fa";
import { CiExport } from "react-icons/ci";
import Link from 'next/link';

export default function SubAddPatient() {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center space-x-2">
        <FaRegCalendarAlt className="text-2xl text-teal-500" />
        <h2 className="text-lg font-semibold">Last updated: Jan 2024 - Dec 2024</h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-teal-500">
          <CiExport className="text-2xl" />
          <span>Export</span>
        </div>
        <Link href={"/dashboard/patients/addPatient"}>
          <Button className="flex items-center space-x-1 btn bg-teal-500 hover:bg-teal-600">
          <FaPlus className="text-sm" />
          <span>Add Patient</span>
        </Button>
        </Link>
      </div>
    </div>
  );
}

