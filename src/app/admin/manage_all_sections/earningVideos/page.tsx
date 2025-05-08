import Navbar from "@/Component/Shared/Navbar";
import React from "react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchEarningVideos } from "@/services/articleServices";
import MainVideoDetailList from "./_components/MainVideolist";
import { VideoListUrlDataType } from "@/types/RecentArticle";

export default async function Page() {

  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session?.user);
  const user: any = session?.user;
  console.log(session, "register  ", user);
  if (!user) redirect("/");
  if (user?.role !== "admin" && user?.role !== "sub_admin") {
    redirect("/");
  }
  
    const data = await  fetchEarningVideos()
  return (
    <>
      <Navbar />
      <MainVideoDetailList articles={data?.data as VideoListUrlDataType[]}  user={user} />
    </>
  );
}
