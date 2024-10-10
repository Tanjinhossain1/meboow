import React from "react";
import RootLayout from "./_components/RootLayout";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";

const NewOrder = dynamic(() => import("./_components/NewOrder"), {
  ssr: true,
});

export default async function page() {
  const session = await getServerSession(authConfig);
  const user:any = session?.user;
  if(!user?.email) redirect('/login?follower=follow')
  return (
    <RootLayout isNewOrder>
      <NewOrder user={user} />
    </RootLayout>
  );
}
