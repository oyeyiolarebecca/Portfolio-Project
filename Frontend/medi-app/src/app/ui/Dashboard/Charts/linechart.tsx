"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

// Line chart data and options
const lineChartData = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      label: "Visits",
      data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
      borderColor: "#82ca9d",
      backgroundColor: "rgba(130, 202, 157, 0.2)",
      tension: 0.4,
    },
    {
      label: "Clicks",
      data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
      borderColor: "#8884d8",
      backgroundColor: "rgba(136, 132, 216, 0.2)",
      borderDash: [5, 5],
      tension: 0.4,
    },
  ],
};

const lineChartOptions = {
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

export default function LineChart() {
  return (
    <div className="h-96">
      <Line data={lineChartData} options={lineChartOptions} />
    </div>
  );
}
