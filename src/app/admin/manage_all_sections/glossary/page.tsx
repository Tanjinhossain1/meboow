import Navbar from "@/Component/Shared/Navbar";
import { fetchGlossary } from "@/services/articleServices";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "@/lib/auth";
import MainNetworkList from "./_components/MainMobilelist";

export default async function Page() {
  const glossary = await fetchGlossary({})

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
      <MainNetworkList user={user} glossary={glossary.data} />
    </>
  );
}
