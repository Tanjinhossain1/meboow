import { getDb } from '@/drizzle/db';
import { Glossary } from '@/drizzle/schema';
import { sql, eq } from 'drizzle-orm';
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const db = await getDb();

    // Fetch all glossary entries
    const result = await db.select().from(Glossary).orderBy(Glossary.display_name).execute();

    // Prepare an object to hold the grouped data
    const groupedData: { [key: string]: any } = {};

    // Loop through each glossary entry
    result.forEach((item) => {
      const firstChar = item.display_name[0].toUpperCase();

      // Determine the group type ("0-9" for numbers, A-Z for letters)
      let groupType;
      if (/[0-9]/.test(firstChar)) {
        groupType = "0-9";
      } else if (/[A-Z]/.test(firstChar)) {
        groupType = firstChar;
      } else {
        groupType = "#"; // Fallback for non-alphanumeric characters
      }

      // Initialize the group if it doesn't exist
      if (!groupedData[groupType]) {
        groupedData[groupType] = {
          type: groupType,
          data: []
        };
      }

      // Add the item to the appropriate group
      groupedData[groupType].data.push({
        display_name: item.display_name,
        route: item.route,
      });
    });

    // Convert the grouped data object into an array
    const responseData = Object.values(groupedData);

    return NextResponse.json({
      success: true,
      message: "Successfully retrieved all glossary entries",
      data: responseData,
    });

  } catch (error) {
    console.error('Error retrieving glossary entries:', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
