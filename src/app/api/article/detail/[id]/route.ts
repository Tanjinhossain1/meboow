import { getDb } from "@/drizzle/db";
import { Articles } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request,{ params }: { params: { id: string } }) {
    try {  
        const db = await getDb();
        const data = await db.select().from(Articles).where(eq(Articles.id, Number(params?.id)))
        return NextResponse.json({
            statusCode: 200,
            success: true,
            message: 'Get Details Article successfully', 
            data,
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}