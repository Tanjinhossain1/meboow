import { authConfig } from "@/lib/auth";
import {
  fetchArticlesDetails,
  fetchBrands,
  fetchCategories,
} from "@/services/articleServices";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
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
  
  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session?.user);
  const user: any = session?.user;
  console.log(session, "register  ", user);
  if (!user) redirect("/");
  if (user?.role !== "admin" && user?.role !== "sub_admin") {
    redirect("/");
  }
  return (
    <Suspense>
      <CreateArticleComponent
      user={user}
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
