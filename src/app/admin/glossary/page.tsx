import { authConfig } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import CreateGlossary from './_components/CreateGlossary';

export default async function page() {
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
    <CreateGlossary user={user}  />
   </>
  )
}
