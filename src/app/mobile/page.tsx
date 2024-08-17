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
 
    const title = `mobiles `
    const desc = `Here will show All mobiles and specifications this mobile is this you can see all of details of this phone.`;
    const previousImages = (await parent).openGraph?.images || [];
    // const image = mobileArticles?.data[0]?.display_image;
    return {
      title: title,
      description: desc,

      openGraph: {
        images: [...previousImages],
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
