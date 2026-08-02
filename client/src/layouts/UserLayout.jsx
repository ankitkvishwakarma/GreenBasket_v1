import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import DashboardHeader from "../components/user/DashboardHeader";
import UserSidebar from "../components/user/UserSidebar";

const UserLayout = () => {
    const { dashboard } = useSelector((state) => state.userDashboard);

    return (
        <div className="min-h-screen bg-[#F7F8FA]">

            <DashboardHeader
                user={dashboard?.user}
                notificationCount={
                    dashboard?.notifications?.unreadCount || 0
                }
            />

            <div className="flex">

                <UserSidebar
                    user={dashboard?.user}
                />

                <main className="flex-1 p-5 overflow-y-auto">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default UserLayout;