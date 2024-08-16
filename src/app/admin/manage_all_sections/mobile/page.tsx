import React from "react";
import { fetchArticles, fetchMobileArticles } from "@/services/articleServices";
import Navbar from "@/Component/Shared/Navbar";
import MainMobilesDetailList from "./_components/MainMobilelist";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const Mobiles = await fetchMobileArticles({ is_all_mobile: true });

  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session?.user);
  const user: any = session?.user;
  console.log(session, "register  ", user);
  if (!user) redirect("/");
  if (user?.role !== "admin" && user?.role !== "sub_admin") {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <MainMobilesDetailList user={user} mobile={Mobiles.data} />
    </>
  );
}
