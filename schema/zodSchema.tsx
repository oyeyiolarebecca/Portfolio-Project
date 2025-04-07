import { z } from "zod"
export const LoginSchema = z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'password is required' })
})

export const DoctorSchema = z.object({
    firstName: z.string({ required_error: 'first name is required' }),
    lastName: z.string({ required_error: "Lastname is requried" }),
    departmentId: z.string({ required_error: "Department is required" }),
    status: z.string({ required_error: 'status is required' }),
    specialty: z.string({ required_error: "specialty is required" })
})

export const DepartmentSchema = z.object({
    id: z.string(),
    departmentName: z.string(),
    location: z.string()
})
export const AppointmentSchema = z.object({
    patientId: z.string({ required_error: "please choose a patient" }),
    doctorId: z.string({ required_error: 'please choose a doctor' }),
    appointmentDate: z.string({ required_error: "please choose a date" }),
    appointmentTime: z.string({ required_error: "please choose time for appointment" }),
    appointmentStatus: z.string({ required_error: "please choose appointment status" })
})

export const MedicationSchema = z.object({
    name: z.string().nonempty("Name is required"),
    dosage: z.string().nonempty("Dosage is required"),
    category: z.string().nonempty("Category is required"),
    stock: z.number().nonnegative("Stock must be 0 or more"),
    status: z.enum(["AVAILABLE", "OUT_OF_STOCK"]),
});