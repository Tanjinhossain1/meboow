import { redirect } from "next/navigation";
import { MainLayout } from "../dashboard/_component/main-layout";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import UserInformation from "./_component/InformationComponent";
import { fetchEarningWatchedVideos } from "@/services/articleServices";

export default async function ProfilePage() {
   const session = await getServerSession(authConfig);
    const user = session?.user;
  
    if (!user) redirect("/");
      const watchedData = await  fetchEarningWatchedVideos({email: user?.email as string})
  return (
    <MainLayout user={user} activeTab="profile">
      <div className="p-6">
        <p className="text-2xl">USER INFORMATION </p>
        <UserInformation user={user} watchedData={watchedData?.data}/>
      </div>
    </MainLayout>
  )
}