import React from "react";
import NavbarHelper from "./NavbarHelperComponent";
import { fetchCategories } from "@/services/articleServices";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";


async function Navbar() {
  // const session = await auth();
  
  const session = await getServerSession(authConfig);
  console.log(
    'this is the user  in app/page',session?.user
  )
  const user = session?.user;
  console.log(session, "register  ", session,user);
   

  const Category = await fetchCategories();
  return (  
   <NavbarHelper category={Category?.data} isLoginUser={user ? user : undefined}  /> 
  );
}
export default Navbar;
