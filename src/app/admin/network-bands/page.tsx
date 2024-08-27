import { authConfig } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import CreateNetworkBands from './_components/CreateNetworkBands';
import { fetchNetworkBands } from '@/services/articleServices';

export default async function page() {
    const networkBands = await fetchNetworkBands({})
    const session = await getServerSession(authConfig);
    console.log("this is the user  in app/page", session?.user);
    const user: any = session?.user;
    console.log(session, "register  ", user);
    if (!user) redirect("/");
    if (user?.role !== "admin" && user?.role !== "sub_admin") {
      redirect("/");
    }
  return (
   <>
    <CreateNetworkBands networkBands={networkBands.data} user={user}  />
   </>
  )
}
