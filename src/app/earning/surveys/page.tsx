import { MainLayout } from "../dashboard/_component/main-layout";

export default function SurveysPage() {
  return (
    <MainLayout activeTab="surveys">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Surveys</h1>
        <p className="mt-4">Complete surveys to earn money!</p>
      </div>
    </MainLayout>
  )
}
