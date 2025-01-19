export const getAllAppointments = async () => {
    const response = await fetch('/api/patients/appointments')
    if (!response.ok) {
        const data = await response.json()
        throw new Error(data?.message || "Failed to get all appointments")
    }
    const { appointments } = await response.json()
    return appointments
}