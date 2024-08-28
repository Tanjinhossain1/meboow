import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { fetchGlossary, fetchNetworkBands } from "@/services/articleServices";
import CreateGlossary from "../../_components/CreateGlossary";

export default async function page({ params }: { params: { id: string } }) {
  const glossary = await fetchGlossary({ id: params?.id });
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
      <CreateGlossary isEdit={{
        isEdit:true,
        glossaryDetails:glossary?.data[0]
      }}  user={user} />
    </>
  );
}
