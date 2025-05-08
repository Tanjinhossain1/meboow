import { getDb } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the JSON body
    const body = await req.json();

    const { email, fullName, password, role,referralId } = body;

    console.log("body detail created", body);

    if (!email || !fullName || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" });
    }
    
    const db = await getDb();
    // existing user
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (existingUser&& existingUser[0]) {
      return NextResponse.json({ error: "User Already Register" });
    }
    const hashedPassword = await hash(password, 12);
    // Perform the database insertion using Drizzle ORM
    const result = await db
      .insert(users)
      .values({
        fullName,
        email,
        password: password,
        role,
        referralId
      })
      const insertedId = result[0]?.insertId;
    
      // Fetch the newly created user
      const newUser = await db
        .select()
        .from(users)
        .where(eq(users.id, insertedId));
  
  
    return NextResponse.json({
      success: true,
      message: "successfully created User",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
