import { NextRequest, NextResponse } from "next/server";
import { IGenericResponse, likeInsensitive, sendResponse } from '@/utils/utils';
// import { ilike, and, or, desc, asc } from 'drizzle-orm/expressions';
import { IPaginationOptions, paginationHelpers } from '@/app/api/shared/helpers';
import { getDb } from "@/drizzle/db";
import { Articles } from "@/drizzle/schema";
import { and, count, desc, eq, ilike, ne, or, sql } from "drizzle-orm";

export async function POST(req: Request) {

    // Parse the JSON body
    const body = await req.json()

    const { title, category, description, image, content } = body;

    console.log('body detail created', body, title, category, description, image, content);

    if (!title || !category || !description || !image || !content) {
        return NextResponse.json({ error: 'Missing required fields' });
    }

    const db = await getDb();
    console.log(
        'connected to the db: get all articles ---> api/v1/article/all'
    )
    // Perform the database insertion using Drizzle ORM
    const result = await db.insert(Articles).values({
        title,
        category,
        description,
        image,
        content,
    });

    return NextResponse.json({ success: true, message: "successfully created article", data: result })

}


export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);

    const filters = {
        searchTerm: searchParams.get('searchTerm'),
        id: searchParams.get('id'),
        category: searchParams.get('category'),
        latestDevice: searchParams.get('latestDevice'),
        all: searchParams.get('all'),
        brands: searchParams.get('brands'),
        best_reviews: searchParams.get('best_reviews'),
        showInNews: searchParams.get('showInNews'),
        is_related: searchParams.get('is_related'),
    };

    const options = {
        limit: parseInt(searchParams.get('limit') || '10', 10),
        page: parseInt(searchParams.get('page') || '1', 10),
        // sortBy: searchParams.get('sortBy') || 'createdAt',
        // sortOrder: searchParams.get('sortOrder') || 'asc',
    };
    // Perform the database query using Drizzle ORM
    const { data, meta } = await getAll(filters, options);
    console.log('this is the server data of results   ', data, meta)
    return NextResponse.json({
        statusCode: 200,
        success: true,
        message: 'Get All  Article successfully',
        meta,
        data,
        // total
    });

}
const getAll = async (
    filters: any,
    options: IPaginationOptions
): Promise<IGenericResponse<any[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, category, latestDevice, all, brands, showInNews, best_reviews, is_related } = filters;
    const whereConditions = [];

    if (category) {
        const searchConditions = likeInsensitive(Articles["category"], `%${category}%`)

        whereConditions.push(searchConditions);
    }
    if (best_reviews) {
        const searchConditions = likeInsensitive(Articles["best_reviews"], `%${best_reviews}%`)

        whereConditions.push(searchConditions);
    }
    if (showInNews) {
        const searchConditions = likeInsensitive(Articles["showInNews"], `%${showInNews}%`)

        whereConditions.push(searchConditions);
    }
    if (latestDevice) {
        const searchConditions = likeInsensitive(Articles["latestDevice"], `%${latestDevice}%`)

        whereConditions.push(searchConditions);
    }
    if (brands) {
        const searchConditions = likeInsensitive(Articles["brands"], `%${brands}%`)

        whereConditions.push(searchConditions);
    }
    if (searchTerm) {
        const searchConditions = ['title', 'category', 'description'].map((field) =>
            likeInsensitive((Articles as any)[field], `%${searchTerm}%`)
        );

        whereConditions.push(or(...searchConditions));
    }

    // const orderBy: any = options.sortBy;

    const db = await getDb();
    console.log(
        'connected to the db: get all articles ---> api/v1/article/all'
    )

    const articles = all === "all" ? await db
        .select()
        .from(Articles)
        .where(and(...whereConditions))
        .orderBy(desc(Articles.id))
        : is_related ? await db
            .select()
            .from(Articles)
            .where(and(
                eq(Articles.category, category), // Find posts in the same category
                ne(Articles.id, Number(is_related)) // Exclude the current article
            )
            )
            .orderBy(desc(Articles.id))
            .offset(skip)
            .limit(limit) : await db
                .select()
                .from(Articles)
                .where(and(...whereConditions))
                .orderBy(desc(Articles.id))
                .offset(skip)
                .limit(limit);
    // .orderBy(asc(CreateArticle.createdAt))
    // .orderBy(orderBy);
    //   .orderBy(orderBy)
    //   .all();

    const total = await db.select({
        count: count(),
    }).from(Articles).where(and(...whereConditions)).execute().then((res) => res[0].count)

    return {
        meta: {
            total,
            page,
            limit,
        },
        data: articles,
    };
};
