"use client";
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function PatientsTable() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Patients List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left">PatientID</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Patient Name</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Age</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Gender</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Department</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Primary Diagnosis</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2">000123</td>
                <td className="border border-gray-200 px-4 py-2">John Doe</td>
                <td className="border border-gray-200 px-4 py-2">29</td>
                <td className="border border-gray-200 px-4 py-2">Male</td>
                <td className="border border-gray-200 px-4 py-2">18/12/2024</td>
                <td className="border border-gray-200 px-4 py-2">General Surgery</td>
                <td className="border border-gray-200 px-4 py-2">Appendicitis</td>
                <td className="border border-gray-200 px-4 py-2 text-green-600">Inpatient</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">000124</td>
                <td className="border border-gray-200 px-4 py-2">Jennifer Mathew</td>
                <td className="border border-gray-200 px-4 py-2">32</td>
                <td className="border border-gray-200 px-4 py-2">Female</td>
                <td className="border border-gray-200 px-4 py-2">10/10/2024</td>
                <td className="border border-gray-200 px-4 py-2">Oncology</td>
                <td className="border border-gray-200 px-4 py-2">Lung Cancer</td>
                <td className="border border-gray-200 px-4 py-2 text-red-600">Outpatient</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">000125</td>
                <td className="border border-gray-200 px-4 py-2">James Andrew</td>
                <td className="border border-gray-200 px-4 py-2">56</td>
                <td className="border border-gray-200 px-4 py-2">Male</td>
                <td className="border border-gray-200 px-4 py-2">26/06/2024</td>
                <td className="border border-gray-200 px-4 py-2">Oncology</td>
                <td className="border border-gray-200 px-4 py-2">Lung Cancer</td>
                <td className="border border-gray-200 px-4 py-2 text-green-600">Inpatient</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">000126</td>
                <td className="border border-gray-200 px-4 py-2">Mathew Laurel</td>
                <td className="border border-gray-200 px-4 py-2">29</td>
                <td className="border border-gray-200 px-4 py-2">Female</td>
                <td className="border border-gray-200 px-4 py-2">10/08/2024</td>
                <td className="border border-gray-200 px-4 py-2">Oncology</td>
                <td className="border border-gray-200 px-4 py-2">Lung Cancer</td>
                <td className="border border-gray-200 px-4 py-2 text-red-600">Outpatient</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
