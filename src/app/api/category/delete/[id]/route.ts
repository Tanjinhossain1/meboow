import { getDb } from "@/drizzle/db";
import {  Category } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const db = await getDb();
        const data = await db.delete(Category).where(eq(Category.id, Number(params?.id)))
        return NextResponse.json({
            statusCode: 200,
            success: true,
            message: 'Category Delete successfully',
            data,
        })
    } catch (error) {
        console.error('Error fetching Mobile Categorys:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
