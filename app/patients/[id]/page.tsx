"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LucideArrowLeft } from 'lucide-react'
import Link from 'next/link'

const fetchPatientData = async (id: string) => {
    try {
        const response = await fetch(`/api/patients/${id}`)
        if (response.ok) {
            const { patient } = await response.json()
            console.log(patient)
            return patient
        }
        if (!response.ok) {
            const data = await response.json()
            console.log(data)
        }
    } catch (error) {
        console.log(error)
    }
    // await new Promise(resolve => setTimeout(resolve, 1000))
    // return {
    //     id: parseInt(id),
    //     name: "John ken",
    //     age: 30,
    //     gender: "Male",
    //     status: "Stable",
    //     image: "/placeholder-avatar.jpg",
    //     contact: "+1 (555) 123-4567",
    //     address: "123 Main St, Anytown, USA",
    //     medicalHistory: [
    //         { date: "2023-01-15", description: "Annual checkup - All clear" },
    //         { date: "2022-06-20", description: "Treated for minor fracture in left arm" },
    //     ],
    //     upcomingAppointments: [
    //         { date: "2023-07-01", time: "10:00 AM", doctor: "Dr. Rebecca Johnson" },
    //     ]
    // }
}

export default function PatientDetailsPage() {
    const params = useParams()
    const [patient, setPatient] = useState<any>(null)

    useEffect(() => {
        const loadPatient = async () => {
            if (params.id) {
                const data = await fetchPatientData(params.id as string)
                setPatient(data)
            }
        }
        loadPatient()
    }, [params.id])

    if (!patient) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto py-10 flex flex-col gap-5">
            <Button asChild className='w-[50px]'>
                <Link href={"/patients"}><LucideArrowLeft /></Link>

            </Button>
            <h1 className="text-3xl font-bold mb-6">Patient Details</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <div className='flex justify-between items-center'>
                            <CardTitle>Personal Information</CardTitle>
                            <Badge>CLI-{patient.clinicNumber}</Badge>
                        </div>

                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 mb-4">
                            <Image width={100} height={100} src={patient.profilePicture} alt={patient.firstName} className="w-20 h-20 rounded-full" />
                            <div>
                                <h2 className="text-2xl font-bold">{patient.firstName} {patient.lastName}</h2>
                                <p className="text-muted-foreground">
                                    {patient.age} years old, {patient.gender}
                                </p>
                            </div>
                        </div>
                        <Badge className="mb-4">{patient.patientStatus}</Badge>
                        <p><strong>Contact:</strong> {patient.contactNumber}</p>
                        <p><strong>Address:</strong> {patient.address}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Medical Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="history">
                            <TabsList>
                                <TabsTrigger value="history">Medical History</TabsTrigger>
                                <TabsTrigger value="appointments">Upcoming Appointments</TabsTrigger>
                            </TabsList>
                            <TabsContent value="history">
                                {/* <ul className="space-y-2">
                                    {patient.medicalHistory.map((item: any, index: number) => (
                                        <li key={index}>
                                            <strong>{item.date}:</strong> {item.description}
                                        </li>
                                    ))}
                                </ul> */}
                                <p>{patient.medicalHistory}</p>
                            </TabsContent>
                            {/* <TabsContent value="appointments">
                                <ul className="space-y-2">
                                    {patient.upcomingAppointments.map((appointment: any, index: number) => (
                                        <li key={index}>
                                            <strong>{appointment.date} at {appointment.time}</strong>
                                            <br />
                                            with {appointment.doctor}
                                        </li>
                                    ))}
                                </ul>
                            </TabsContent> */}
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

