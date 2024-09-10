// app/sitemap-article/route.ts
import { getDb } from '@/drizzle/db';
import { TechBrands } from '@/drizzle/schema';
import { formatForUrlWith_under_score } from '@/utils/utils';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { SitemapStream, streamToPromise } from 'sitemap';

export async function GET() {
    try {
        const db = await getDb();
        console.log(
            'connected to the db: get all brands ---> api/v1/brand/site-map'
        )
        const brands = await db
            .select()
            .from(TechBrands)
            .orderBy(desc(TechBrands.id))

        const sitemapStream = new SitemapStream({ hostname: process.env.NEXT_APP_SITEMAP_URL });
        brands.forEach((brand) => {
            sitemapStream.write({ url: `/mobile/brand-wise/${formatForUrlWith_under_score(brand?.title)}`, lastmod: new Date() });
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
