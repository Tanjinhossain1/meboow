import Navbar from "@/Component/Shared/Navbar";
import { fetchBrands, fetchUsers } from "@/services/articleServices";
import React from "react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import UserList from "./_components/MainMobilelist";

export default async function Page() {
  const brands = await fetchUsers();

  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session?.user);
  const user: any = session?.user;
  console.log(session, "register  ", user);
  if (!user) redirect("/");
  if (user?.role !== "admin") {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <UserList user={user} users={brands.data} />
    </>
  );
}
