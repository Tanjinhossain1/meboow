import { getDb } from '@/drizzle/db';
import { Articles } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { MySqlRawQueryResult } from 'drizzle-orm/mysql2';
import { revalidateTag } from 'next/cache';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Parse the JSON body
        const body = await req.json()

        const { title, category, description, image, content, latestDevice, brands, deviceName, showInNews, best_reviews,
            admin_detail, selected_mobile, pages, tags, route } = body;

        console.log('body detail created', body, title, category, description, image, deviceName, content, showInNews, selected_mobile);

        if (!title || !category || !description || !image) {
            return NextResponse.json({ error: 'Missing required fields' });
        }
        const db = await getDb();
        console.log(
            'connected to the db: create articles ---> api/article/create'
        )
        // Perform the database insertion using Drizzle ORM
        const result = await db.insert(Articles).values({
            title,
            category,
            description,
            image,
            content,
            latestDevice,
            brands,
            deviceName,
            showInNews,
            best_reviews,
            admin_detail,
            selected_mobile,
            pages,
            tags, route
        });
        revalidateTag('articles');
        return NextResponse.json({ success: true, message: "successfully created article", data: result })
    } catch (error) {
        console.error('Error creating article: api/article/create', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        // Parse the JSON body
        const body = await req.json();

        const { title, category, description, image, content, latestDevice, brands, deviceName, showInNews, id, best_reviews,
            admin_detail_edit, selected_mobile, pages, route, tags } = body;

        console.log('Body details for update:', body);

        // Check if all required fields are present
        if (!title || !category || !description || !image) {
            return NextResponse.json({ error: 'Missing required fields' });
        }

        // Perform the database update using Drizzle ORM
        // const id = Number(params?.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid article ID' });
        }
        const db = await getDb();
        console.log(
            'connected to the db: update  articles ---> api/v1/article/all'
        )
        const result: MySqlRawQueryResult = await db.update(Articles)
            .set({
                title,
                category,
                description,
                image,
                content,
                latestDevice,
                brands,
                deviceName,
                showInNews,
                best_reviews,
                admin_detail_edit,
                selected_mobile,
                pages, tags, route
            })
            .where(eq(Articles.id, id));

        // Check if the article was successfully updated
        if (!result) {
            return NextResponse.json({ error: 'Article not found' });
        }
        revalidateTag('articles');
        return NextResponse.json({ success: true, message: 'Article updated successfully', data: result });
    } catch (error) {
        console.error('Error updating article: api/article/create', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
