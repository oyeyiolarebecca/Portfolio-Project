'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schema/zodSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
export default function LoginForm() {
    const { replace } = useRouter()
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false)
    const form = useForm<z.infer<typeof LoginSchema>>(
        {
            defaultValues: {
                email: "",
                password: ''
            },
            resolver: zodResolver(LoginSchema),
        }
    )
    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setIsSubmiting(true)
        const { email, password } = values
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password })
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setIsSubmiting(false)
                replace('/')
                toast({
                    title: "Logged in successfully",
                    description: "Thanks for using the system."
                })

            }
            if (!response.ok) {
                const data = await response.json()
                console.log(data)
                setIsSubmiting(false)
                toast({
                    title: "Authentication failed",
                    description: "Please provide correct credentials."
                })
            }
        } catch (error) {
            console.log(error)
            toast({
                title: "Authentication failed",
                description: "Please provide correct credentials.",

            })
            setIsSubmiting(false)
        }
    }
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Form {...form}>
                <div className=" w-full h-full flex flex-col gap-4">
                    <div>
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} placeholder="john@doe.com" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                    </div>
                    <div>
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} placeholder="*********" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                    </div>

                    <Button disabled={isSubmiting} type="submit">
                        {
                            isSubmiting ? <Loader className="animate-spin" /> : "Login"
                        }
                    </Button>
                </div>

            </Form>
        </form>
    )
}