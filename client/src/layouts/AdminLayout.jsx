import { Outlet } from "react-router-dom";
import Sidebar from "../admin/components/SideBar";
import Header from "../admin/components/Header";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F8FB]">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-slate-200 bg-white shadow-sm">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex flex-1 flex-col overflow-hidden">

        {/* Header */}
        <header className="sticky top-0 z-40 h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md">
          <Header />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#F6F8FB] p-4 lg:p-6">

          <div className="mx-auto w-full max-w-[1700px]">
            <Outlet />
          </div>

        </main>

      </div>

    </div>
  );
};

export default AdminLayout;