// app/sitemap-article/route.ts
import { getDb } from '@/drizzle/db';
import { Category } from '@/drizzle/schema';
import { formatForUrlWith_under_score } from '@/utils/utils';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { SitemapStream, streamToPromise } from 'sitemap';

export async function GET() {
    try {
        const db = await getDb();
        console.log(
            'connected to the db: get all categories ---> api/v1/category/site-map'
        )
        const categories = await db
            .select()
            .from(Category)
            .orderBy(desc(Category.id))

        const sitemapStream = new SitemapStream({ hostname: process.env.NEXT_APP_SITEMAP_URL });
        categories.forEach((category) => {
            sitemapStream.write({ url: `/category/${formatForUrlWith_under_score(category?.title)}`, lastmod: new Date() });
            if((category?.sub_categories as any)?.length > 0) {
                (category?.sub_categories as any)?.map((sub_category:any) => {
                    sitemapStream.write({ url: `/category/${formatForUrlWith_under_score(category?.title)}/${formatForUrlWith_under_score(sub_category?.title)}`, lastmod: new Date() });
                })
            }
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
