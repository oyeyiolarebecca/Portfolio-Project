"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"

const generalSettingsSchema = z.object({
    hospitalName: z.string().min(2, {
        message: "Hospital name must be at least 2 characters.",
    }),
    language: z.string({
        required_error: "Please select a language.",
    }),
    timeZone: z.string({
        required_error: "Please select a time zone.",
    }),
    darkMode: z.boolean().default(false),
})

const notificationSettingsSchema = z.object({
    emailNotifications: z.boolean().default(true),
    smsNotifications: z.boolean().default(false),
    notificationTypes: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one notification type.",
    }),
})

const securitySettingsSchema = z.object({
    twoFactorAuth: z.boolean().default(false),
    passwordChangeInterval: z.string({
        required_error: "Please select a password change interval.",
    }),
})

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general")

    const generalForm = useForm<z.infer<typeof generalSettingsSchema>>({
        resolver: zodResolver(generalSettingsSchema),
        defaultValues: {
            hospitalName: "City General Hospital",
            language: "en",
            timeZone: "UTC",
            darkMode: false,
        },
    })

    const notificationForm = useForm<z.infer<typeof notificationSettingsSchema>>({
        resolver: zodResolver(notificationSettingsSchema),
        defaultValues: {
            emailNotifications: true,
            smsNotifications: false,
            notificationTypes: ["appointments"],
        },
    })

    const securityForm = useForm<z.infer<typeof securitySettingsSchema>>({
        resolver: zodResolver(securitySettingsSchema),
        defaultValues: {
            twoFactorAuth: false,
            passwordChangeInterval: "90days",
        },
    })

    function onSubmit(values: any) {
        console.log(values)
        toast({
            title: "Settings updated",
            description: "Your settings have been successfully updated.",
        })
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                            <CardDescription>Manage your hospital's general settings</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...generalForm}>
                                <form onSubmit={generalForm.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={generalForm.control}
                                        name="hospitalName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Hospital Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter hospital name" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    This is the name that will be displayed throughout the system.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={generalForm.control}
                                        name="language"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Language</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a language" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="en">English</SelectItem>
                                                        <SelectItem value="es">Spanish</SelectItem>
                                                        <SelectItem value="fr">French</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Select the primary language for the system interface.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={generalForm.control}
                                        name="timeZone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Time Zone</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a time zone" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="UTC">UTC</SelectItem>
                                                        <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                                                        <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Choose the time zone for displaying dates and times.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={generalForm.control}
                                        name="darkMode"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">Dark Mode</FormLabel>
                                                    <FormDescription>
                                                        Enable dark mode for the system interface.
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Save General Settings</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Settings</CardTitle>
                            <CardDescription>Manage your notification preferences</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...notificationForm}>
                                <form onSubmit={notificationForm.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={notificationForm.control}
                                        name="emailNotifications"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">Email Notifications</FormLabel>
                                                    <FormDescription>
                                                        Receive notifications via email.
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={notificationForm.control}
                                        name="smsNotifications"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">SMS Notifications</FormLabel>
                                                    <FormDescription>
                                                        Receive notifications via SMS.
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={notificationForm.control}
                                        name="notificationTypes"
                                        render={() => (
                                            <FormItem>
                                                <div className="mb-4">
                                                    <FormLabel className="text-base">Notification Types</FormLabel>
                                                    <FormDescription>
                                                        Select the types of notifications you want to receive.
                                                    </FormDescription>
                                                </div>
                                                {["appointments", "lab_results", "medication_reminders", "system_updates"].map((item) => (
                                                    <FormField
                                                        key={item}
                                                        control={notificationForm.control}
                                                        name="notificationTypes"
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem
                                                                    key={item}
                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                >
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value?.includes(item)}
                                                                            onCheckedChange={(checked) => {
                                                                                return checked
                                                                                    ? field.onChange([...field.value, item])
                                                                                    : field.onChange(
                                                                                        field.value?.filter(
                                                                                            (value) => value !== item
                                                                                        )
                                                                                    )
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        {item.charAt(0).toUpperCase() + item.slice(1).replace('_', ' ')}
                                                                    </FormLabel>
                                                                </FormItem>
                                                            )
                                                        }}
                                                    />
                                                ))}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Save Notification Settings</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Manage your account's security settings</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...securityForm}>
                                <form onSubmit={securityForm.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={securityForm.control}
                                        name="twoFactorAuth"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="text-base">Two-Factor Authentication</FormLabel>
                                                    <FormDescription>
                                                        Enable two-factor authentication for enhanced security.
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={securityForm.control}
                                        name="passwordChangeInterval"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password Change Interval</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select password change interval" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="30days">Every 30 days</SelectItem>
                                                        <SelectItem value="60days">Every 60 days</SelectItem>
                                                        <SelectItem value="90days">Every 90 days</SelectItem>
                                                        <SelectItem value="never">Never</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Choose how often you want to be prompted to change your password.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Save Security Settings</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

