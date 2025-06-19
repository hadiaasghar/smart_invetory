import MainLayout from "../../layouts/MainLayout";
import DashboardMain from "./DashboardMain";


const DashboardLayout = () => {
  return (
    <MainLayout>
      <div className="relative ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl text-white font-bold">Dashboard</h1>
         
        </div>
        <DashboardMain />
      </div>
    </MainLayout>
  );
};

export default DashboardLayout;
