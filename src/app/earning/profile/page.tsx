import { redirect } from "next/navigation";
import { MainLayout } from "../dashboard/_component/main-layout";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import UserInformation from "./_component/InformationComponent";
import { fetchEarningWatchedVideos, fetchUsers } from "@/services/articleServices";

export default async function ProfilePage() {
   const session = await getServerSession(authConfig);
    const user:any = session?.user;
  
    if (!user) redirect("/");
      const watchedData = await  fetchEarningWatchedVideos({email: user?.email as string})
          const referralData = await fetchUsers({ userId: user?.id });
  return (
    <MainLayout user={user} activeTab="profile">
      <div className="p-6">
        <p className="text-2xl">USER INFORMATION </p>
        <UserInformation referralData={referralData?.data} user={user} watchedData={watchedData?.data}/>
      </div>
    </MainLayout>
  )
}