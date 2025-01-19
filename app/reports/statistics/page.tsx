"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"

const genderData = [
    { name: "Male", value: 540 },
    { name: "Female", value: 620 },
    { name: "Other", value: 74 },
]

const ageData = [
    { age: "0-18", patients: 180 },
    { age: "19-35", patients: 320 },
    { age: "36-50", patients: 280 },
    { age: "51-65", patients: 260 },
    { age: "65+", patients: 194 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function PatientStatisticsPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Patient Statistics</h1>
            <Tabs defaultValue="gender">
                <TabsList>
                    <TabsTrigger value="gender">Gender Distribution</TabsTrigger>
                    <TabsTrigger value="age">Age Distribution</TabsTrigger>
                </TabsList>
                <TabsContent value="gender">
                    <Card>
                        <CardHeader>
                            <CardTitle>Patient Gender Distribution</CardTitle>
                            <CardDescription>Breakdown of patients by gender</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={genderData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={150}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {genderData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="age">
                    <Card>
                        <CardHeader>
                            <CardTitle>Patient Age Distribution</CardTitle>
                            <CardDescription>Breakdown of patients by age group</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={ageData}>
                                    <XAxis dataKey="age" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="patients" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

