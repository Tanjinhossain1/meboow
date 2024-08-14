import React from 'react';
import MainArticlesDetailList from './_components/MainArticleslist';
import { fetchArticles } from '@/services/articleServices';
 
export default async function Page() {
  const articles = await fetchArticles({allArticles:true})
  return (
     <MainArticlesDetailList articles={articles.data} />
  );
}
