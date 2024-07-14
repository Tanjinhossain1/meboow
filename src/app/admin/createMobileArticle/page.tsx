import React, { Fragment } from "react";
import { fetchBrands } from "@/services/articleServices";
import MainSubmitForm from "./_components/Forms/MainSubmitForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function createMobileArticle() {
    
  const brands = await fetchBrands();
  const session = await auth();
  const user = session?.user;
  console.log(session, "register  ", user);
  if (!user) redirect("/");
  
  return (
    <Fragment>
      <MainSubmitForm brands={brands.data} />
    </Fragment>
  );
}
