import {
  fetchArticlesDetails,
  fetchBrands,
  fetchCategories,
} from "@/services/articleServices";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const CreateArticleComponent = dynamic(
  () => import("@/Component/Admin/CreateArticleComponent"),
  { ssr: false }
);

export default async function EditArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const categories = await fetchCategories();
  const brands = await fetchBrands();
  const data = await fetchArticlesDetails({ id: params?.id });
  console.log("categories   ", categories);
  return (
    <Suspense>
      <CreateArticleComponent
        isEdit={{
          articleDetail: data.data[0],
          isEdit: true,
        }}
        brandsData={brands.data}
        categories={categories.data}
      />
    </Suspense>
  );
}
