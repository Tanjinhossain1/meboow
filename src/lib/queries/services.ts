'use server'

import { getDb } from "@/drizzle/db";

import {
    unstable_cache as cache,
    unstable_noStore as noStore,
} from "next/cache"
import { Articles, MobileArticles, TechBrands } from "@/drizzle/schema";
import { and, asc, count, desc, eq, or } from "drizzle-orm";
import { paginationHelpers } from "@/app/api/shared/helpers";
import { likeInsensitive } from "@/utils/utils";
import { RecentArticleDataType } from "@/types/RecentArticle";

export async function getAllArticles({
    all, pages, limits, brands,
    showInNews,
    id,
    searchTerm,
    category,
    best_reviews,
    latestDevice,
    route,
    sub_categories,
    is_meta
}: {
    all?: boolean, pages?: string, limits?: string, searchTerm?: string, brands?: string, latestDevice?: string,
    best_reviews?: string, showInNews?: boolean, id?: string, category?: string, route?: string, sub_categories?: string, is_meta?: boolean
}){
    noStore();
    const cacheKey = `articles-${pages || '1'}-${limits || '10'}-${latestDevice || 'none1'}-${brands || 'none2'}-${showInNews ? "show" : 'none3'}-${searchTerm || 'none4'}-${best_reviews || 'none5'}-${category || 'none6'}-${all || 'none8'}-${route || 'none8'}-${sub_categories || 'none8'}-${is_meta || 'none8'}`;

    console.log('show in news with search conditions  IN TOP SEARCH  ', showInNews);
    return await cache(
        async () => {
            const db = await getDb();

            const options = {
                limit: parseInt(limits || '10', 10),
                page: parseInt(pages || '1', 10),
            };
            const { limit, skip } = paginationHelpers.calculatePagination(options);

            const whereConditions: any = [];

            if (showInNews === true) {
                // Only include articles that are meant to be shown in news
                const searchConditions = likeInsensitive(Articles["showInNews"], `%show%`);
                whereConditions.push(searchConditions);
            } else {
                // Build other conditions only if showInNews is not true
                if (category) {
                    const searchConditions = likeInsensitive(Articles["category"], `%${category}%`);
                    whereConditions.push(searchConditions);
                }
                if (sub_categories) {
                    const searchConditions = likeInsensitive(Articles["sub_categories"], `%${sub_categories}%`);
                    whereConditions.push(searchConditions);
                }
                if (route) {
                    const searchConditions = eq(Articles["route"], route);
                    whereConditions.push(searchConditions);
                }
                if (best_reviews) {
                    const searchConditions = likeInsensitive(Articles["best_reviews"], `%${best_reviews}%`);
                    whereConditions.push(searchConditions);
                }
                if (latestDevice) {
                    const searchConditions = likeInsensitive(Articles["latestDevice"], `%${latestDevice}%`);
                    whereConditions.push(searchConditions);
                }
                if (brands) {
                    const searchConditions = likeInsensitive(Articles["brands"], `%${brands}%`);
                    whereConditions.push(searchConditions);
                }
                if (searchTerm) {
                    const searchConditions = ['title', 'category', 'description'].map((field) =>
                        likeInsensitive((Articles as any)[field], `%${searchTerm}%`)
                    );
                    whereConditions.push(or(...searchConditions));
                }
            }

            const articlePosts: any =
                all ? await db
                    .select()
                    .from(Articles)
                    .where(and(...whereConditions))
                    .orderBy(desc(Articles.createdAt))
                    : await db
                        .select()
                        .from(Articles)
                        .where(and(...whereConditions))
                        .orderBy(desc(Articles.createdAt))
                        .offset(skip)
                        .limit(limit);

            const total = await db.select({
                count: count(),
            }).from(Articles).where(and(...whereConditions)).execute().then((res) => res[0].count)

            console.log(`articlePosts --> top search ---> ${showInNews}`, articlePosts)
            return is_meta ? { data: articlePosts, total: total } : articlePosts
        },
        [cacheKey],
        {
            revalidate: 300, // every 5 minutes
            tags: ["articles"],
        }
    )()
}
export async function getAllArticlesWithShowInNews({
    limits,
    pages,
    is_meta
}: {
    limits: string,
    pages?: string,
    is_meta?: boolean
}) {
    noStore();
    const cacheKey = `articles-show-in-news${is_meta ? '-meta data show' : ""}`;
    return await cache(
        async () => {
            const db = await getDb();

            const options = {
                limit: parseInt(limits || '10', 10),
                page: parseInt(pages || '1', 10),
            };
            const { limit, skip } = paginationHelpers.calculatePagination(options);

            const whereConditions: any = [];
            // Only include articles that are meant to be shown in news
            const searchConditions = likeInsensitive(Articles["showInNews"], `%show%`);
            whereConditions.push(searchConditions);

            const articlePosts: any = await db
                .select()
                .from(Articles)
                .where(and(...whereConditions))
                .orderBy(desc(Articles.createdAt))
                .offset(skip)
                .limit(limit);
            console.log(`articlePosts --> top search ---> `, articlePosts)

            const total = await db.select({
                count: count(),
            }).from(Articles).where(and(...whereConditions)).orderBy(desc(Articles.createdAt)).execute().then((res) => res[0].count)

            return is_meta ? { data: articlePosts, total: total } : articlePosts
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
            const total = await db
                .select({
                    count: count(),
                })
                .from(MobileArticles)
                .where(and(...whereConditions))
                .execute()
                .then((res) => res[0].count);
            return {
                data: mobileArticles,
                meta: {
                    total: total
                }
            }
        },
        [cacheKey],
        {
            revalidate: 300, // every 5 minutes
            tags: ["mobiles"],
        }
    )()
}

export async function getAllBrands({ pages, limits }: { pages?: string, limits?: string }) {
    const db = await getDb();
    return await cache(
        async () => {

            const options = {
                limit: parseInt(limits || '10', 10),
                page: parseInt(pages || '1', 10),
            };
            const { limit, skip } = paginationHelpers.calculatePagination(options);
            if (
                pages &&
                limits
            ) {
                return db
                    .select()
                    .from(TechBrands)
                    .orderBy(asc(TechBrands.createdAt))
                    .offset(skip)
                    .limit(limit);
            } else {
                return db
                    .select()
                    .from(TechBrands)
                    .orderBy(asc(TechBrands.createdAt))
            }
        },
        ["brands"],
        {
            revalidate: 3600, // every 5 minutes
            tags: ["brands"],
        }
    )()
}