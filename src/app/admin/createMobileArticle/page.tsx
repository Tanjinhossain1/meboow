import React, { Fragment } from "react";
import { fetchBrands } from "@/services/articleServices";
import MainSubmitForm from "./_components/Forms/MainSubmitForm";

export default async function createMobileArticle() {
    
  const brands = await fetchBrands();

  return (
    <Fragment>
      <MainSubmitForm brands={brands.data} />
    </Fragment>
  );
}
