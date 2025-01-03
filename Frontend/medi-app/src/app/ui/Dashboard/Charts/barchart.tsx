"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Bar chart data and options
const barChartData = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      label: "Revenue",
      data: [2000, 4500, 3000, 5000, 7000, 8000, 6000],
      backgroundColor: "Teal",
      borderColor: "#fb8c00",
      borderWidth: 1,
    },
  ],
};

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top" as const,
    },
    tooltip: {
      backgroundColor: "#f1ecec",
      titleColor: "#000",
      bodyColor: "#000",
      borderColor: "#ddd",
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: { display: false },
    },
    y: {
      grid: { display: true, color: "#f0f0f0" },
    },
  },
};

export default function BarChart() {
  return (
    <div className="h-96 mt-8">
      <Bar data={barChartData} options={barChartOptions} />
    </div>
  );
}
