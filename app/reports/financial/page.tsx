"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts"

const revenueData = [
    { month: "Jan", revenue: 65000, expenses: 50000 },
    { month: "Feb", revenue: 59000, expenses: 45000 },
    { month: "Mar", revenue: 80000, expenses: 60000 },
    { month: "Apr", revenue: 81000, expenses: 62000 },
    { month: "May", revenue: 56000, expenses: 48000 },
    { month: "Jun", revenue: 55000, expenses: 46000 },
]

const departmentData = [
    { name: "Cardiology", revenue: 120000 },
    { name: "Neurology", revenue: 95000 },
    { name: "Pediatrics", revenue: 85000 },
    { name: "Orthopedics", revenue: 110000 },
    { name: "Oncology", revenue: 130000 },
]

export default function FinancialReportsPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Financial Reports</h1>
            <Tabs defaultValue="revenue">
                <TabsList>
                    <TabsTrigger value="revenue">Revenue & Expenses</TabsTrigger>
                    <TabsTrigger value="departments">Department Revenue</TabsTrigger>
                </TabsList>
                <TabsContent value="revenue">
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue & Expenses Overview</CardTitle>
                            <CardDescription>Monthly breakdown of revenue and expenses</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={revenueData}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="departments">
                    <Card>
                        <CardHeader>
                            <CardTitle>Department Revenue</CardTitle>
                            <CardDescription>Revenue breakdown by department</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={departmentData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="revenue" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

