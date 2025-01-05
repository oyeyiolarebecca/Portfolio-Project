import React from 'react';
import SubAddPatient from '../ui/Dashboard/SubAddPatient/subaddPatient';
import Card from '../ui/Dashboard/Cards/cards';
import Chart from '../ui/Dashboard/Charts/charts';
import Table from '../ui/Dashboard/Table/table';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* SubAddPatient Section */}
      <SubAddPatient />

      {/* Cards Section */}
      <div className="flex justify-between gap-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      {/* Chart Section */}
      <Chart />

      {/* Table Section */}
      <Table />
    </div>
  );
}
