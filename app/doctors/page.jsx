"use client"
import { PaginatedTable } from "@/components/custom/paginated-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useQuery } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import AddDoctorForm from "@/forms/AddDoctor"
import { fetchAllDoctors } from "@/services/getAllDoctors"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
export default function DoctorsPage() {

    const { data, isFetching } = useQuery({
        queryFn: fetchAllDoctors,
        queryKey: ["doctors"]
    })

    const handleStatusChange = (id, newStatus) => {
        setDoctors(data.map(doctor =>
            doctor.id === id ? { ...doctor, status: newStatus } : doctor
        ))
    }

    if (isFetching) {
        return <h1>Loading...</h1>
    }

    const columns = [
        {
            key: "profilePhoto",
            label: "Photo",
            render: (value) => (
                <Avatar>
                    <AvatarImage src={value} />
                    <AvatarFallback>ML</AvatarFallback>
                </Avatar>
            ),
        },
        { key: "firstName", label: "Firstname" },
        { key: "lastName", label: "Lastname" },
        { key: "specialty", label: "Specialization" },
        // { key: "experience", label: "Experience" },
        {
            key: "status",
            label: "Status",
            render: (value, item) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <Badge
                                variant={value === "AVAILABLE" ? "secondary" : value === "ON_LEAVE" ? "default" : "destructive"}
                            >
                                {value}
                            </Badge>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleStatusChange(item.id, "AVAILABLE")}>
                            Available
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(item.id, "ON_LEAVE")}>
                            On Leave
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(item.id, "BUSY")}>
                            Busy
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ]

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-6">Doctors</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Add Doctor</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Doctor</DialogTitle>
                            <DialogDescription>Fill in the details to add a new doctor.</DialogDescription>
                        </DialogHeader>
                        <AddDoctorForm />
                    </DialogContent>
                </Dialog>

            </div>
            <PaginatedTable data={data} columns={columns} itemsPerPage={10} />
        </div>
    )
}

