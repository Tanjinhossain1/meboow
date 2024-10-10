'use client';
import { FollowerOrderParams } from "@/types/order";
import dynamic from "next/dynamic";
import React, { Fragment, useState } from "react";
import { CreateReturnType } from "./NewOrder";

const NewOrderForm = dynamic(() => import("./NewOrderForm"), {
  ssr: false,
});
const CategoryButtons = dynamic(() => import("./CategoryButtons"), {
  ssr: false,
});

export default function ParentShortCompo({ response,createOrder }: { response: any,createOrder:(data: FollowerOrderParams)=>Promise<CreateReturnType> }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Fragment>
      <CategoryButtons
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />
      <NewOrderForm createOrder={createOrder} selectedCategoryFromTop={selectedCategory} servicesOrCategories={response} />
    </Fragment>
  );
}
