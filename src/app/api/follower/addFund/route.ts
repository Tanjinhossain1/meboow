
import { getDb } from "@/drizzle/db";
import { AddFunds } from "@/drizzle/schema";
import { likeInsensitive } from "@/utils/utils";
import { and, desc, eq } from "drizzle-orm";
import { MySqlRawQueryResult } from "drizzle-orm/mysql2";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        // Parse the JSON body
        const body = await req.json();

        const {
            email,
            amount,
            fullName,
            role,
            transactionId,
            method,
            status,
        } = body;

        console.log("body detail created", body);


        const db = await getDb();
        // Perform the database insertion using Drizzle ORM
        const result = await db.insert(AddFunds).values({
            email,
            amount,
            fullName,
            role,
            transactionId,
            method,
            status,

        });
        return NextResponse.json({
            success: true,
            message: "successfully created Funds",
            data: result,
        });
    } catch (error) {
        console.error("Error creating fund POST:", error);
        return NextResponse.json({ error: "Internal Server Error" });
    }
}


export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const db = await getDb();

        const filters = {
            email: searchParams.get("email"),
        };
        const { email } = filters;

        const whereConditions = [];
        if (email) {
            const searchConditions = likeInsensitive(
                AddFunds["email"],
                `%${email}%`
            );

            whereConditions.push(searchConditions);
        }

        // Perform the database insertion using Drizzle ORM
        const result = await db.select().from(AddFunds).where(and(...whereConditions)).orderBy(desc(AddFunds.createdAt))

        console.log('Users  ', result)
        return NextResponse.json({ success: true, message: "successfully Get all Users", data: result })
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        // Parse the JSON body
        const body = await req.json();

        const { status, id } = body;

        console.log('Body details for update:', body);

        // Check if all required fields are present
        if (!status || !id) {
            return NextResponse.json({ error: 'Missing required fields' });
        }

        // Perform the database update using Drizzle ORM
        // const id = Number(params?.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid Fund ID' });
        }
        const db = await getDb();
        console.log(
            'connected to the db: update  user ---> api/follower/fund'
        )
        const result: MySqlRawQueryResult = await db.update(AddFunds)
            .set({
                status
            })
            .where(eq(AddFunds.id, id));

        // Check if the users was successfully updated
        if (!result) {
            return NextResponse.json({ error: 'fund not found' });
        }

        return NextResponse.json({ success: true, message: 'Fund updated successfully', data: result });
    } catch (error) {
        console.error('Error updating users: api/follower/fund', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}