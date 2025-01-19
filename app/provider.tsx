'use client'

import { fetchAllDoctors } from "@/services/getAllDoctors"
import { getAllPatients } from "@/services/getAllPatients"
import { doctorProps, patientProps } from "@/types/types"
import { useQuery } from "@tanstack/react-query"
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"


interface patientsContextProps {
    patients: patientProps[],
    setPatients: Dispatch<SetStateAction<patientProps[]>>
}

const PatientsContext = createContext<patientsContextProps | undefined>(undefined)

export const PatientsProvider = ({ children }: { children: React.ReactNode }) => {
    const [patients, setPatients] = useState<patientProps[]>([])
    useEffect(() => {
        async function getPatients() {
            const patients = await getAllPatients()
            setPatients(patients)
        }
        getPatients()
    }, [])
    return <PatientsContext.Provider value={{ patients, setPatients }}>
        {children}
    </PatientsContext.Provider>
}

export const usePatients = () => useContext(PatientsContext)


interface doctorsContextProps {
    doctors: doctorProps[],
    setDoctors: Dispatch<SetStateAction<doctorProps[]>>
}

const DoctorsContext = createContext<doctorsContextProps | undefined>(undefined)

export const DocotorsProvider = ({ children }: { children: React.ReactNode }) => {
    const [doctors, setDoctors] = useState<doctorProps[]>([])
    useEffect(() => {
        async function getDoctors() {
            const doctors = await fetchAllDoctors()
            setDoctors(doctors)
        }
        getDoctors()
    }, [])
    return <DoctorsContext.Provider value={{ doctors, setDoctors }}>
        {children}
    </DoctorsContext.Provider>
}

export const useDoctors = () => useContext(DoctorsContext)