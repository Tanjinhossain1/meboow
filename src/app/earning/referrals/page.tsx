import { redirect } from "next/navigation";
import { MainLayout } from "../dashboard/_component/main-layout";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import {
  fetchEarningWatchedVideos,
  fetchUsers,
} from "@/services/articleServices";
import ReferralProgram from "./_components/RefferralsComponents";

export default async function WidthDrawPage() {
  const session = await getServerSession(authConfig);
  const user: any = session?.user;

  if (!user) redirect("/");
  const referralData = await fetchUsers({ userId: user?.id });
  return (
    <MainLayout user={user} activeTab="withdraw">
      <div className="p-6">
        <ReferralProgram referralData={referralData?.data} user={user} />
      </div>
    </MainLayout>
  );
}
