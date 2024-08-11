import Navbar from '@/Component/Shared/Navbar'
import React, { Fragment } from 'react'
import BrandWiseDetails from './_components/BrandWiseDetails'
import { fetchArticles, fetchMobileArticles } from '@/services/articleServices';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';
import Footer from '@/Component/HomePage/Footer';

export default async function page({ params }: { params: { brand: string } }) {
  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session);
  const user = session?.user;
  
  const mobileArticles = await fetchMobileArticles({ page:"1",limit: "20",brands:params?.brand });
  return (
   <Fragment>
    <Navbar />
    <BrandWiseDetails   mobileArticles={mobileArticles.data} />
    <Footer />
   </Fragment>
  )
}
