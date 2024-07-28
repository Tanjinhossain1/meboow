

import { signIn } from '@/auth';
import { getDb } from '@/drizzle/db';
import { desc } from 'drizzle-orm';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json()

    const { email, password } = body;
    console.log('auth login dataaa', email, password);


    await signIn("credentials", {
        // redirect: true,
        // callbackUrl: "/",
        email,
        password,
    });
    console.log('auth login successful')
    // redirect("/");
    return NextResponse.json({ success: true, message: "successfully Login" })
    // } catch (error) {
    //     const someError = error as any;
    //     return NextResponse.json({ error: 'Internal Server Error' });
    // }
}  