import { getServerSession } from "next-auth";
import { DashboardContent } from "./_component/dashboard-content";
import { MainLayout } from "./_component/main-layout";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authConfig);
  const user = session?.user;

  if (!user) redirect("/");
  return (
    <MainLayout user={user} activeTab="dashboard">
      <DashboardContent  />
    </MainLayout>
  );
}
