import { getDb } from '@/drizzle/db';
import { NetworkBands } from '@/drizzle/schema';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { SitemapStream, streamToPromise } from 'sitemap';

export async function GET() {
    try {
        const db = await getDb();
        console.log(
            'connected to the db: get all networkBands ---> api/v1/networkBand/site-map'
        )
        const networkBands = await db
            .select()
            .from(NetworkBands)
            .orderBy(desc(NetworkBands.id))

        const sitemapStream = new SitemapStream({ hostname: process.env.NEXT_APP_SITEMAP_URL });
        sitemapStream.write({ url: `/network-bands`, lastmod: new Date() });
        networkBands.forEach((networkBand) => {
            sitemapStream.write({ url: `/network-bands/${networkBand?.country}`, lastmod: new Date() });
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
