import { getDb } from "@/drizzle/db";
import { Glossary } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request,{ params }: { params: { id: string } }) {
    try {  
        const db = await getDb();
        console.log(
            'connected to the db: detail   Glossary ---> api/Glossary/detail/id'
        )
        const data = await db.select().from(Glossary).where(eq(Glossary.id, Number(params?.id)))
        const parsedGlossary = data?.map((glossary:any) => ({
            ...glossary,
          }));
        return NextResponse.json({
            statusCode: 200,
            success: true,
            message: 'Get Details Glossary successfully', 
            data: parsedGlossary,
        });
    } catch (error) {
        console.error('Error fetching Glossary: api/Glossary/detail/id', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
