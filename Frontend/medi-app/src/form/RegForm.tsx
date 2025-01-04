'use client'
import { Button } from "@/components/ui/button";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormDescription, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { RegistrationSchema } from "@/schemas/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

export default function RegistrationForm() {
  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      password: '',
      role: 'USER',
    },
  });

  const onSubmit = async (values: z.infer<typeof RegistrationSchema>) => {
    console.log(values);
  };

  interface FieldProps {
    name: "firstName" | "lastName" | "dob" | "email" | "password";
    placeholder: string;
    type: string;
    label: string;
  }

  const [fields] = useState<FieldProps[]>([
    { name: 'firstName', placeholder: 'First Name', type: 'text', label: 'First Name' },
    { name: 'lastName', placeholder: 'Last Name', type: 'text', label: 'Last Name' },
    { name: 'dob', placeholder: 'YYYY-MM-DD', type: 'date', label: 'Date of Birth' },
    { name: 'email', placeholder: 'example@domain.com', type: 'email', label: 'Email' },
    { name: 'password', placeholder: '*********', type: 'password', label: 'Password' },
  ]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <div className="flex flex-col w-full h-full gap-4">
          {fields.map((field, index) => (
            <FormField
              key={index}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input {...formField} placeholder={field.placeholder} type={field.type} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* Role Selection Field */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="bg-teal-500 hover:bg-teal-600 text-white" type="submit">Register</Button>
        </div>
      </Form>
    </form>
  );
}
