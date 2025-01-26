'use client'
import Link from "next/link"
import { PaginatedTable } from "@/components/custom/paginated-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { getAllPatients } from "@/services/getAllPatients"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const columns = [
    {
        key: "profilePicture",
        label: "Photo",
        render: (value = "https://github.com/namycodes.png") => (
            <Avatar>
                <AvatarImage src={value} />
                <AvatarFallback >ML</AvatarFallback>
            </Avatar>
        ),
    },
    { key: "firstName", label: "FirstName" },
    { key: "lastName", label: "Surname" },
    { key: "clinicNumber", label: "Clinic Number" },
    { key: "gender", label: "Gender" },
    {
        key: "patientStatus",
        label: "Status",
        render: (value) => (
            <Badge variant={value === "Stable" ? "secondary" : value === "Critical" ? "destructive" : "default"}>
                {value}
            </Badge>
        ),
    },
    {
        key: "pid",
        label: "Actions",
        render: (value) => (
            <Button asChild variant="ghost">
                <Link href={`/patients/${value}`}>View</Link>
            </Button>
        ),
    },

]



export default function PatientsPage() {

    const { data, isFetching } = useQuery({
        queryKey: ["patients"],
        queryFn: getAllPatients
    })

    if (isFetching) {
        return <h1>Loading.......</h1>
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Patients</h1>
                <Button asChild>
                    <Link href="/patients/add">Add New Patient</Link>
                </Button>
            </div>
            <PaginatedTable data={data} columns={columns} itemsPerPage={2} />
        </div>
    )
}

