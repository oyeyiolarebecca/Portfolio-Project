'use client'
import { Button } from "@/components/ui/button";
import { Form,FormItem, FormLabel,FormControl,FormMessage,FormDescription,FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function LoginForm(){
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email:'',
            password:''
        }
    })
    const onSubmit = async(values:z.infer<typeof LoginSchema>)=>{
        console.log(values)
    }

    interface nameProps {
        name: "email" | "password",
        placeholder: string,
        type: string,
        label:string
    }
    const [inputs, setInputs] = useState<nameProps[]>([
        {
            name:'email',
            placeholder:'Jon@doe.com',
            type:'email',
            label:'Email'
        },
        {
            name:'password',
            placeholder:'*********',
            type:'password',
            label:"Password"
        },
        
       
       
    ])
    return(
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Form  {...form}>
                <div className="flex flex-col w-full h-full">
                    {
                        inputs.map((name, index)=>(
                             <FormField
    control={form.control}
    name={name.name}
    render={({field}) => (
      <FormItem>
        <FormLabel >{name.label}</FormLabel>
        <FormControl>
         
         <Input {...field} placeholder={name.placeholder} type={name.type}/>
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />
                        ))
                    }
  <Button className="bg-teal-500 hover:bg-teal-600 text-white" type="submit">Login</Button>
                </div>
            </Form>
        </form>
    )
}