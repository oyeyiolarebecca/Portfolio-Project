"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample events data
const events = [
    { date: new Date(2023, 5, 15), title: "Dr. Smith's Holiday", type: "holiday" },
    { date: new Date(2023, 5, 18), title: "Hospital Board Meeting", type: "event" },
    { date: new Date(2023, 5, 20), title: "John Doe's Appointment", type: "appointment" },
    // Add more events as needed
]

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

    const selectedDateEvents = events.filter(
        (event) => event.date.toDateString() === selectedDate?.toDateString()
    )

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Calendar</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Hospital Calendar</CardTitle>
                        <CardDescription>View and manage appointments, events, and holidays</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            className="rounded-md border"
                            components={{
                                DayContent: (props) => {
                                    const matchingEvents = events.filter(
                                        (event) => event.date.toDateString() === props.date.toDateString()
                                    )
                                    return (
                                        <div className="relative">
                                            {props.day}
                                            {matchingEvents.length > 0 && (
                                                <div className="absolute bottom-0 right-0 flex gap-0.5">
                                                    {matchingEvents.map((event, index) => (
                                                        <div
                                                            key={index}
                                                            className={`w-1 h-1 rounded-full ${event.type === "holiday"
                                                                ? "bg-red-500"
                                                                : event.type === "event"
                                                                    ? "bg-blue-500"
                                                                    : "bg-green-500"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )
                                },
                            }}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Events for {selectedDate?.toDateString()}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {selectedDateEvents.length > 0 ? (
                            <ul className="space-y-2">
                                {selectedDateEvents.map((event, index) => (
                                    <li key={index} className="flex items-center justify-between">
                                        <span>{event.title}</span>
                                        <Badge
                                            variant={
                                                event.type === "holiday"
                                                    ? "destructive"
                                                    : event.type === "event"
                                                        ? "default"
                                                        : "success"
                                            }
                                        >
                                            {event.type}
                                        </Badge>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No events scheduled for this date.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

