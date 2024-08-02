import { fetchBrands, fetchCategories } from "@/services/articleServices";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const CreateArticleComponent = dynamic(
  () => import("@/Component/Admin/CreateArticleComponent"),
  { ssr: false }
);


export default async function CreateArticle() {
  const categories = await fetchCategories();
  const brands = await fetchBrands();
  // console.log("categories   ", categories);
  return (
    <Suspense>
      <CreateArticleComponent brandsData={brands.data} categories={categories.data} />
    </Suspense>
  );
}
