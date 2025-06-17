import Header from "../components/Shared/Header";
import Sidebar from "../components/Shared/Sidebar";
import Footer from "../components/Shared/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden relative bg-[#F1F5F6]">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
