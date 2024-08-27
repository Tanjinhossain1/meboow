import { getDb } from '@/drizzle/db';
import { NetworkBands } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    unstable_noStore()
    try {
        // Parse the JSON body
        const body = await req.json()

        const {  country,
            content, admin_detail } = body;

        console.log('body detail created', body);

        if (!country) {
            return NextResponse.json({ error: 'Missing required fields' });
        }

        // Perform the database insertion using Drizzle ORM
        const db = await getDb();
        const result = await db.insert(NetworkBands).values({
            country,
            content,
            admin_detail,
        });
        revalidatePath('/')
        return NextResponse.json({ success: true, message: "successfully created Network Bands", data: result })
    } catch (error) {
        console.error('Error creating Network Bands:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
export async function PUT(req: Request) {
    unstable_noStore()
    try {
        // Parse the JSON body
        const body = await req.json()

        const { admin_detail_edit,  country,
            content,id } = body;

        console.log('body detail Updated', body,);

        if (!country) {
            return NextResponse.json({ error: 'Missing required fields' });
        }

        // Perform the database insertion using Drizzle ORM
        const db = await getDb();
        const result = await db.update(NetworkBands).set({
            country,
            content,
            admin_detail_edit
        }).where(eq(NetworkBands.id, id));
        revalidatePath('/')
        return NextResponse.json({ success: true, message: "successfully Updated Networks", data: result })
    } catch (error) {
        console.error('Error Updated Networks:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
