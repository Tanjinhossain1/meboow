// app/sitemap-article/route.ts
import { getDb } from '@/drizzle/db';
import { Articles } from '@/drizzle/schema';
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
            const joinTitle = article.title
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join("-");
            sitemapStream.write({ url: `/details/${article.id}/${article.category}/${joinTitle}`, lastmod: new Date() });
        })
        
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
