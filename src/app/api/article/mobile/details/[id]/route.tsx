import { getDb } from "@/drizzle/db";
import { MobileArticles } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request,{ params }: { params: { id: string } }) {
    try {  
        const db = await getDb();
        const data = await db.select().from(MobileArticles).where(eq(MobileArticles.id, Number(params?.id)))

    const parsedArticles = data.map((article:any) => ({
        ...article,
        // key_specifications: JSON.parse(article.key_specifications),
        // image: JSON.parse(article.image),
        
        //     physicalSpecification: JSON.parse(article?.physicalSpecification),
        //     network: JSON.parse(article?.network),
        //     display: JSON.parse(article?.display),
        //     processor: JSON.parse(article?.processor),
        //     memory: JSON.parse(article?.memory),
        //     mainCamera: JSON.parse(article?.mainCamera),
        //     selfieCamera: JSON.parse(article?.selfieCamera),
        //     os: JSON.parse(article?.os),
        //     connectivity: JSON.parse(article?.connectivity),
        //     features: JSON.parse(article?.features),
        //     battery: JSON.parse(article?.battery),
        //     details: JSON.parse(article?.details),
        //     prices: JSON.parse(article?.prices),
        //     expert_view: JSON.parse(article?.expert_view),

        // parse other JSON fields as needed
      }));

        return NextResponse.json({
            statusCode: 200,
            success: true,
            message: 'Get Details Article successfully', 
            data:parsedArticles,
        })
    } catch (error) {
        console.error('Error fetching Mobile Articles:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
