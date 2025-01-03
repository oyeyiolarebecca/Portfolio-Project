
"use client";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  MdDarkMode,
  MdLogout,
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdEvent,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
} from "react-icons/md";
import { FaToggleOff } from "react-icons/fa6";

const menuItems = [
  {
    title: "Main Menu",
    list: [
      { title: "Home", path: "/dashboard", icon: <MdDashboard /> },
      { title: "Patient", path: "/dashboard/patiences", icon: <MdSupervisedUserCircle /> },
      { title: "Credentials", path: "/dashboard/credentials", icon: <MdShoppingBag /> },
      { title: "Appointments", path: "/dashboard/appointments", icon: <MdEvent /> },
    ],
  },
  {
    title: "Analytics",
    list: [
      { title: "Financial", path: "/dashboard/finacial", icon: <MdWork /> },
      { title: "Record", path: "/dashboard/record", icon: <MdAnalytics /> },
      { title: "Teams", path: "/dashboard/teams", icon: <MdPeople /> },
    ],
  },
  {
    title: "User",
    list: [
      { title: "Settings", path: "/dashboard/settings", icon: <MdOutlineSettings /> },
      { title: "Help & Center", path: "/dashboard/help", icon: <MdHelpCenter /> },
    ],
  },
];

export default function Sidebar() {
  return (
    <div className="sidebar bg-white shadow-lg w-80 h-screen flex flex-col sticky top-0">
      {/* Logo Section */}
      <div className="p-4">
        <Image src="/medi.png" alt="logo" width={80} height={80} className="mx-auto" />
        <p className="text-center text-lg font-semibold mt-2">Medi Lab</p>
      </div>

      {/* Menu Section */}
      <div className="p-4 flex-1 overflow-y-auto p-4">
        <Accordion type="multiple" defaultValue={["Main Menu"]}>
          
          {menuItems.map((cat) => (
            <AccordionItem key={cat.title} value={cat.title}>
              <AccordionTrigger>{cat.title}</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {cat.list.map((item) => (
                    <li key={item.title} className="flex items-center space-x-2">
                      {item.icon}
                      <a href={item.path} className="hover:underline">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MdDarkMode />
            <span>Dark Mode</span>
          </div>
          <FaToggleOff style={{ color: "grey", fontSize: "30px" }} />
        </div>
        <Button variant="outline" className="w-full flex items-center justify-center">
          <MdLogout className="mr-2" />
          Logout
        </Button>
        <div className="flex items-center mt-4">
          <Image src="/noavater.png" alt="user" width={50} height={50} className="rounded-full" />
          <div className="ml-2">
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
