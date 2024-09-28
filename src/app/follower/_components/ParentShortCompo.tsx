'use client';
import dynamic from "next/dynamic";
import React, { Fragment, useState } from "react";

const NewOrderForm = dynamic(() => import("./NewOrderForm"), {
  ssr: false,
});
const CategoryButtons = dynamic(() => import("./CategoryButtons"), {
  ssr: false,
});

export default function ParentShortCompo({ response }: { response: any }) {
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
      <NewOrderForm selectedCategoryFromTop={selectedCategory} servicesOrCategories={response} />
    </Fragment>
  );
}
