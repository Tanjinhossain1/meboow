import { getDb } from '@/drizzle/db';
import { Glossary } from '@/drizzle/schema';
import { formatForUrlWith_under_score } from '@/utils/utils';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { SitemapStream, streamToPromise } from 'sitemap';

export async function GET() {
    try {
        const db = await getDb();
        console.log(
            'connected to the db: get all Glossary ---> api/v1/networkBand/site-map'
        )
        const glossary = await db
            .select()
            .from(Glossary)
            .orderBy(desc(Glossary.id))

        const sitemapStream = new SitemapStream({ hostname: process.env.NEXT_APP_SITEMAP_URL });
        sitemapStream.write({ url: `/glossary`, lastmod: new Date() });
        glossary.forEach((glossaries) => {
            sitemapStream.write({ url: `/glossary/${formatForUrlWith_under_score(glossaries?.route)}`, lastmod: new Date() });
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
