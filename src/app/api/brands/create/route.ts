import { getDb } from '@/drizzle/db';
import { TechBrands } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import {  revalidateTag } from 'next/cache';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    
    try {
        // Parse the JSON body
        const body = await req.json()

        const { title, image, admin_detail } = body;

        console.log('body detail created', body, title,);

        if (!title || !image) {
            return NextResponse.json({ error: 'Missing required fields' });
        }

        // Perform the database insertion using Drizzle ORM
        const db = await getDb();
        const result = await db.insert(TechBrands).values({
            title,
            image,
            admin_detail,
        });
        revalidateTag('brands');
        return NextResponse.json({ success: true, message: "successfully created Brands", data: result })
    } catch (error) {
        console.error('Error creating brands:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
export async function PUT(req: Request) {
    
    try {
        // Parse the JSON body
        const body = await req.json()

        const { admin_detail_edit, title, image, id } = body;

        console.log('body detail Updated', body, title,);

        if (!title || !image) {
            return NextResponse.json({ error: 'Missing required fields' });
        }

        // Perform the database insertion using Drizzle ORM
        const db = await getDb();
        const result = await db.update(TechBrands).set({
            title,
            image,
            admin_detail_edit
        }).where(eq(TechBrands.id, id));
        revalidateTag('brands');
        return NextResponse.json({ success: true, message: "successfully Updated Brands", data: result })
    } catch (error) {
        console.error('Error Updated brands:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
