import Navbar from "@/Component/Shared/Navbar";
import { fetchBrands } from "@/services/articleServices";
import React from "react";
import MainBrandsList from "./_components/MainMobilelist";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
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
    <>
      <Navbar />
      <MainBrandsList user={user} brands={brands.data} />
    </>
  );
}
