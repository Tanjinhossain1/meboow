
import React from "react";
import Dashboard from "./_components/Dashboard";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import dynamic from "next/dynamic";

const NavbarHelper = dynamic(() => import("@/Component/Shared/NavbarHelperComponent"), {
  ssr: true, // or true, based on whether you want SSR support
});
const Footer = dynamic(() => import("@/Component/HomePage/Footer"), {
  ssr: true,
});
const AdminPage = async () => {
  const session = await getServerSession(authConfig);
    const user = session?.user;
  
  return (
    <>
    <NavbarHelper isLoginUser={user} />
    <Dashboard user={user} />
    <Footer />
    </>
  );
};

export default AdminPage;
