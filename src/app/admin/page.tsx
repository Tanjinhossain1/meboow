
import React from "react";
import { auth } from "@/auth";
import Dashboard from "./_components/Dashboard";

const AdminPage = async () => {
  // const router = useRouter();

    const session = await auth();
    const user = session?.user;
  
  return (
    <Dashboard user={user} />
  );
};

export default AdminPage;
