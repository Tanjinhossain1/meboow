// app/sitemap-article/route.ts
import { getDb } from '@/drizzle/db';
import { Articles } from '@/drizzle/schema';
import { calculatePriority, formatForUrl } from '@/utils/utils';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { SitemapStream, streamToPromise } from 'sitemap';

export async function GET() {
    try {
        const db = await getDb();
        console.log(
            'connected to the db: get all articles ---> api/v1/article/all'
        )
        const articles = await db
            .select()
            .from(Articles)
            .orderBy(desc(Articles.id))

        const sitemapStream = new SitemapStream({ hostname: process.env.NEXT_APP_SITEMAP_URL });
        articles.forEach((article) => {
            if (article?.category === "Mobiles") {
                // Set priority for the main review URL
                const mainPriority = calculatePriority(article); // Example: calculate priority based on custom logic
        
                // Write the main article URL with priority
                sitemapStream.write({ 
                    url: `/review/${formatForUrl(article?.route!)}`, 
                    lastmod: new Date(),
                    priority: mainPriority // Add priority for main article
                });
        
                if (article?.pages) {
                    (article?.pages as any)?.map((page: any) => {
                        if (page?.page !== 1) {
                            // Set a lower priority for subsequent pages
                            const pagePriority = 0.6; // Example: lower priority for paginated content
        
                            // Write the paginated URLs with priority
                            sitemapStream.write({ 
                                url: `/review/${formatForUrl(article?.route!)}/${page?.page}`, 
                                lastmod: new Date(),
                                priority: pagePriority // Add priority for paginated pages
                            });
                        }
                    });
                }
            }
        });

        sitemapStream.end();

        const sitemapXml = await streamToPromise(sitemapStream).then((data) => data.toString());

        return new NextResponse(sitemapXml, {
            headers: {
                'Content-Type': 'application/xml',
            },
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return NextResponse.error();
    }
}