import { db } from "@/drizzle/db";
import { MobileArticles } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request,{ params }: { params: { id: string } }) {
    try {  
        const data = await db.select().from(MobileArticles).where(eq(MobileArticles.id, Number(params?.id)))
        return NextResponse.json({
            statusCode: 200,
            success: true,
            message: 'Get Details Article successfully', 
            data,
        })
    } catch (error) {
        console.error('Error fetching Mobile Articles:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}