
import React from "react";
import Dashboard from "./_components/Dashboard";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import Footer from "@/Component/HomePage/Footer";
import Navbar from "@/Component/Shared/Navbar";

const AdminPage = async () => {
  // const router = useRouter();

    // const session = await auth();
    
  const session = await getServerSession(authConfig);
  console.log(
    'this is the user  in app/page',session?.user
  )
    const user = session?.user;
  
  return (
    <>
    <Navbar />
    <Dashboard user={user} />
    <Footer />
    </>
  );
};

export default AdminPage;
