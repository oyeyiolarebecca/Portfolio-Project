'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts"

const patientData = [
  { month: "Jan", newPatients: 65, totalPatients: 400 },
  { month: "Feb", newPatients: 59, totalPatients: 450 },
  { month: "Mar", newPatients: 80, totalPatients: 520 },
  { month: "Apr", newPatients: 81, totalPatients: 590 },
  { month: "May", newPatients: 56, totalPatients: 630 },
  { month: "Jun", newPatients: 55, totalPatients: 670 },
  { month: "Jul", newPatients: 65, totalPatients: 400 },
  { month: "Aug", newPatients: 59, totalPatients: 450 },
  { month: "Sep", newPatients: 80, totalPatients: 520 },
  { month: "Oct", newPatients: 81, totalPatients: 590 },
  { month: "Nov", newPatients: 56, totalPatients: 630 },
  { month: "Dec", newPatients: 55, totalPatients: 670 },
]

const appointmentData = [
  { day: "Mon", appointments: 28 },
  { day: "Tue", appointments: 35 },
  { day: "Wed", appointments: 42 },
  { day: "Thu", appointments: 38 },
  { day: "Fri", appointments: 30 },
  { day: "Sat", appointments: 25 },
  { day: "Sun", appointments: 15 },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">670</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">55</div>
            <p className="text-xs text-muted-foreground">-1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,563</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Patient Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                newPatients: {
                  label: "New Patients",
                  color: "hsl(var(--chart-1))",
                },
                totalPatients: {
                  label: "Total Patients",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={patientData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="newPatients" stroke="var(--color-newPatients)" />
                  <Line type="monotone" dataKey="totalPatients" stroke="var(--color-totalPatients)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                appointments: {
                  label: "Appointments",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="appointments" fill="var(--color-appointments)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

