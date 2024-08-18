import Navbar from '@/Component/Shared/Navbar'
import React, { Fragment } from 'react'
import { fetchArticles, fetchBrands, fetchCategories, fetchMobileArticles } from '@/services/articleServices';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';
import Footer from '@/Component/HomePage/Footer';
import MobileDetails from './_components/MobileDetails';
import { Metadata, ResolvingMetadata } from 'next';


export async function generateMetadata(
  { params }: { params: { brand: string } },
  parent: ResolvingMetadata
): Promise<Metadata | undefined> {
 
    const title = `Mobiles - Safari List`
    const desc = `In Safari List You will show All Mobiles and specifications this mobile is this you can see all of details of this mobile. ${title}`;
    const previousImages = (await parent).openGraph?.images || [];
    // const image = mobileArticles?.data[0]?.display_image;
    return {
      title: title,
      description: desc,
      keywords: ['Article', 'Safari List', 'article', 'have', 'mobile', title],
      openGraph: {
        title: title,
        description: desc,
        url: `${process.env.NEXT_APP_CANONICAL_URL}/mobile`,
        siteName: 'Safari List',
        type: 'website',
        images: [...previousImages],
      }, 
      alternates: {
        canonical: `${process.env.NEXT_APP_CANONICAL_URL}/mobile`,
      },
    };
  
}

export default async function page() {
 
    const brands = await fetchBrands();
    const mobileArticles = await fetchMobileArticles({page:'1',limit:'20'});
    const Category = await fetchCategories();
  return (
   <Fragment>
    <Navbar />
    <MobileDetails brands={brands?.data} mobileArticles={mobileArticles.data} category={Category.data}  />
    <Footer />
   </Fragment>
  )
}
