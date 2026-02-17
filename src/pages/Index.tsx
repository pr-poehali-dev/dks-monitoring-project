import { useState } from "react";
import { PageType } from "@/lib/types";
import { mockAlerts } from "@/lib/mock-data";
import Sidebar from "@/components/Sidebar";
import DashboardPage from "@/components/DashboardPage";
import DevicesPage from "@/components/DevicesPage";
import StatisticsPage from "@/components/StatisticsPage";
import HistoryPage from "@/components/HistoryPage";
import AlertsPage from "@/components/AlertsPage";
import SettingsPage from "@/components/SettingsPage";

const pages: Record<PageType, React.FC> = {
  dashboard: DashboardPage,
  devices: DevicesPage,
  statistics: StatisticsPage,
  history: HistoryPage,
  alerts: AlertsPage,
  settings: SettingsPage,
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const unreadAlerts = mockAlerts.filter((a) => !a.read).length;
  const PageComponent = pages[currentPage];

  return (
    <div className="flex min-h-screen gradient-mesh dark">
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        alertCount={unreadAlerts}
      />
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <PageComponent />
      </main>
    </div>
  );
};

export default Index;