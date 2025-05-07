import { getDb } from "@/drizzle/db";
import { WatchedVideoInfo } from "@/drizzle/schema";
import { likeInsensitive } from "@/utils/utils";
import { and, asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// videoId: currentVideo?.id,
//                 video: currentVideo?.video,
//                 email: user?.email,
//                 income: currentVideo?.income,
//                 lastVideoIndex: currentVideoIndex
export async function GET(req: Request) {
    try {

        const { searchParams } = new URL(req.url);

        const email = searchParams.get('email')
        // Perform the database insertion using Drizzle ORM
        const whereConditions = [];
        if (email) {
            const searchConditions = likeInsensitive(WatchedVideoInfo["email"], `%${email}%`)
            whereConditions.push(searchConditions);
        }
        const db = await getDb();
        // Perform the database insertion using Drizzle ORM
        const result = await db.select().from(WatchedVideoInfo).where(and(...whereConditions)).orderBy(asc(WatchedVideoInfo.createdAt)).execute();

        return NextResponse.json({ success: true, message: "successfully Get all user Watched video", data: result })
    } catch (error) {
        console.error('Error get video urls:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}

export async function POST(req: Request) {

    try {
        // Parse the JSON body
        const body = await req.json()

        const { video, income, email, lastVideoIndex, videoId } = body;

        console.log('body detail created', video, income, email, lastVideoIndex, videoId);

        if (!video || !income || !email || !lastVideoIndex || !videoId) {
            return NextResponse.json({ error: 'Missing required fields' });
        }
        // ✅ Check if this video is already watched by this user

        // Perform the database insertion using Drizzle ORM
        const db = await getDb();
        const result = await db.insert(WatchedVideoInfo).values({
            video,
            income,
            email,
            lastVideoIndex,
            videoId,
        });

        return NextResponse.json({ success: true, message: "successfully video watched", data: result })
    } catch (error) {
        console.error('Error creating uploadUrl:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}