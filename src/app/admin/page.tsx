
import React from "react";
import Dashboard from "./_components/Dashboard";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

const AdminPage = async () => {
  // const router = useRouter();

    // const session = await auth();
    
  const session = await getServerSession(authConfig);
  console.log(
    'this is the user  in app/page',session?.user
  )
    const user = session?.user;
  
  return (
    <Dashboard user={user} />
  );
};

export default AdminPage;
