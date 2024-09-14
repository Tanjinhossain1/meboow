'use server'

import { getDb } from "@/drizzle/db";

import {
    unstable_cache as cache,
    unstable_noStore as noStore,
} from "next/cache"
import { Articles, MobileArticles, TechBrands } from "@/drizzle/schema";
import { and, asc, desc, eq, ne, or } from "drizzle-orm";
import { paginationHelpers } from "@/app/api/shared/helpers";
import { likeInsensitive } from "@/utils/utils";

export async function getAllArticles({
    all, pages, limits, brands,
    showInNews,
    id,
    searchTerm,
    category,
    is_related,
    best_reviews,
    latestDevice
}: {
    all?: boolean, pages?: string, limits?: string, searchTerm?: string, brands?: string, latestDevice?: string,
    best_reviews?: string, showInNews?: string, id?: string, category?: string, is_related?: string
}) {
    noStore();
    const cacheKey = `articles-${pages || '1'}-${limits || '10'}-${latestDevice || 'none1'}-${brands || 'none2'}-${showInNews || 'none3'}-${searchTerm || 'none4'}-${best_reviews || 'none5'}-${category || 'none6'}-${is_related || 'none7'}-${all || 'none8'}`;

    return await cache(
        async () => {
            const db = await getDb();

            const options = {
                limit: parseInt(limits || '10', 10),
                page: parseInt(pages || '1', 10),
            };
            const { limit, skip } = paginationHelpers.calculatePagination(options);

            const whereConditions: any = [];

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
            const articlePosts:any =
                all ? await db
                    .select()
                    .from(Articles)
                    .where(and(...whereConditions))
                    .orderBy(desc(Articles.createdAt))
                    : is_related ? await db
                        .select()
                        .from(Articles)
                        .where(and(
                            eq(Articles.category, category as string), // Find posts in the same category
                            ne(Articles.id, Number(is_related)) // Exclude the current article
                        )
                        )
                        .orderBy(desc(Articles.createdAt))
                        .offset(skip)
                        .limit(limit) : await db
                            .select()
                            .from(Articles)
                            .where(and(...whereConditions))
                            .orderBy(desc(Articles.createdAt))
                            .offset(skip)
                            .limit(limit);
            return articlePosts
        },
        [cacheKey],
        {
            revalidate: 300, // every 5 minutes
            tags: ["articles"],
        }
    )()
}

export async function getAllMobiles({
    all, pages, limits, brands,
    is_by_fans,
    is_daily_interest,
    searchTerm,
    is_latest_device
}: {
    all?: boolean, pages?: string, limits?: string, searchTerm?: string, brands?: string, is_by_fans?: string,
    is_daily_interest?: string, is_latest_device?: string
}) {
    noStore()

    const cacheKey = `mobiles-${pages || '1'}-${limits || '10'}-${is_by_fans || 'mobile1'}-${brands || 'mobile2'}-${is_daily_interest || 'mobile3'}-${searchTerm || 'mobile4'}-${is_latest_device || 'mobile5'}-${all || 'mobile6'}`;

    return await cache(
        async () => {
            const db = await getDb();
            const options = {
                limit: parseInt(limits || '10', 10),
                page: parseInt(pages || '1', 10),
            };
            const { limit, skip } = paginationHelpers.calculatePagination(options);

            const whereConditions: any = [];
            if (brands) {
                const searchConditions = likeInsensitive(
                    MobileArticles["brands"],
                    `%${brands}%`
                );

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
                const searchConditions = ["title"].map((field) =>
                    likeInsensitive((MobileArticles as any)[field], `%${searchTerm}%`)
                );

                whereConditions.push(or(...searchConditions));
            }
            const mobileArticles =
                all
                    ? await db
                        .select()
                        .from(MobileArticles)
                        .where(and(...whereConditions)) 
                        .orderBy(desc(MobileArticles.createdAt))
                    : await db
                        .select()
                        .from(MobileArticles)
                        .where(and(...whereConditions))
                        .orderBy(desc(MobileArticles.createdAt))
                        .offset(skip)
                        .limit(limit);

            return mobileArticles
        },
        [cacheKey],
        {
            revalidate: 300, // every 5 minutes
            tags: ["mobiles"],
        }
    )()
}

export async function getAllBrands() {
    const db = await getDb();
    return await cache(
        async () => {
            return db
                .select()
                .from(TechBrands)
                .orderBy(asc(TechBrands.createdAt))
        },
        ["brands"],
        {
            revalidate: 3600, // every 5 minutes
            tags: ["brands"],
        }
    )()
}