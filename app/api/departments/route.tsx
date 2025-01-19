import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const COOKIE_NAME: any = process.env.NEXT_PUBLIC_COOKIE_NAME
const API_URL = process.env.NEXT_PUBLIC_API_URL
export async function POST(request: Request) {
    const cookieStorage = cookies()
    const token = (await cookieStorage).get(COOKIE_NAME)
    const body = await request.json()
    if (!token || token.value === undefined) {
        return NextResponse.json({
            message: "Unauthorized"
        }, { status: 401 })
    }
    try {
        const response = await fetch(`${API_URL}/departments`, {
            method: "POST",
            body: JSON.stringify({
                ...body
            }),
            headers: {
                "Authorization": `Bearer ${token.value}`,
                "Content-type": "application/json"
            }
        })
        if (response.ok) {
            const { message, statusCode, data } = await response.json()
            console.log(message)
            return NextResponse.json({ department: data, message }, { status: statusCode })
        }
        if (!response.ok) {
            const { message, statusCode } = await response.json()
            return NextResponse.json({ message }, { status: statusCode })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

export async function GET(request: Request) {
    const cookieStorage = cookies()
    const token = (await cookieStorage).get(COOKIE_NAME)
    if (!token || token.value === undefined) {
        return NextResponse.json({
            message: "Unauthorized"
        }, { status: 401 })
    }
    try {
        const response = await fetch(`${API_URL}/departments`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token.value}`,
            }
        })
        console.log(response)
        if (response.ok) {
            const { message, statusCode, data } = await response.json()
            console.log(message)
            return NextResponse.json({ departments: data, message }, { status: statusCode })
        }
        if (!response.ok) {
            const { message, statusCode } = await response.json()
            return NextResponse.json({ message }, { status: statusCode })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}