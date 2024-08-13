import { getDb } from "@/drizzle/db";
import { ArticleOpinion } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";
import { and, count, desc, eq, or } from "drizzle-orm";
import { IGenericResponse, likeInsensitive } from "@/utils/utils";
import { IPaginationOptions, paginationHelpers } from "@/app/api/shared/helpers";

export async function POST(req: Request) {
    try {
        // Parse the JSON body
        const body = await req.json();

        const {
            name,
            email,
            articleId,
            comments,
        } = body;

        console.log("body detail created", body);

        if (!name || !email || !articleId || !comments) {
            return NextResponse.json({ error: "Missing required fields" });
        }
        const db = await getDb();
        // Perform the database insertion using Drizzle ORM
        const result = await db.insert(ArticleOpinion).values({
            name,
            email,
            articleId,
            comments,
        });

        return NextResponse.json({
            success: true,
            message: "successfully created Opinion",
            data: result,
        });
    } catch (error) {
        console.error("Error creating Opinion POST:", error);
        return NextResponse.json({ error: "Internal Server Error" });
    }
}
export async function PUT(req: Request) {
    try {
        // Parse the JSON body
        const body = await req.json();
        const {
            id,
            name,
            email,
            articleId,
            comments,
        } = body;

        console.log("Updating Article with ID:", id);

        // Check if 'id' is provided
        if (!id) {
            return NextResponse.json({ error: "Missing ID field for update" });
        }
        const db = await getDb();
        // Perform the database update using Drizzle ORM
        const result = await db
            .update(ArticleOpinion)
            .set({
                name,
                email,
                articleId,
                comments,

            })
            .where(eq(ArticleOpinion.id, Number(id)));

        if (!result) {
            return NextResponse.json({
                error: "Opinion not found or could not be updated",
            });
        }

        return NextResponse.json({
            success: true,
            message: "Successfully updated mobile Opinion",
            data: result,
        });
    } catch (error) {
        console.error("Error updating Opinion:", error);
        return NextResponse.json({ error: "Internal Server Error" });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const filters = {
            searchTerm: searchParams.get("searchTerm"),
            articleId: searchParams.get("articleId"),
        };

        const options = {
            limit: parseInt(searchParams.get("limit") || "10", 10),
            page: parseInt(searchParams.get("page") || "1", 10),
            // sortBy: searchParams.get('sortBy') || 'createdAt',
            // sortOrder: searchParams.get('sortOrder') || 'asc',
        };
        // const total = await db.select().from(MobileArticles);
        // Perform the database query using Drizzle ORM
        console.log('checking the data is coing searchTermsearchTermsearchTerm filtersfiltersfiltersfilters', filters)
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
        articleId
    } = filters;
    const whereConditions = [];
 
    if (articleId) {
        const searchConditions = eq(ArticleOpinion["articleId"], Number(articleId));
        whereConditions.push(searchConditions);
    }
    if (searchTerm) {
        const searchConditions = ["title"].map((field) =>
            likeInsensitive((ArticleOpinion as any)[field], `%${searchTerm}%`)
        );

        whereConditions.push(or(...searchConditions));
    }

    // const orderBy: any = options.sortBy;
    const db = await getDb();
    const opinions = await db
        .select()
        .from(ArticleOpinion)
        .where(and(...whereConditions))
        .orderBy(desc(ArticleOpinion.id))
        .offset(skip)
        .limit(limit);

    const total = await db
        .select({
            count: count(),
        })
        .from(ArticleOpinion)
        .where(and(...whereConditions))
        .execute()
        .then((res) => res[0].count);
    // const articleData = {
    //   ...opinions,
    //   key_specification:
    // }
 
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: opinions,
    };
};
