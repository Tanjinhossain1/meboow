import Navbar from '@/Component/Shared/Navbar'
import React, { Fragment } from 'react'
import { fetchArticles, fetchBrands, fetchCategories, fetchMobileArticles } from '@/services/articleServices';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';
import Footer from '@/Component/HomePage/Footer';
import MobileDetails from './_components/MobileDetails';

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
