
import { getDb } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { and, desc, eq } from "drizzle-orm";
import { MySqlRawQueryResult } from "drizzle-orm/mysql2";
import { NextResponse } from "next/server";




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
            const searchConditions = eq(
                users["email"],
                `%${email}%`
            );

            whereConditions.push(searchConditions);
        }

        // Perform the database insertion using Drizzle ORM
        const result = await db.select().from(users).where(and(...whereConditions)).orderBy(desc(users.createdAt))

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

        const { ballance, totalSpend, id } = body;

        console.log('Body details for update:', body);

        // Check if all required fields are present
        if (!ballance || !totalSpend || !id) {
            return NextResponse.json({ error: 'Missing required fields' });
        }

        // Perform the database update using Drizzle ORM
        // const id = Number(params?.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid users ID' });
        }
        const db = await getDb();
        console.log(
            'connected to the db: update  user ---> api/follower/user'
        )
        const result: MySqlRawQueryResult = await db.update(users)
            .set({
                ballance,
                totalSpend
            })
            .where(eq(users.id, id));

        // Check if the users was successfully updated
        if (!result) {
            return NextResponse.json({ error: 'users not found' });
        }

        return NextResponse.json({ success: true, message: 'users updated successfully', data: result });
    } catch (error) {
        console.error('Error updating users: api/follower/user', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}