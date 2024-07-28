import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";
import { IGenericResponse, sendResponse } from '@/utils/utils';
import { getDb } from '@/drizzle/db';
import { Articles } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(req: Request) {
    try {
        // Parse the JSON body
        const id = 12


        // console.log('body detail created', id);

        // if (!id) {
        //     return NextResponse.json({ error: 'Missing Id' });
        // }
        const db = await getDb();
        // Perform the database insertion using Drizzle ORM
        const result = await db.delete(Articles).where(eq(Articles.id, id));
        return NextResponse.json({ success: true, message: "successfully Delete article", data: result })
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}

