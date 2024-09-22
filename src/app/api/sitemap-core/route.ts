// app/sitemap-article/route.ts
import { getDb } from '@/drizzle/db';
import { MobileArticles } from '@/drizzle/schema';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { SitemapStream, streamToPromise } from 'sitemap';

export async function GET() {
    try {
        const sitemapStream = new SitemapStream();
        // const sitemapStream = new SitemapStream({ hostname: process.env.NEXT_APP_SITEMAP_URL });

        sitemapStream.write({ url: `${process.env.NEXT_APP_SITEMAP_URL}/`, changefreq: "hourly", priority: 0.8 });
        sitemapStream.write({ url: `${process.env.NEXT_APP_SITEMAP_URL}/aboutus`, changefreq: "hourly", priority: 0.6 });
        sitemapStream.write({ url: `${process.env.NEXT_APP_SITEMAP_URL}/about`, changefreq: "hourly", priority: 0.7 });
        sitemapStream.write({ url: `${process.env.NEXT_APP_SITEMAP_URL}/contactUs`, changefreq: "hourly", priority: 0.7 });
        sitemapStream.write({ url: `${process.env.NEXT_APP_SITEMAP_URL}/contact`, changefreq: "hourly", priority: 0.7 });
        sitemapStream.write({ url: `${process.env.NEXT_APP_SITEMAP_URL}/privacyPolicy`, changefreq: "hourly", priority: 0.5 });
        sitemapStream.write({ url: `${process.env.NEXT_APP_SITEMAP_URL}/privacy-policy`, changefreq: "hourly", priority: 0.8 });
        sitemapStream.write({ url: `${process.env.NEXT_APP_SITEMAP_URL}/terms-and-conditions`, changefreq: "hourly", priority: 0.8 });
        sitemapStream.write({ url: `${process.env.NEXT_APP_SITEMAP_URL}/faq`, changefreq: "hourly", priority: 0.8 });


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
