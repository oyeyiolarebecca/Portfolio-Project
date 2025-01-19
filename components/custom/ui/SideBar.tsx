"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Users, CalendarDays, Pill, Stethoscope, ClipboardList, BarChart2, Settings, LogOut } from 'lucide-react'
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

const sidebarItems = [
    {
        title: "Dashboard",
        icon: BarChart2,
        href: "/",
    },
    {
        title: "Patients",
        icon: Users,
        href: "/patients",
        subItems: [
            { title: "All Patients", href: "/patients" },
            { title: "Add Patient", href: "/patients/add" },
        ],
    },
    {
        title: "Appointments",
        icon: CalendarDays,
        href: "/appointments",
    },
    {
        title: "Medications",
        icon: Pill,
        href: "/medications",
    },
    {
        title: "Doctors",
        icon: Stethoscope,
        href: "/doctors",
    },
    {
        title: "Reports",
        icon: ClipboardList,
        href: "/reports",
        subItems: [
            { title: "Financial Reports", href: "/reports/financial" },
            { title: "Patient Statistics", href: "/reports/statistics" },
        ],
    },
]

export function HospitalSidebar() {
    const pathname = usePathname()
    const [openItems, setOpenItems] = useState<string[]>([])

    const toggleItem = (title: string) => {
        setOpenItems((prevOpenItems) =>
            prevOpenItems.includes(title)
                ? prevOpenItems.filter((item) => item !== title)
                : [...prevOpenItems, title]
        )
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <h2 className="text-2xl font-bold text-primary">Medi Lab</h2>
            </SidebarHeader>
            <SidebarContent className="p-5">
                <SidebarMenu>
                    {sidebarItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            {item.subItems ? (
                                <Collapsible
                                    open={openItems.includes(item.title)}
                                    onOpenChange={() => toggleItem(item.title)}
                                >
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className="w-full justify-between">
                                            <span className="flex items-center">
                                                <item.icon className="mr-2 h-4 w-4" />
                                                {item.title}
                                            </span>
                                            <ChevronDown
                                                className={`h-4 w-4 transition-transform duration-200 ${openItems.includes(item.title) ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="ml-6 mt-1 space-y-1">
                                        {item.subItems.map((subItem) => (
                                            <Link
                                                key={subItem.title}
                                                href={subItem.href}
                                                className={`block rounded-md px-2 py-1 text-sm ${pathname === subItem.href
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-muted-foreground hover:bg-muted"
                                                    }`}
                                            >
                                                {subItem.title}
                                            </Link>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            ) : (
                                <SidebarMenuButton asChild>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center ${pathname === item.href
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:bg-muted"
                                            }`}
                                    >
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.title}
                                    </Link>
                                </SidebarMenuButton>
                            )}
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/settings" className="flex items-center">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Button variant="ghost" className="w-full justify-start">
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

