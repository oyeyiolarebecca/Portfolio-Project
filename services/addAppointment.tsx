import { AppointmentSchema } from "@/schema/zodSchema";
import { z } from "zod";

export const ScheduleAppointment = async (appointmentData: z.infer<typeof AppointmentSchema>) => {
    const response = await fetch('/api/patients/appointments', {
        method: "POST",
        body: JSON.stringify(appointmentData)
    })
    if (!response.ok) {
        const data = await response.json()
        throw new Error(data?.message || "Failed to create appointment")
    }
    const { appointment } = await response.json()
    return appointment
}