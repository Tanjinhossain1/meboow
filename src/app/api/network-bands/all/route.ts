import { getDb } from '@/drizzle/db';
import { NetworkBands } from '@/drizzle/schema';
import { likeInsensitive } from '@/utils/utils';
import { desc, asc, and } from 'drizzle-orm';
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {

        const { searchParams } = new URL(req.url);

        const   country = searchParams.get('country')
        
        const whereConditions = [];

        if (country) {
            const searchConditions = likeInsensitive(NetworkBands["country"], `%${country}%`)
            whereConditions.push(searchConditions);
        }
        const db = await getDb();
        // Perform the database insertion using Drizzle ORM
        const result = await db.select().from(NetworkBands).where(and(...whereConditions)).orderBy(asc(NetworkBands.createdAt)).execute();

        return NextResponse.json({ success: true, message: "successfully Get all Brands", data: result })
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}