import Header from "../components/Shared/Header";
import Sidebar from "../components/Shared/Sidebar";
import Footer from "../components/Shared/Footer";
import dashboardBg from "../assets/background2.jpg";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: `url(${dashboardBg})` }}
        ></div>

        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-white bg-opacity-0 -z-10"></div>

        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
