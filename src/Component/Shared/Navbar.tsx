import React, { lazy } from "react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import dynamic from "next/dynamic";

const NavbarHelper = dynamic(() => import("./NavbarHelperComponent"), {
  ssr: false, // or true, based on whether you want SSR support
});

async function Navbar() {
  const session = await getServerSession(authConfig);
  const user = session?.user;

  return (
      <NavbarHelper isLoginUser={user ? user : undefined} />
  );
}
export default Navbar;
