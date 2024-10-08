import { getDb } from "@/drizzle/db";
import { MobileArticles } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import {  NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { title: string } }
) {
  try {
    const db = await getDb();
     
    console.log('this is the formattedTitle inthe the review title in api file ', params);
    const data = await db
      .select()
      .from(MobileArticles)
      .where(eq(MobileArticles.title, params?.title));

    return NextResponse.json({
      statusCode: 200,
      success: true,
      message: "Get Details Article successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching Mobile Articles:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}

export async function PUT(req: Request) {
  try {
    // Parse the JSON body
    const body = await req.json();
    const {
      id, // Assuming you have an 'id' field to identify the article to update
      total_fans
    } = body;

    console.log("Updating article with ID:", id);

    // Check if 'id' is provided
    if (!id) {
      return NextResponse.json({ error: "Missing ID field for Fan " });
    }
    const db = await getDb();
    // Perform the database update using Drizzle ORM
    const result = await db
      .update(MobileArticles)
      .set({
        total_fans
      })
      .where(eq(MobileArticles.id, Number(id)));

    if (!result) {
      return NextResponse.json({
        error: "Article not found or could not be updated",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Successfully updated mobile article",
      data: result,
    });
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
