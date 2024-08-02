import { getDb } from '@/drizzle/db';
import { Articles } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { MySqlRawQueryResult } from 'drizzle-orm/mysql2';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { NextResponse } from "next/server"; 

export async function POST(req: Request) {
    unstable_noStore()
    try {
        // Parse the JSON body
        const body = await req.json()
        
        const { title, category, description, image, content,latestDevice,brands,deviceName,showInNews } = body;

        console.log('body detail created', body, title, category, description, image, deviceName, content,showInNews);

        if (!title || !category || !description || !image || !content) {
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
            showInNews
        });
        
        revalidatePath('/')
        return NextResponse.json({success:true,message:"successfully created article",data:result})
    } catch (error) {
        console.error('Error creating article: api/article/create', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
} 
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    unstable_noStore()
    try {
        // Parse the JSON body
        const body = await req.json();
        
        const { title, category, description, image, content, latestDevice, brands, deviceName, showInNews,id } = body;

        console.log('Body details for update:', body);

        // Check if all required fields are present
        if (!title || !category || !description || !image || !content) {
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
        const result:MySqlRawQueryResult = await db.update(Articles)
            .set({
                title,
                category,
                description,
                image,
                content,
                latestDevice,
                brands,
                deviceName,
                showInNews
            })
            .where(eq(Articles.id, id));

        // Check if the article was successfully updated
        if (!result) {
            return NextResponse.json({ error: 'Article not found' });
        }

        return NextResponse.json({ success: true, message: 'Article updated successfully', data: result });
    } catch (error) {
        console.error('Error updating article: api/article/create', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
