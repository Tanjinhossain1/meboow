
import Navbar from '@/Component/Shared/Navbar';
import { fetchArticles, fetchGlossaryList } from '@/services/articleServices';
import { Metadata, ResolvingMetadata } from 'next';
import React from 'react'
import Footer from '@/Component/HomePage/Footer';
import MainComponent from './[route]/_components/MainComponent';


export async function generateMetadata(
    { params }: { params: { route: string } },
    parent: ResolvingMetadata
  ): Promise<Metadata | undefined> {
  
      const title = `Mobile terms glossary - Glossary`;
      const desc = `Here will show this MObile Terms Glossary Details. ${title} show of details in this properly.`;
      const previousImages = (await parent).openGraph?.images || [];
  
      return {
        title: title,
        description: desc,
        keywords: [
          "Glossary",
          "Safari List",
          "details",
          title,
        ],
        openGraph: {
          title: title,
          description: desc,
          url: `${process.env.NEXT_APP_CANONICAL_URL}/glossary`,
          siteName: "Safari List",
          type: "website",
          images: [...previousImages],
        },
        alternates: {
          canonical: `${process.env.NEXT_APP_CANONICAL_URL}/glossary`,
        },
      };
    
  }

export default async function page({ params }: { params: { route: string } }) {
 
    const glossaryList = await fetchGlossaryList({isList:true});

    
  const MobilesArticles = await fetchArticles({
    limit:'10',
    category: "Mobiles",
  });

  return (
   <>
   <Navbar />
   <MainComponent glossaryList={glossaryList.data} latestArticles={MobilesArticles?.data} />
   <Footer />
   </>
  )
}