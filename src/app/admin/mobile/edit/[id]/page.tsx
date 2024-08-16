import MainSubmitForm from "@/app/admin/createMobileArticle/_components/Forms/MainSubmitForm";
import { authConfig } from "@/lib/auth";
import {
  fetchBrands,
  fetchMobileArticleDetails,
} from "@/services/articleServices";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Fragment } from "react";

export default async function page({ params }: { params: { id: string } }) {
  const mobileArticles = await fetchMobileArticleDetails({ id: params?.id });
  const brands = await fetchBrands();

  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session?.user);
  const user: any = session?.user;
  console.log(session, "register  ", user);
  if (!user) redirect("/");
  if (user?.role !== "admin" && user?.role !== "sub_admin") {
    redirect("/");
  }
  return (
    <Fragment>
      <MainSubmitForm
        isEdit={{
          isEdit: true,
          mobileArticles: mobileArticles.data,
        }}
        brands={brands.data}
        user={user}
      />
    </Fragment>
  );
}
