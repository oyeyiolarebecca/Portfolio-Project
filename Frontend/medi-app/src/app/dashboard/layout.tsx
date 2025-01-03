import React from 'react'
import Sidebar from '../ui/Dashboard/Sidebar/sidebar'
import Navbar from '../ui/Dashboard/Navbar/navbar';
import styles from '../ui/Dashboard/Dashboard.module.css';
import { CardContent,Card } from '@/components/ui/card';


export default function Layout({children}: {
    children: React.ReactNode;
}) {
  return (
<div className='flex'>
        <Card className='w-[20%]'>
          <CardContent>
          <Sidebar/>
          </CardContent>
            
        </Card>
        <div className={styles.content}>
            <Navbar/>
            {children}
        </div>
    
    </div>
   
  )
}
