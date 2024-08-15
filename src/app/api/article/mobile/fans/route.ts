import { getDb } from "@/drizzle/db";
import { MobileFanDetail } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";
import { and, count, desc, eq, or } from "drizzle-orm";
import { IGenericResponse, likeInsensitive } from "@/utils/utils";
import { IPaginationOptions, paginationHelpers } from "@/app/api/shared/helpers";

export async function POST(req: Request) {
    try {
        // Parse the JSON body
        const body = await req.json();

        const {
            email,
            mobileId
        } = body;

        console.log("body detail created", body);

        if ( !email || !mobileId ) {
            return NextResponse.json({ error: "Missing required fields" });
        }
        const db = await getDb();
        // Perform the database insertion using Drizzle ORM
        const result = await db.insert(MobileFanDetail).values({
           email,
           mobileId
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
            email,
            mobileId,
        } = body;

        console.log("Updating Article with ID:", id);

        // Check if 'id' is provided
        if (!id) {
            return NextResponse.json({ error: "Missing ID field for update" });
        }
        const db = await getDb();
        // Perform the database update using Drizzle ORM
        const result = await db
            .update(MobileFanDetail)
            .set({
                email,
                mobileId,

            })
            .where(eq(MobileFanDetail.id, Number(id)));

        if (!result) {
            return NextResponse.json({
                error: "Fans not found or could not be updated",
            });
        }

        return NextResponse.json({
            success: true,
            message: "Successfully updated mobile Fans",
            data: result,
        });
    } catch (error) {
        console.error("Error updating Fans:", error);
        return NextResponse.json({ error: "Internal Server Error" });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const filters = {
            searchTerm: searchParams.get("searchTerm"),
            mobileId: searchParams.get("mobileId"),
            email: searchParams.get("email"),
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
        mobileId,
        email
    } = filters;
    const whereConditions = [];
 
    if (mobileId && email) {
        const searchConditions = eq(MobileFanDetail["mobileId"], Number(mobileId));
        const searchConditions1 = eq(MobileFanDetail["email"], email);
        whereConditions.push(searchConditions);
        whereConditions.push(searchConditions1);
    }
    
    if (searchTerm) {
        const searchConditions = ["title"].map((field) =>
            likeInsensitive((MobileFanDetail as any)[field], `%${searchTerm}%`)
        );

        whereConditions.push(or(...searchConditions));
    }

    // const orderBy: any = options.sortBy;
    const db = await getDb();
    const opinions = await db
        .select()
        .from(MobileFanDetail)
        .where(and(...whereConditions))
        .orderBy(desc(MobileFanDetail.id))
        .offset(skip)
        .limit(limit);

    const total = await db
        .select({
            count: count(),
        })
        .from(MobileFanDetail)
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
