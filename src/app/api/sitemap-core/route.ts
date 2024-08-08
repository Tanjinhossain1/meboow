// app/sitemap-article/route.ts
import { getDb } from '@/drizzle/db';
import { MobileArticles } from '@/drizzle/schema';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { SitemapStream, streamToPromise } from 'sitemap';

export async function GET() {
    try {
        const sitemapStream = new SitemapStream({ hostname: process.env.NEXT_APP_SITEMAP_URL });

        sitemapStream.write({ url: `/aboutus`, lastmod: new Date() });
        sitemapStream.write({ url: `/contactUs`, lastmod: new Date() });
        sitemapStream.write({ url: `/privacyPolicy`, lastmod: new Date() });
        sitemapStream.write({ url: `/termCondition`, lastmod: new Date() });


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
