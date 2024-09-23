import React, { Suspense } from "react";
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
    <Suspense fallback={<p>Loading....</p>}>
      <NavbarHelper isLoginUser={user ? user : undefined} />
    </Suspense>
  );
}
export default Navbar;
