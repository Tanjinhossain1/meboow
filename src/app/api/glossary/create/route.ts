import { getDb } from '@/drizzle/db';
import { Glossary } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    unstable_noStore()
    try {
        // Parse the JSON body
        const body = await req.json()

        const { display_name,
            route,
            content, admin_detail } = body;

        console.log('body detail created', body);

        if (!display_name || !route) {
            return NextResponse.json({ error: 'Missing required fields' });
        }

        // Perform the database insertion using Drizzle ORM
        const db = await getDb();
        const result = await db.insert(Glossary).values({
            display_name,
            route,
            content,
            admin_detail,
        });
        revalidatePath('/')
        return NextResponse.json({ success: true, message: "successfully created Glossary", data: result })
    } catch (error) {
        console.error('Error creating Glossary:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
export async function PUT(req: Request) {
    unstable_noStore()
    try {
        // Parse the JSON body
        const body = await req.json()

        const { admin_detail_edit, display_name,
            route,
            content, id } = body;

        console.log('body detail Updated', body,);


        // Perform the database insertion using Drizzle ORM
        const db = await getDb();
        const result = await db.update(Glossary).set({
            display_name,
            route,
            content,
            admin_detail_edit
        }).where(eq(Glossary.id, id));
        revalidatePath('/')
        return NextResponse.json({ success: true, message: "successfully Updated Glossary", data: result })
    } catch (error) {
        console.error('Error Updated Glossary:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
