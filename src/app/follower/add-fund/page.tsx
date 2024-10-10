import React from "react";
import RootLayout from "../_components/RootLayout";
import ParentComponent from "./_components/ParentComponent";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async  function page() {
  const session = await getServerSession(authConfig);
  const user:any = session?.user;
  if(!user?.email) redirect('/login?follower=follow');
  return (
    <RootLayout addFunds>
      <ParentComponent   user={user} />
    </RootLayout>
  );
}
