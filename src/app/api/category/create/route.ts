import { getDb } from '@/drizzle/db';
import { Category } from '@/drizzle/schema';
import { NextResponse } from "next/server"; 

export async function POST(req: Request) {
    try {
        // Parse the JSON body
        const body = await req.json()
        
        const { title } = body;

        console.log('body detail created', body, title, );

        if (!title) {
            return NextResponse.json({ error: 'Missing required fields' });
        }
        const db = await getDb();
        // Perform the database insertion using Drizzle ORM
        const result = await db.insert(Category).values({
            title,
        });

        return NextResponse.json({success:true,message:"successfully created Category",data:result})
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
} 
