// app/sitemap-article/route.ts
import { getDb } from '@/drizzle/db';
import { MobileArticles, TechBrands } from '@/drizzle/schema';
import { formatForUrlWith_under_score } from '@/utils/utils';
import { count, desc } from 'drizzle-orm';
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

            const total = await db
            .select({
              count: count(),
            })
            .from(MobileArticles)
            .execute()
            .then((res) => res[0].count);

        const sitemapStream = new SitemapStream({ hostname: process.env.NEXT_APP_SITEMAP_URL });
        const totalPage = Math.ceil(total / 50)
        brands.forEach((brand) => {
            sitemapStream.write({ url: `/mobile/brand-wise/${formatForUrlWith_under_score(brand?.title)}`, lastmod: new Date() });
            for (let i = 1; i <= totalPage; i++) {
                sitemapStream.write({ url: `/mobile/brand-wise/${formatForUrlWith_under_score(brand?.title)}/page/${i}`, lastmod: new Date() });
            }
        })
        // Math.ceil(response.data.meta.total / limit)
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
