import { getDb } from "@/drizzle/db";
import { Glossary } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const db = await getDb();
        const data = await db.delete(Glossary).where(eq(Glossary.id, Number(params?.id)))
        return NextResponse.json({
            statusCode: 200,
            success: true,
            message: 'Glossary Delete successfully',
            data,
        })
    } catch (error) {
        console.error('Error fetching Mobile Glossary:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
