import { getDb } from '@/drizzle/db';
import { Category } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Parse the JSON body
        const body = await req.json()

        const { title, admin_detail,sub_categories } = body;

        console.log('body detail created', body, title,);

        if (!title) {
            return NextResponse.json({ error: 'Missing required fields' });
        }
        const db = await getDb();
        // Perform the database insertion using Drizzle ORM
        const result = await db.insert(Category).values({
            title,
            admin_detail,
            sub_categories
        });

        return NextResponse.json({ success: true, message: "successfully created Category", data: result })
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}

export async function PUT(req: Request) {
    try {
        // Parse the JSON body
        const body = await req.json()

        const { title, id, admin_detail_edit,sub_categories } = body;

        console.log('body detail Updated', body, title,);

        if (!title) {
            return NextResponse.json({ error: 'Missing required fields' });
        }

        // Perform the database insertion using Drizzle ORM
        const db = await getDb();
        const result = await db.update(Category).set({
            title,
            admin_detail_edit,
            sub_categories
        }).where(eq(Category.id, id));

        return NextResponse.json({ success: true, message: "successfully Updated Category", data: result })
    } catch (error) {
        console.error('Error Updated Category:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
