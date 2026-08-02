import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import DashboardStats from "../../components/user/DashboardStats";
import RecentOrders from "../../components/user/RecentOrders";
import QuickActions from "../../components/user/QuickActions";
import Notifications from "../../components/user/Notifications";

import { getUserDashboard } from "../../redux/user/userDashboard/userDashboardThunk";

const Dashboard = () => {

    const dispatch = useDispatch();

    const {
        dashboard,
        loading,
        error,
    } = useSelector((state) => state.userDashboard);

    useEffect(() => {
        dispatch(getUserDashboard());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
                <div className="text-lg font-semibold text-green-600">
                    Loading Dashboard...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
                <div className="text-red-600 font-medium">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F7FA]">



            <div className="flex">



                <main className="flex-1 p-3 md:p-4 lg:p-5">

                    <DashboardStats
                        stats={dashboard?.stats}
                    />

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 mt-4">

                        <div className="xl:col-span-8">

                            <RecentOrders
                                orders={dashboard?.recentOrders}
                            />

                        </div>

                        <div className="xl:col-span-4">

                            <QuickActions
                                user={dashboard?.user}
                            />

                        </div>

                    </div>

                    <div className="mt-4">

                        <Notifications
                            notifications={
                                dashboard?.notifications?.list || []
                            }
                            unreadCount={
                                dashboard?.notifications?.unreadCount || 0
                            }
                        />

                    </div>

                </main>

            </div>

        </div>
    );
};

export default Dashboard;