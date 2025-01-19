'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DepartmentSchema, DoctorSchema } from "@/schema/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Loader } from "lucide-react";
import { addDoctor } from "@/services/addDoctor";
import { toast } from "@/hooks/use-toast";
import AppConstants from "@/constants/appContants";


export default function AddDoctorForm() {
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false)



    const fetchDepartments = async () => {
        try {
            const response = await fetch('/api/departments')
            if (response.ok) {
                const { departments } = await response.json()
                console.log("departments", departments)
                return departments
            }
            if (!response.ok) {
                const data = await response.json()
                console.log("error", data)
                return data
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }
    const form = useForm<z.infer<typeof DoctorSchema>>({

        resolver: zodResolver(DoctorSchema),
        defaultValues: {
            firstName: '',
            lastName: "",
            specialty: "",
            status: "AVAILABLE",
            departmentId: ""
        }
    })
    const onSubmit = async (values: z.infer<typeof DoctorSchema>) => {
        const { firstName, lastName, specialty, status, departmentId } = values;
        setIsSubmiting(true);
        mutation.mutate({ firstName, lastName, specialty, status, departmentId });
    };
    const mutation = useMutation({
        mutationFn: addDoctor,
        onSuccess: () => {
            AppConstants.queryClient.invalidateQueries({ queryKey: ["doctors"] })
            form.reset();
            setIsSubmiting(false);
            toast({
                title: "Doctor Added Successfully",
                description: "Doctor was added successfully"
            })
        },
        onError: (error: { message: string; }) => {
            console.log(error);
            setIsSubmiting(false);
            toast({
                title: `Could not add doctor,`,
                description: error.message
            })

        }
    })

    const { data } = useQuery({
        queryKey: ["departments"],
        queryFn: fetchDepartments
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col w-full gap-6 h-full" >
                    <div className="flex gap-4 w-full">
                        <FormField
                            name="firstName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Firstname</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="lastName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Lastname</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="specialty"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Specialty</FormLabel>
                                <FormControl>
                                    <Input {...field} className="col-span-3" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-4">
                        <FormField
                            name="departmentId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Department</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger><SelectValue placeholder="Select Department" /></SelectTrigger><SelectContent>
                                            {
                                                data?.map((department: z.infer<typeof DepartmentSchema>) => (
                                                    <SelectItem key={department?.id} value={department?.id}>{department?.departmentName}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>


                                </FormItem>
                            )}
                        />
                        <FormField
                            name="status"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="AVAILABLE">Available</SelectItem>
                                            <SelectItem value="ON_LEAVE">On Leave</SelectItem>
                                            <SelectItem value="BUSY">Busy</SelectItem>
                                        </SelectContent>
                                    </Select>

                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={isSubmiting} type="submit">{isSubmiting ? <Loader className="animate-spin" /> : "Add Doctor"}</Button>
                </div>

            </form>
        </Form>
    )
}