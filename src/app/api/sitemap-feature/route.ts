// app/sitemap-article/route.ts
import { NextResponse } from 'next/server';
import { SitemapStream, streamToPromise } from 'sitemap';

export async function GET() {
    try {
        const sitemapStream = new SitemapStream({ hostname: process.env.NEXT_APP_SITEMAP_URL });

        sitemapStream.write({ url: `/news`, lastmod: new Date() });
        sitemapStream.write({ url: `/brands`, lastmod: new Date() });
        sitemapStream.write({ url: `/mobile`, lastmod: new Date() });
        sitemapStream.write({ url: `/search`, lastmod: new Date() });
        sitemapStream.write({ url: `/register`, lastmod: new Date() });
        sitemapStream.write({ url: `/login`, lastmod: new Date() });


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
