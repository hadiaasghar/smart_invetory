import InventoryOverview from "./InventoryOverview";
import KeyMetrics from "./KeyMetrics";
import Notifications from "./Notifications";
import QuickActions from "./QuickActions"

const DashboardMain = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Inventory Overview */}
      <InventoryOverview />

      {/* Key Metrics */}
      <KeyMetrics />

      {/* Notifications */}
      <Notifications />

      {/* Quick Actions */}
      <QuickActions/>
    </div>
  );
};

export default DashboardMain;
