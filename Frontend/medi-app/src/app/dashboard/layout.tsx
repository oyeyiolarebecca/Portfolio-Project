import React from 'react';
import Sidebar from '../ui/Dashboard/Sidebar/sidebar';
import Navbar from '../ui/Dashboard/Navbar/navbar';
import { CardContent, Card } from '@/components/ui/card';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Card className="w-1/5 h-screen sticky top-0 bg-white shadow-lg">
        <CardContent>
          <Sidebar />
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="w-4/5 p-4">
        <Navbar />
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
