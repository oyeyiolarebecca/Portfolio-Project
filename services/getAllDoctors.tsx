export const fetchAllDoctors = async () => {
    const response = await fetch('/api/doctors')
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch doctors');
    }

    const { doctors } = await response.json()
    return doctors

}