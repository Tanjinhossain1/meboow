import React from 'react';
import MainArticlesDetailList from './_components/MainArticleslist';
import { fetchArticles } from '@/services/articleServices';
import Navbar from '@/Component/Shared/Navbar';
 
export default async function Page() {
  const articles = await fetchArticles({allArticles:true})
  return (
    <>
    <Navbar />
     <MainArticlesDetailList articles={articles.data} />
    </>
  );
}
