import { getDb } from "@/drizzle/db";
import { NetworkBands } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const db = await getDb();
        const data = await db.delete(NetworkBands).where(eq(NetworkBands.id, Number(params?.id)))
        return NextResponse.json({
            statusCode: 200,
            success: true,
            message: 'Network Band Delete successfully',
            data,
        })
    } catch (error) {
        console.error('Error fetching Mobile Network Bands:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
