// app/sitemap-article/route.ts
import { getDb } from '@/drizzle/db';
import { MobileArticles } from '@/drizzle/schema';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { SitemapStream, streamToPromise } from 'sitemap';

export async function GET() {
    try {
        const db = await getDb();
        console.log(
            'connected to the db: get all Mobile xml ---> api/v1/article/all'
        )
        const mobiles = await db
            .select()
            .from(MobileArticles)
            .orderBy(desc(MobileArticles.id))

        const sitemapStream = new SitemapStream({ hostname: process.env.NEXT_APP_SITEMAP_URL });
        mobiles.forEach((mobile) => { 
            sitemapStream.write({ url: `/mobile/detail/${mobile.id}`, lastmod: new Date() });
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
