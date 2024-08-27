import { getDb } from "@/drizzle/db";
import { NetworkBands } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request,{ params }: { params: { id: string } }) {
    try {  
        const db = await getDb();
        console.log(
            'connected to the db: detail   NetworkBands ---> api/networkBands/detail/id'
        )
        const data = await db.select().from(NetworkBands).where(eq(NetworkBands.id, Number(params?.id)))
        const parsedNetworkBands = data?.map((networkBands:any) => ({
            ...networkBands,
          }));
        return NextResponse.json({
            statusCode: 200,
            success: true,
            message: 'Get Details network successfully', 
            data: parsedNetworkBands,
        });
    } catch (error) {
        console.error('Error fetching NetworkBands: api/networkBands/detail/id', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
