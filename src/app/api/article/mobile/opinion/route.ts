import { getDb } from "@/drizzle/db";
import { Opinion } from "@/drizzle/schema";
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
            mobileId,
            comments,
        } = body;

        console.log("body detail created", body);

        if (!name || !email || !mobileId || !comments) {
            return NextResponse.json({ error: "Missing required fields" });
        }
        const db = await getDb();
        // Perform the database insertion using Drizzle ORM
        const result = await db.insert(Opinion).values({
            name,
            email,
            mobileId,
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
            mobileId,
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
            .update(Opinion)
            .set({
                name,
                email,
                mobileId,
                comments,

            })
            .where(eq(Opinion.id, Number(id)));

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
            mobileId: searchParams.get("mobileId"),
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
        mobileId
    } = filters;
    const whereConditions = [];
 
    if (mobileId) {
        const searchConditions = eq(Opinion["mobileId"], Number(mobileId));
        whereConditions.push(searchConditions);
    }
    if (searchTerm) {
        const searchConditions = ["title"].map((field) =>
            likeInsensitive((Opinion as any)[field], `%${searchTerm}%`)
        );

        whereConditions.push(or(...searchConditions));
    }

    // const orderBy: any = options.sortBy;
    const db = await getDb();
    const opinions = await db
        .select()
        .from(Opinion)
        .where(and(...whereConditions))
        .orderBy(desc(Opinion.id))
        .offset(skip)
        .limit(limit);

    const total = await db
        .select({
            count: count(),
        })
        .from(Opinion)
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
