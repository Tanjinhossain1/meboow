import { db } from '@/drizzle/db';
import { TechBrands } from '@/drizzle/schema';
import { NextResponse } from "next/server"; 

export async function POST(req: Request) {
    try {
        // Parse the JSON body
        const body = await req.json()
        
        const { title ,image} = body;

        console.log('body detail created', body, title, );

        if (!title || !image) {
            return NextResponse.json({ error: 'Missing required fields' });
        }
        
        // Perform the database insertion using Drizzle ORM
        const result = await db.insert(TechBrands).values({
            title,
            image
        });

        return NextResponse.json({success:true,message:"successfully created Brands",data:result})
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
} 
