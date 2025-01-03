"use client";
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import LineChart from "./linechart";
import BarChart from "./barchart";

export default function Chart() {
  return (
    <Card className="w-full p-4">
      <CardHeader>
        <CardTitle>Recap Week</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Flex container to style both charts */}
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex-1 min-w-[300px]">
            <LineChart />
          </div>
          <div className="flex-1 min-w-[300px]">
            <BarChart />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
