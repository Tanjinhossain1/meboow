// app/sitemap-article/route.ts
import { getDb } from '@/drizzle/db';
import { Articles, MobileArticles } from '@/drizzle/schema';
import { MobileTagsType } from '@/types/mobiles';
import { formatForUrlWith_under_score } from '@/utils/utils';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { SitemapStream, streamToPromise } from 'sitemap';

export async function GET() {
    try {
        const db = await getDb();
        console.log(
            'connected to the db: get all Mobile xml ---> api/v1/sitemap-tags'
        )
        const mobiles = await db
            .select()
            .from(MobileArticles)
            .orderBy(desc(MobileArticles.id))
        const articles = await db
            .select()
            .from(Articles)
            .orderBy(desc(Articles.id))

        const sitemapStream = new SitemapStream({ hostname: process.env.NEXT_APP_SITEMAP_URL });
        const processedTags = new Set<string>(); // To keep track of unique tag names

        mobiles.forEach((mobile) => {
            if (mobile?.tags) {
                (mobile?.tags as any[])?.forEach((tag: MobileTagsType) => {
                    if (tag?.name) {
                        const formattedTag = formatForUrlWith_under_score(tag.name);
                        if (!processedTags.has(formattedTag)) { // Check if the tag is already processed
                            sitemapStream.write({ 
                                url: `/search?search=${formattedTag}`, 
                                lastmod: new Date(), 
                                priority: 0.9 
                            });
                            processedTags.add(formattedTag); // Mark this tag as processed
                        }
                    }
                });
            }
        });
        
        articles.forEach((mobile) => {
            if (mobile?.tags) {
                (mobile?.tags as any[])?.forEach((tag: MobileTagsType) => {
                    if (tag?.name) {
                        const formattedTag = formatForUrlWith_under_score(tag.name)
                        if (!processedTags.has(formattedTag)) { // Check if the tag is already processed
                            sitemapStream.write({ 
                                url: `/search?search=${formattedTag}`, 
                                lastmod: new Date(), 
                                priority: 0.9 
                            });
                            processedTags.add(formattedTag); // Mark this tag as processed
                        }
                    }
                });
            }
        });
        
        // mobiles.forEach((mobile) => {
        //     if(mobile?.tags){
        //         (mobile?.tags as any[])?.forEach((tag:MobileTagsType) => {
        //             if(tag?.name){
        //                 sitemapStream.write({ url: `/search?search=${formatForUrlWith_under_score(tag?.name)}`, lastmod: new Date(),priority:0.9 });
        //             }
        //         });
        //     }
        // })
        // articles.forEach((mobile) => {
        //     if(mobile?.tags){
        //         (mobile?.tags as any[])?.forEach((tag:MobileTagsType) => {
        //             if(tag?.name){
        //                 sitemapStream.write({ url: `/search?search=${formatForUrlWith_under_score(tag?.name)}`, lastmod: new Date(),priority:0.9 });
        //             }
        //         });
        //     }
        // })

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
