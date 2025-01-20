import { useDoctors, usePatients } from "@/app/provider"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AppConstants from "@/constants/appContants"
import { toast } from "@/hooks/use-toast"
import { AppointmentSchema } from "@/schema/zodSchema"
import { ScheduleAppointment } from "@/services/addAppointment"
import { fetchAllDoctors } from "@/services/getAllDoctors"
import { getAllPatients } from "@/services/getAllPatients"
import { doctorProps, patientProps } from "@/types/types"
import { zodResolver } from "@hookform/resolvers/zod"

import { useMutation } from "@tanstack/react-query"
import { Loader } from "lucide-react"
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react"

import { useForm } from "react-hook-form"
import { z } from "zod"



export default function AddAppointment() {

    const [isSubmiting, setIsSubmiting] = useState<boolean>(false)
    const { patients }: any = usePatients()
    const { doctors }: any = useDoctors()
    const form = useForm<z.infer<typeof AppointmentSchema>>({
        resolver: zodResolver(AppointmentSchema),
        defaultValues: {
            appointmentDate: "",
            appointmentTime: "",
            appointmentStatus: "IN_PROGRESS",
            patientId: "",
            doctorId: ""
        }
    })
    const onSubmit = async (values: z.infer<typeof AppointmentSchema>) => {
        setIsSubmiting(true)
        mutation.mutate({ ...values })
        console.log(values)
    }

    const mutation = useMutation({
        mutationFn: ScheduleAppointment,
        mutationKey: ['add-appointment'],
        onSuccess: () => {
            AppConstants.queryClient.invalidateQueries({ queryKey: ['appointments'] })
            setIsSubmiting(false)
            toast({
                title: "Appointment created",
                description: "Appointment was added successfully"
            })
        },
        onError: (error) => {
            setIsSubmiting(false)
            toast({
                title: "Failed to create appointment",
                description: error.message
            })
        }
    })
    // useEffect(() => {
    //     async function getPatientsAndDoctors() {
    //         const patients = await getAllPatients()
    //         setPatients(patients)
    //         const doctors = await fetchAllDoctors()
    //         setDoctors(doctors)

    //     }
    //     getPatientsAndDoctors()
    // }, [])
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name="patientId"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="patient" className="text-right">
                                Patient
                            </Label>

                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select Patient" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        patients?.map((patient: { pid: string; firstName: string; lastName: string; clinicNumber: string | any }) => (
                                            <SelectItem key={patient.pid} value={patient.pid}>{patient.firstName} {patient.lastName} CLI-{patient.clinicNumber}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    name="doctorId"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="doctor" className="text-right">
                                Doctor
                            </Label>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Assign Doctor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        doctors.map((doctor: { id: string; firstName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; lastName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
                                            <SelectItem key={doctor.id} value={doctor.id?.toString()}>{doctor.firstName} {doctor.lastName}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    name="appointmentDate"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="doctor" className="text-right">
                                Date
                            </Label>
                            <FormControl>

                                <Input {...field} id="doctor" type="date" className="col-span-3" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="appointmentTime"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="doctor" className="text-right">
                                Appointment time
                            </Label>
                            <FormControl>

                                <Input {...field} type="time" id="doctor" className="col-span-3" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    name="appointmentStatus"
                    render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="doctor" className="text-right">
                                Appointment Status
                            </Label>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="IN_PROGRESS">In progress</SelectItem>
                                    <SelectItem value="FINISHED">Completed</SelectItem>
                                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                    <SelectItem value="RESCHEDULED">Rescheduled</SelectItem>
                                </SelectContent>
                            </Select>


                        </FormItem>
                    )}
                />

                <Button disabled={isSubmiting} type="submit">{isSubmiting ? <Loader className="animate-spin" /> : "Schedule Appointment"}</Button>

            </form>
        </Form>
    )
}