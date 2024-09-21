import React from "react";
import Navbar from "@/Component/Shared/Navbar";
import MainMobilesDetailList from "./_components/MainMobilelist";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authConfig);
  const user: any = session?.user;
  if (!user) redirect("/");
  if (user?.role !== "admin" && user?.role !== "sub_admin") {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <MainMobilesDetailList user={user} />
    </>
  );
}
