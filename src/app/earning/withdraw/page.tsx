import { redirect } from "next/navigation";
import { MainLayout } from "../dashboard/_component/main-layout";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import PaymentWithdraw from "./_component/withdrawComponent";
import { fetchEarningWatchedVideos } from "@/services/articleServices";

export default async function WidthDrawPage() {
   const session = await getServerSession(authConfig);
    const user = session?.user;
  
    if (!user) redirect("/");
          const watchedData = await  fetchEarningWatchedVideos({email: user?.email as string})
  return (
    <MainLayout user={user} activeTab="withdraw">
      <div className="p-6">
         <PaymentWithdraw watchedData={watchedData?.data} user={user} />
      </div>
    </MainLayout>
  )
}
