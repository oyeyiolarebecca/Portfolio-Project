import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import RegistrationForm from "@/form/RegForm"
import Link from "next/link"
import Image from "next/image"

export default function Register(){
  return <div className="flex bg-white justify-center items-center h-screen w-full">
    <Card className="w-[40%]">
      <div className="flex justify-center items-center">
        <Image src="/medi.png" alt="logo" width="80" height="80" />
      </div>
      <CardHeader className="text-center">
        Welcome, Please Enter Your Details To Register
        </CardHeader>
      <CardContent>
        <RegistrationForm />
        <div className="flex justify-end w-full py-4">
           <h1 >Already have an account? <Link href="/login">Login Here</Link></h1>
        </div>
      </CardContent>
    </Card>
  </div>
}