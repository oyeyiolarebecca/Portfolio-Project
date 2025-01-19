export const addDoctor = async (doctorData: { firstName: string, lastName: string, specialty: string, status: string, departmentId: string }) => {
    const response = await fetch("/api/doctors", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add doctor');
    }

    const { doctor } = await response.json();
    return doctor;
};
