import React, { lazy } from "react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import dynamic from "next/dynamic";
import { fetchCategories } from "@/services/articleServices";

const NavbarHelper = dynamic(() => import("./NavbarHelperComponent"), {
  ssr: true, // or true, based on whether you want SSR support
});

async function Navbar() {
  const categories = await fetchCategories();
  const session = await getServerSession(authConfig);
  const user = session?.user;

  return (
      <NavbarHelper categories={categories?.data} isLoginUser={user ? user : undefined} />
  );
}
export default Navbar;
