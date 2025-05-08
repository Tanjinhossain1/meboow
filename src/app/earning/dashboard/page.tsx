import { getServerSession } from "next-auth";
import { DashboardContent } from "./_component/dashboard-content";
import { MainLayout } from "./_component/main-layout";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchEarningVideos, fetchEarningWatchedVideos, fetchUsers } from "@/services/articleServices";

export default async function DashboardPage() {
  const session = await getServerSession(authConfig);
  const user:any = session?.user;

  
  const data = await  fetchEarningVideos()
  if (!user) redirect("/");
  const watchedData = await  fetchEarningWatchedVideos({email: user?.email as string})
  
    const referralData = await fetchUsers({ userId: user?.id });
  return (
    <MainLayout user={user} activeTab="dashboard">
      <DashboardContent referralData={referralData.data} watchedData={watchedData?.data} user={user} data={data?.data} />
    </MainLayout>
  );
}
