import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Topbar from "../components/TopBar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Fixed Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white shadow-sm">
        <Sidebar />
      </aside>

      {/* Main Section */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sticky Topbar */}
        <header className="sticky top-0 z-40 h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md">
          <Topbar />
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-4 lg:p-6">
          <div className="mx-auto w-full max-w-[1700px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;