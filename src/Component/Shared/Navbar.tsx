import React, { lazy } from "react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

const NavbarHelper = lazy(() => import("./NavbarHelperComponent"));

async function Navbar() {
  const session = await getServerSession(authConfig);
  const user = session?.user;

  return (  
   <NavbarHelper isLoginUser={user ? user : undefined}  /> 
  );
}
export default Navbar;
