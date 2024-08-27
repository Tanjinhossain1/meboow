import { getDb } from '@/drizzle/db';
import { NetworkBands } from '@/drizzle/schema';
import { desc ,asc} from 'drizzle-orm';
import { NextResponse } from "next/server"; 

export async function GET(req: Request) {
    try {
        const db = await getDb();
        // Perform the database insertion using Drizzle ORM
        const result = await db.select().from(NetworkBands).orderBy(asc(NetworkBands.createdAt)).execute();

        return NextResponse.json({success:true,message:"successfully Get all Brands",data:result})
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}