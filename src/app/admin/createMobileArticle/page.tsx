import React, { Fragment } from "react";
import { fetchBrands } from "@/services/articleServices";
import MainSubmitForm from "./_components/Forms/MainSubmitForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export default async function createMobileArticle() {
    
  const brands = await fetchBrands();
  // const session = await auth();
  
  const session = await getServerSession(authConfig);
  console.log(
    'this is the user  in app/page',session?.user
  )
  const user = session?.user;
  console.log(session, "register  ", user);
  if (!user) redirect("/");
  
  return (
    <Fragment>
      <MainSubmitForm brands={brands.data} />
    </Fragment>
  );
}
