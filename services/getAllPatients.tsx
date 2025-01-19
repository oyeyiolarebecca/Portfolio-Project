export const getAllPatients = async () => {
    const response = await fetch('/api/patients')
    if (!response.ok) {
        const data = await response.json()
        throw new Error(data?.message || "Failed to get all patients")
    }
    const { patients } = await response.json()
    return patients
}