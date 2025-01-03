import React from 'react'
import AddPatient from '../ui/Dashboard/AddPatient/addPatient'
import styles from "../ui//Dashboard/Dashboard.module.css"
import Card from '../ui/Dashboard/Cards/cards';
// import Chart from '../ui/Dashboard/Chart/Chart';
// import Table from '../ui/Dashboard/Table/Table';


export default function Dashboard() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <AddPatient />
        <div className={styles.cards}>
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        {/* <Chart />
        <Table /> */}
      </div>
    </div>
  )
}
