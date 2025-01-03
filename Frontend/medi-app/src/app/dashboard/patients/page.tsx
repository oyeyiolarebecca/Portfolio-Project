"use client";
import Search from "@/app/ui/Dashboard/Search/search";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function PatientsPage( ) {
  return (
    <Card className="p-6 space-y-8">
      {/* Top section */}
      <div className="flex justify-between items-center">
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/patients/addPatient">
          <Button variant="default">Add Patient</Button>
        </Link>
      </div>

      {/* Table section */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Has Appointment</TableHead>
            <TableHead>Patient Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Image src="/noavater.png" alt="" width={40} height={40} className="rounded-full" />
                    <span>John Doe</span>
                  </div>
                </TableCell>
                <TableCell>Johndeo@gmail.com</TableCell>
                <TableCell>13/12/1992</TableCell>
                <TableCell>false</TableCell>
                <TableCell>
                  <span className="text-green-600 font-medium">Active</span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-4">
                    <Link href="/dashboard/patients/Id">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
}
