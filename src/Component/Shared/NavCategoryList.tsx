import React, { Fragment } from "react";
import { CategoryTypes } from "@/types/category"; 

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from "next/link";
import { formatForUrlWith_under_score } from "@/utils/utils";

export default function Navbar({
  categories,
}: {
  categories: CategoryTypes[];
}) {
  return (
    <Fragment>
      {categories.map((category) => {
        return (
          <HoverCard key={category?.id} openDelay={0} closeDelay={0}>
            <HoverCardTrigger style={{ margin: 0, padding: 0 }} asChild>
              <Link className="text-white" href={`/category/${formatForUrlWith_under_score(category?.title)}`} style={{ margin: 0, padding: 0 }} >
                {category?.title}
                {
                    category?.sub_categories?.length > 0 ?
                <KeyboardArrowDownIcon />
                :null}
              </Link>
            </HoverCardTrigger>
            {
                category?.sub_categories?.length > 0 ?
                <HoverCardContent className="bg-[#023359]">
              <div >
                {" "}
                {category?.sub_categories?.map((subCategory, index) => (
                    <Link
                    href={`/category/${formatForUrlWith_under_score(category?.title)}/${formatForUrlWith_under_score(subCategory?.title)}`}
                    key={index}
                    className="hover:text-red-400 hover:underline px-2 py-1 rounded cursor-pointer text-white"
                    >
                    {subCategory.title}
                  </Link>
                ))}
              </div>
            </HoverCardContent>
        :null}
          </HoverCard>
        );
      })}
    </Fragment>
  );
}
