import LoginForm from '@/forms/LoginForm'
import Image from 'next/image'
import doctors from "@/public/doctors.svg"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen">
            {/* Illustration Column */}
            <div className="hidden w-1/2 bg-blue-100 lg:block">
                <div className="flex h-full flex-col items-center justify-center p-8">
                    <Image
                        src={doctors}
                        alt="Hospital Management System Illustration"
                        width={400}
                        height={400}
                        className="mb-8"
                    />
                    <h2 className="text-3xl font-bold text-blue-800">Hospital Management System</h2>
                    <p className="mt-4 text-center text-blue-600">
                        Streamline your hospital operations with our comprehensive management solution.
                    </p>
                </div>
            </div>

            {/* Login Form Column */}
            <div className="flex w-full items-center justify-center bg-white lg:w-1/2">
                <div className="w-full max-w-md p-8">
                    <h1 className="mb-6 text-3xl font-bold text-gray-900">Login</h1>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

