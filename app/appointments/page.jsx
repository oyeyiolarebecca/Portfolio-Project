"use client"

import { useState } from "react"
import { PaginatedTable } from "@/components/custom/paginated-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query"
import { getAllPatients } from "@/services/getAllPatients"
import AddAppointment from "@/forms/AddAppointment"
import { getAllAppointments } from "@/services/getAllAppointments"

const initialAppointments = [
    { id: 1, patient: "John Doe", doctor: "Dr. Sarah Johnson", date: "2023-06-15", time: "09:00 AM", status: "Scheduled" },
    { id: 2, patient: "Jane Smith", doctor: "Dr. Michael Lee", date: "2023-06-15", time: "10:30 AM", status: "Completed" },
    { id: 3, patient: "Bob Johnson", doctor: "Dr. Emily Chen", date: "2023-06-16", time: "02:00 PM", status: "Cancelled" },
    // ... more appointments
]

export default function AppointmentsPage() {
    // const [appointments, setAppointments] = useState(initialAppointments)
    const [selectedDate, setSelectedDate] = useState(new Date())

    const { data, isFetching } = useQuery({
        queryKey: ["appointments"],
        queryFn: getAllAppointments
    })

    const columns = [
        { key: "patient", label: "Patient" },
        { key: "doctor", label: "Doctor" },
        { key: "appointmentDate", label: "Date" },
        { key: "appointmentTime", label: "Time" },
        {
            key: "appointmentStatus",
            label: "Status",
            render: (value) => (
                <Badge
                    // variant={value === "IN_PROGRESS" ? "default" : value === "FINISHED" ? "success" : "destructive"}
                    className={value === "IN_PROGRESS" ? "bg-orange-400" : value === "FINISHED" ? "bg-green-500" : value === "CANCELLED" ? "bg-red-600" : value === "RESCHEDULED" ? "bg-blue-400" : ""}
                >
                    {value}
                </Badge>
            ),
        },
        {
            key: "id",
            label: "Actions",
            render: (value) => (
                <Button variant="ghost" onClick={() => handleEditAppointment(value)}>
                    Edit
                </Button>
            ),
        },
    ]

    const handleEditAppointment = (id) => {
        // Implement edit functionality
        console.log(`Editing appointment ${id}`)
    }

    if (isFetching) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Appointments</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Add Appointment</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Appointment</DialogTitle>
                            <DialogDescription>Fill in the details to schedule a new appointment.</DialogDescription>
                        </DialogHeader>
                        <AddAppointment />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Appointment Calendar</CardTitle>
                        <CardDescription>Select a date to view appointments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border"
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Appointments for {selectedDate?.toDateString()}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {data.filter(appointment => appointment.appointmentDate === selectedDate?.toISOString().split('T')[0]).length > 0 ? (
                            <ul className="space-y-2">
                                {data
                                    .filter(appointment => appointment.appointmentDate === selectedDate?.toISOString().split('T')[0])
                                    .map((appointment, index) => (
                                        <li key={index} className="flex items-center justify-between">
                                            <span>{appointment.appointmentTime} - {appointment.patient}</span>
                                            <Badge
                                                className={appointment.appointmentStatus === "IN_PROGRESS" ? "bg-orange-400" : appointment.appointmentStatus === "FINISHED" ? "bg-green-500" : appointment.appointmentStatus === "CANCELLED" ? "bg-red-600" : appointment.appointmentStatus === "RESCHEDULED" ? "bg-blue-400" : ""}
                                            >
                                                {appointment.appointmentStatus}
                                            </Badge>
                                        </li>
                                    ))}
                            </ul>
                        ) : (
                            <p>No appointments scheduled for this date.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className="mt-6">
                <PaginatedTable data={data} columns={columns} itemsPerPage={10} />
            </div>
        </div>
    )
}

