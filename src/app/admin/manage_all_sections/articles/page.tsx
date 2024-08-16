import React from "react";
import MainArticlesDetailList from "./_components/MainArticleslist";
import { fetchArticles } from "@/services/articleServices";
import Navbar from "@/Component/Shared/Navbar";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const articles = await fetchArticles({ allArticles: true });

  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session?.user);
  const user: any = session?.user;
  console.log(session, "register  ", user);
  if (!user) redirect("/");
 if ( user?.role !== "admin" && user?.role !== "sub_admin") {
    redirect("/");
  }
  // if(user?.role !== "admin" || user?.role !== "sub_admin") {
  //   redirect("/");
  // }
  return (
    <>
      <Navbar />
      <MainArticlesDetailList user={user} articles={articles.data} />
    </>
  );
}
