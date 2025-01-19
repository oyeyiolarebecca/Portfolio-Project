"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { CalendarIcon } from "lucide-react"
import { format } from "path"
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),

    gender: z.string().min(1, {
        message: "Please select a gender.",
    }),
    contact: z.string().min(10, {
        message: "Contact number must be at least 10 characters.",
    }),
    address: z.string().min(5, {
        message: "Address must be at least 5 characters.",
    }),
    medicalHistory: z.string(),
    dob: z.date({
        required_error: "A date of birth is required.",
    }),
    patientStatus: z.string()
})

export default function AddPatientPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            gender: "",
            contact: "",
            address: "",
            medicalHistory: "",
            patientStatus: "ADMITTED"
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { name, gender, contact, address, medicalHistory, dob, patientStatus } = values
        console.log(new Date(dob).toLocaleDateString())
        console.log(values)
        try {
            setIsSubmitting(true)
            const response = await fetch('/api/patients', {
                method: 'POST',
                body: JSON.stringify({
                    patientName: name,
                    contactNumber: contact,
                    dob: new Date(dob).toISOString(),
                    patientStatus,
                    hasAppointment: false,
                    gender,
                    address,
                    medicalHistory
                })
            })
            if (response.ok) {
                toast({
                    title: "Patient added successfully",
                    description: "The new patient has been added to the system.",
                })
                form.reset()
                router.push("/patients")
                setIsSubmitting(false)
            }
            if (!response.ok) {
                const data = await response.json()
                console.log(data)
                toast({
                    variant: "destructive",
                    title: "An Error Occured while adding patient",
                    description: "Could not add patient.",
                })
                setIsSubmitting(false)

            }


        } catch (error) {
            console.log(error)
            toast({
                variant: "destructive",
                title: "An Error Occured while adding patient",
                description: "Could not add patient, please try again.",
            })
            setIsSubmitting(false)
        }

    }

    const patientStatuses = [
        "ADMITTED", "DISCHARGED", "UNDER_TREATMENT", "RECOVERED", "DECEASED"
    ]
    const patientGender = ["MALE", "FEMALE"]

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Add New Patient</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter the patient's full name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField

                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col">
                                <FormLabel>Date of birth</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal w-full",

                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto bg-white shadow-md p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}

                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Your date of birth is used to calculate your age.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="patientStatus"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Patient Status</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Patient Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                patientStatuses.map((status, _) => (
                                                    <SelectItem value={status} className="capitalize" key={_}>{status}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Patient's Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                patientGender.map((gender, _) => (
                                                    <SelectItem value={gender} className="capitalize" key={_}>{gender}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contact"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Number</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="medicalHistory"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Medical History</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter any relevant medical history or conditions.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Adding..." : "Add Patient"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

