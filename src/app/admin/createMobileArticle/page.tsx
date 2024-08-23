import React, { Fragment } from "react";
import { fetchArticles, fetchBrands } from "@/services/articleServices";
import MainSubmitForm from "./_components/Forms/MainSubmitForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import Footer from "@/Component/HomePage/Footer";
import DesktopViewToggle from "@/components/DesktopViewToggle";

export default async function createMobileArticle() {
    
  const brands = await fetchBrands();
  // const session = await auth();
  const session = await getServerSession(authConfig);
  console.log(
    'this is the user  in app/page',session?.user
  )
  const user:any = session?.user;
  console.log(session, "register  ", user);
  if (!user) redirect("/");
 if ( user?.role !== "admin" && user?.role !== "sub_admin") {
    redirect("/");
  }
  return (
    <Fragment>
      <MainSubmitForm user={user} brands={brands.data} />
      <br />
      <br />
      <br />
      <DesktopViewToggle />
    </Fragment>
  );
}
