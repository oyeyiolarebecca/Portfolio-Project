import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const API_URL = process.env.NEXT_PUBLIC_API_URL
const COOKIE_NAME: any = process.env.NEXT_PUBLIC_COOKIE_NAME

type Props = {
    params: Promise<{
        patientId: string
    }>
}

export async function GET(request: Request, props: Props) {

    const { patientId } = await props.params
    const cookieStorage = cookies()
    const token = (await cookieStorage).get(COOKIE_NAME)
    console.log(patientId)
    try {
        const response = await fetch(`${API_URL}/patients/${patientId}`, {
            headers: {
                "Authorization": `Bearer ${token?.value}`
            }
        })
        if (response.ok) {
            const { data, statusCode } = await response.json()
            return NextResponse.json({ patient: data }, { status: statusCode })
        }
        if (!response.ok) {
            const { message, statusCode } = await response.json()
            return NextResponse.json({ error: message }, { status: statusCode })
        }

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}