import Navbar from "@/Component/Shared/Navbar";
import React from "react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import { withdrawRequest } from "@/services/articleServices";
import WithdrawalList from "./_components/MainVideolist";
import { WithdrawRequestDataType } from "@/types/RecentArticle";

export default async function Page() {

  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session?.user);
  const user: any = session?.user;
  console.log(session, "register  ", user);
  if (!user) redirect("/");
  if (user?.role !== "admin" && user?.role !== "sub_admin") {
    redirect("/");
  }
  
    const data = await  withdrawRequest();
  return (
    <>
      <Navbar />
      <WithdrawalList articles={data?.data as WithdrawRequestDataType[]}  user={user} />
    </>
  );
}
