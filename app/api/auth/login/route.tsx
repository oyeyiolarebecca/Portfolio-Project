import { NextResponse } from "next/server";
import { serialize } from "cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const COOKIE_NAME: any = process.env.NEXT_PUBLIC_COOKIE_NAME;
// const MAX_AGE: any = process.env.NEXT_PUBLIC_MAX_AGE;
export async function POST(request: Request) {
    const { email, password } = await request.json();
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email, password
            }),
        });
        if (response.ok) {
            const { message, statusCode, data } = await response.json();

            const serialized = serialize(COOKIE_NAME, data, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
                path: "/",
            });

            return new Response(JSON.stringify(message), {
                status: statusCode,
                headers: { "Set-Cookie": serialized },
            });
        }
        if (!response.ok) {

            const { message } = await response.json()
            return NextResponse.json(
                { message },
                { status: 401 }
            );
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 });
    }
}