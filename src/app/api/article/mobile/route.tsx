import { getDb } from "@/drizzle/db";
import { MobileArticles } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";
import { and, count, desc, eq, or } from "drizzle-orm";
import { IPaginationOptions, paginationHelpers } from "../../shared/helpers";
import { IGenericResponse, likeInsensitive } from "@/utils/utils";

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
      display_image,
      expert_view,
      is_by_fans,
      is_daily_interest,
      is_latest_device,
    } = body;

    console.log("body detail created", body, title, image);

    if (!title || !image) {
      return NextResponse.json({ error: "Missing required fields" });
    }
    const db = await getDb();
    // Perform the database insertion using Drizzle ORM
    const result = await db.insert(MobileArticles).values({
      title,
      image: image,
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
      display_image,
      expert_view,
      is_by_fans,
      is_daily_interest,
      is_latest_device,
    });

    return NextResponse.json({
      success: true,
      message: "successfully created mobile article",
      data: result,
    });
  } catch (error) {
    console.error("Error creating article POST:", error);
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
      display_image,
      expert_view,

      is_by_fans,
      is_daily_interest,
      is_latest_device,
    } = body;

    console.log("Updating article with ID:", id);

    // Check if 'id' is provided
    if (!id) {
      return NextResponse.json({ error: "Missing ID field for update" });
    }
    const db = await getDb();
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
        display_image,
        expert_view,

        is_by_fans,
        is_daily_interest,
        is_latest_device,
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const filters = {
      searchTerm: searchParams.get("searchTerm"),
      id: searchParams.get("id"),
      all: searchParams.get("all"),
      brands: searchParams.get("brands"),

      is_by_fans: searchParams.get("is_by_fans"),
      is_daily_interest: searchParams.get("is_daily_interest"),
      is_latest_device: searchParams.get("is_latest_device"),
    };

    const options = {
      limit: parseInt(searchParams.get("limit") || "10", 10),
      page: parseInt(searchParams.get("page") || "1", 10),
      // sortBy: searchParams.get('sortBy') || 'createdAt',
      // sortOrder: searchParams.get('sortOrder') || 'asc',
    };
    // const total = await db.select().from(MobileArticles);
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
  const {
    searchTerm,
    all,
    brands,
    is_by_fans,
    is_daily_interest,
    is_latest_device,
  } = filters;
  const whereConditions = [];
console.log('checking the data is coing ',is_by_fans,
  is_daily_interest,
  is_latest_device)
  if (brands) {
    const searchConditions = likeInsensitive(MobileArticles["brands"], `%${brands}%`);

    whereConditions.push(searchConditions);
  }
  if (is_by_fans) {
    const searchConditions = likeInsensitive(
      MobileArticles["is_by_fans"],
      `%${is_by_fans}%`
    );

    whereConditions.push(searchConditions);
  }
  if (is_daily_interest) {
    const searchConditions = likeInsensitive(
      MobileArticles["is_daily_interest"],
      `%${is_daily_interest}%`
    );

    whereConditions.push(searchConditions);
  }

  if (is_latest_device) {
    const searchConditions = likeInsensitive(
      MobileArticles["is_latest_device"],
      `%${is_latest_device}%`
    );

    whereConditions.push(searchConditions);
  }

  if (searchTerm) {
    const searchConditions = ["title", "description"].map((field) =>
      likeInsensitive((MobileArticles as any)[field], `%${searchTerm}%`)
    );

    whereConditions.push(or(...searchConditions));
  }

  // const orderBy: any = options.sortBy;
  const db = await getDb();
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
  // const articleData = {
  //   ...mobileArticles,
  //   key_specification:
  // }

  const parsedArticles = mobileArticles.map((article: any) => ({
    ...article,
  }));
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: parsedArticles,
  };
};
