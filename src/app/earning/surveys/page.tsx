import { redirect } from "next/navigation";
import { MainLayout } from "../dashboard/_component/main-layout";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export default async function SurveysPage() {
   const session = await getServerSession(authConfig);
    const user = session?.user;
  
    if (!user) redirect("/");
  return (
    <MainLayout user={user} activeTab="surveys">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Surveys</h1>
        <p className="mt-4">Complete surveys to earn money!</p>
      </div>
    </MainLayout>
  )
}
