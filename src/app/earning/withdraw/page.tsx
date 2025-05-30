import { redirect } from "next/navigation";
import { MainLayout } from "../dashboard/_component/main-layout";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import PaymentWithdraw from "./_component/withdrawComponent";
import { fetchEarningWatchedVideos, fetchUsers } from "@/services/articleServices";
import PaymentRules from "../dashboard/_component/payment-rules";

export default async function WidthDrawPage() {
   const session = await getServerSession(authConfig);
    const user:any = session?.user;
  
    if (!user) redirect("/");
          const watchedData = await  fetchEarningWatchedVideos({email: user?.email as string})
                    const referralData = await fetchUsers({ userId: user?.id });
  return (
    <MainLayout user={user} activeTab="withdraw">
      <div className="p-6">
        <PaymentRules />
        <br />
         <PaymentWithdraw referralData={referralData?.data} watchedData={watchedData?.data} user={user} />
      </div>
    </MainLayout>
  )
}
