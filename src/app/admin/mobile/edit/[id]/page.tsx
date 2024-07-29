import MainSubmitForm from "@/app/admin/createMobileArticle/_components/Forms/MainSubmitForm";
import {
  fetchBrands,
  fetchMobileArticleDetails,
} from "@/services/articleServices";
import React, { Fragment } from "react";


export default async function page({ params }: { params: { id: string } }) {
  const mobileArticles = await fetchMobileArticleDetails({ id: params?.id });
  const brands = await fetchBrands();

  return (
    <Fragment>
      <MainSubmitForm
        isEdit={{
            isEdit: true,
          mobileArticles: mobileArticles.data,
        }}
        brands={brands.data}
      />
    </Fragment>
  );
}
