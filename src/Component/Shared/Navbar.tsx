import React from "react";
import { fetchCategories } from "@/services/articleServices";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import dynamic from "next/dynamic";

const NavbarHelper = dynamic(() => import("./NavbarHelperComponent"), {
  suspense: true,
  ssr: false, // or true, based on whether you want SSR support
});

async function Navbar() {
  const session = await getServerSession(authConfig);
  const user = session?.user;

  return (  
   <NavbarHelper isLoginUser={user ? user : undefined}  /> 
  );
}
export default Navbar;
