import { getDb } from "@/drizzle/db";
import { EaringVideoUrls } from "@/drizzle/schema";
import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const db = await getDb();
        // Perform the database insertion using Drizzle ORM
        const result = await db.select().from(EaringVideoUrls).orderBy(asc(EaringVideoUrls.createdAt)).execute();

        return NextResponse.json({success:true,message:"successfully Get all Video Urls",data:result})
    } catch (error) {
        console.error('Error get video urls:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}

export async function POST(req: Request) {
    
    try {
        // Parse the JSON body
        const body = await req.json()

        const { video,income } = body;

        console.log('body detail created', video, income,);

        if (!video || !income) {
            return NextResponse.json({ error: 'Missing required fields' });
        }

        // Perform the database insertion using Drizzle ORM
        const db = await getDb();
        const result = await db.insert(EaringVideoUrls).values({
            video,
            income
        });
        
        return NextResponse.json({ success: true, message: "successfully created Video Url", data: result })
    } catch (error) {
        console.error('Error creating uploadUrl:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}