import { redirect } from "next/navigation";
import { MainLayout } from "../dashboard/_component/main-layout";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import PaymentWithdraw from "./_component/withdrawComponent";

export default async function WidthDrawPage() {
   const session = await getServerSession(authConfig);
    const user = session?.user;
  
    if (!user) redirect("/");
  return (
    <MainLayout user={user} activeTab="withdraw">
      <div className="p-6">
         <PaymentWithdraw user={user} />
      </div>
    </MainLayout>
  )
}
