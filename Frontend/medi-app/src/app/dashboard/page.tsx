import React from 'react'
import SubAddPatient from '../ui/Dashboard/SubAddPatient/subaddPatient'
import styles from "../ui//Dashboard/Dashboard.module.css"
import Card from '../ui/Dashboard/Cards/cards';
import Chart from '../ui/Dashboard/Charts/charts';
import Table from '../ui/Dashboard/Table/table';


export default function Dashboard() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <SubAddPatient />
        <div className={styles.cards}>
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <Chart />
        <Table />
      </div>
    </div>
  )
}
