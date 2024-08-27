import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { fetchNetworkBands } from "@/services/articleServices";
import CreateNetworkBands from "../../_components/CreateNetworkBands";

export default async function page({ params }: { params: { id: string } }) {
  const networkBands = await fetchNetworkBands({ id: params?.id });
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
      <CreateNetworkBands isEdit={{
        isEdit:true,
        networkBandsDetails:networkBands?.data[0]
      }} networkBands={networkBands.data} user={user} />
    </>
  );
}
