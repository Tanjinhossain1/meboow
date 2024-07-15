import { db } from "@/drizzle/db";
import { MobileArticles } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";
import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import { IPaginationOptions, paginationHelpers } from "../../shared/helpers";
import { IGenericResponse } from "@/utils/utils";

export async function POST(req: Request) {
  try {
    // Parse the JSON body
    const body = await req.json();

    const {
      title,
      image,
      brands,
      market_status,
      release_date,
      key_specifications,
      physicalSpecification,
      network,
      display,
      processor,
      memory,
      mainCamera,
      selfieCamera,
      os,
      connectivity,
      features,
      battery,
      details,
      prices,
      display_image
    } = body;

    console.log("body detail created", body, title, image);

    if (!title || !image) {
      return NextResponse.json({ error: "Missing required fields" });
    }

    // Perform the database insertion using Drizzle ORM
    const result = await db
      .insert(MobileArticles)
      .values({
        title,
        image,
        brands,
        market_status,
        release_date,
        key_specifications,
        physicalSpecification,
        network,
        display,
        processor,
        memory,
        mainCamera,
        selfieCamera,
        os,
        connectivity,
        features,
        battery,
        details,
        prices,
        display_image
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "successfully created mobile article",
      data: result,
    });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
export async function PUT(req: Request) {
  try {
    // Parse the JSON body
    const body = await req.json();

    const {
      id, // Assuming you have an 'id' field to identify the article to update
      title,
      image,
      brands,
      market_status,
      release_date,
      key_specifications,
      physicalSpecification,
      network,
      display,
      processor,
      memory,
      mainCamera,
      selfieCamera,
      os,
      connectivity,
      features,
      battery,
      details,
      prices,
      display_image
    } = body;

    console.log("Updating article with ID:", id);

    // Check if 'id' is provided
    if (!id) {
      return NextResponse.json({ error: "Missing ID field for update" });
    }

    // Perform the database update using Drizzle ORM
    const result = await db
      .update(MobileArticles)
      .set({
        title,
        image,
        brands,
        market_status,
        release_date,
        key_specifications,
        physicalSpecification,
        network,
        display,
        processor,
        memory,
        mainCamera,
        selfieCamera,
        os,
        connectivity,
        features,
        battery,
        details,
        prices,
        display_image
      })
      .where(eq(MobileArticles.id, Number(id)))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: "Article not found or could not be updated" });
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const filters = {
      searchTerm: searchParams.get("searchTerm"),
      id: searchParams.get("id"),
      all: searchParams.get("all"),
      brands: searchParams.get("brands"),
    };

    const options = {
      limit: parseInt(searchParams.get("limit") || "10", 10),
      page: parseInt(searchParams.get("page") || "1", 10),
      // sortBy: searchParams.get('sortBy') || 'createdAt',
      // sortOrder: searchParams.get('sortOrder') || 'asc',
    };
    const total = await db.select().from(MobileArticles);
    // Perform the database query using Drizzle ORM
    const { data, meta } = await getAll(filters, options);

    return NextResponse.json({
      statusCode: 200,
      success: true,
      message: "Get All  Article successfully",
      meta,
      data,
      // total
    });
  } catch (error) {
    console.error("Error fetching MobileArticles:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
const getAll = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<any[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, all, brands } = filters;
  const whereConditions = [];

  if (brands) {
    const searchConditions = ilike(MobileArticles["brands"], `%${brands}%`);

    whereConditions.push(searchConditions);
  }
  if (searchTerm) {
    const searchConditions = ["title", "description"].map((field) =>
      ilike((MobileArticles as any)[field], `%${searchTerm}%`)
    );

    whereConditions.push(or(...searchConditions));
  }

  // const orderBy: any = options.sortBy;

  const mobileArticles =
    all === "all"
      ? await db
          .select()
          .from(MobileArticles)
          .where(and(...whereConditions))
          .orderBy(desc(MobileArticles.id))
      : await db
          .select()
          .from(MobileArticles)
          .where(and(...whereConditions))
          .orderBy(desc(MobileArticles.id))
          .offset(skip)
          .limit(limit);
  // .orderBy(asc(CreateArticle.createdAt))
  // .orderBy(orderBy);
  //   .orderBy(orderBy)
  //   .all();

  const total = await db
    .select({
      count: count(),
    })
    .from(MobileArticles)
    .where(and(...whereConditions))
    .execute()
    .then((res) => res[0].count);

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: mobileArticles,
  };
};
