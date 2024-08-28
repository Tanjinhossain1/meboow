import { getDb } from '@/drizzle/db';
import { Glossary } from '@/drizzle/schema';
import {  desc, and, eq } from 'drizzle-orm';
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {

        const { searchParams } = new URL(req.url);

        const   route = searchParams.get('route')
        
        const whereConditions = [];

        if (route) {
            const searchConditions =  eq(Glossary["route"], route);
            whereConditions.push(searchConditions);
        }
        const db = await getDb();
        // Perform the database insertion using Drizzle ORM
        const result = await db.select().from(Glossary).where(and(...whereConditions)).orderBy(desc(Glossary.createdAt)).execute();

        return NextResponse.json({ success: true, message: "successfully Get all Glossary", data: result })
    } catch (error) {
        console.error('Error creating Glossary:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}