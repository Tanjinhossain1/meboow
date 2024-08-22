import { getDb } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const db = await getDb();
        console.log(
            'connected to the db: delete Users ---> api/article/delete/:id'
        )
        const data = await db.delete(users).where(eq(users.id, Number(params?.id)))
        return NextResponse.json({
            statusCode: 200,
            success: true,
            message: 'Article Delete successfully',
            data,
        })
    } catch (error) {
        console.error('Error fetching Mobile Users: api/article/delete/:id ', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
 