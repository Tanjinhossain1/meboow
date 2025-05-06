import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import UploadVideoComponent from "./_component/EaringUrlForm";

export default async function CreateArticle() {
  const session = await getServerSession(authConfig);
  console.log("this is the user  in app/page", session?.user);
  const user: any = session?.user;
  console.log(session, "register  ", user);
  if (!user) redirect("/");
  if (user?.role !== "admin" && user?.role !== "sub_admin") {
    redirect("/");
  }
  return (
    <Suspense>
      <UploadVideoComponent />
    </Suspense>
  );
}
