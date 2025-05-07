import { getDb } from "@/drizzle/db";
import { WithdrawRequest } from "@/drizzle/schema";
import { likeInsensitive } from "@/utils/utils";
import { and, asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Parse the JSON body
        const body = await req.json()

        const { method, phoneNumber, email,amount } = body;

        console.log('body detail created', method, phoneNumber, email,amount);

        if (!method || !phoneNumber || !email || !amount) {
            return NextResponse.json({ error: 'Missing required fields' });
        }
        // ✅ Check if this video is already watched by this user

        // Perform the database insertion using Drizzle ORM
        const db = await getDb();
        const result = await db.insert(WithdrawRequest).values({
            method, phoneNumber, email,amount
        });

        return NextResponse.json({ success: true, message: "successfully withdraw", data: result })
    } catch (error) {
        console.error('Error creating uploadUrl:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}