import { getDb } from '@/drizzle/db';
import { TechBrands } from '@/drizzle/schema';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { NextResponse } from "next/server"; 

export async function POST(req: Request) {
    unstable_noStore()
    try {
        // Parse the JSON body
        const body = await req.json()
        
        const { title ,image} = body;
        
        console.log('body detail created', body, title, );
        
        if (!title || !image) {
            return NextResponse.json({ error: 'Missing required fields' });
        }
        
        // Perform the database insertion using Drizzle ORM
        const db = await getDb();
        const result = await db.insert(TechBrands).values({
            title,
            image
        });
        revalidatePath('/')
        return NextResponse.json({success:true,message:"successfully created Brands",data:result})
    } catch (error) {
        console.error('Error creating brands:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
} 
