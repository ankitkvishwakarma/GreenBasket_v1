import { useEffect, useState } from "react";
import {
  ShoppingBag,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";

// import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatsCard";
import RevenueChart from "../components/RevenueChart";
import RecentOrders from "../components/RecentOrder";
import TopProducts from "../components/TopProducts";
import LowStockProducts from "../components/LowStockProducts";

import {
  getStats,
  getMonthlyRevenue,
  getRecentOrders,
  getTopProducts,
  getLowStockProducts,
} from "../../services/dashboardApi.js";

// import {
//   getStats,
//   getMonthlyRevenue,
//   getRecentOrders,
//   getTopProducts,
//   // getLowStock,
// } from "../../services/dashboardApi";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [chart, setChart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
   
    try {
      setLoading(true);
      console.log(Array.isArray(recentOrdersData));
      console.log(recentOrdersData);
      const [
        statsData,
        revenueData,
        recentOrdersData,
        topProductsData,
        lowStockData,
      ] = await Promise.all([
        getStats(),
        getMonthlyRevenue(),
        getRecentOrders(),
        getTopProducts(),
        getLowStockProducts(),
      ]);


      setStats(statsData);
      setChart(revenueData);
      setOrders(recentOrdersData);
      setTopProducts(topProductsData);
      setLowStock(lowStockData);
    } catch (error) {
      console.error("Dashboard Error :", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-lg font-semibold text-gray-500">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* <DashboardHeader /> */}

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Revenue"
          value={`₹${stats?.totalRevenue ?? 0}`}
          icon={Wallet}
          color="bg-green-500"
        />

        <StatCard
          title="Orders"
          value={stats?.totalOrders ?? 0}
          icon={ShoppingCart}
          color="bg-blue-500"
        />

        <StatCard
          title="Customers"
          value={stats?.totalCustomers ?? 0}
          icon={Users}
          color="bg-purple-500"
        />

        <StatCard
          title="Products"
          value={stats?.totalProducts ?? 0}
          icon={ShoppingBag}
          color="bg-orange-500"
        />

      </div>

      {/* Revenue Chart */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <RevenueChart data={chart} />
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold">
            Today's Summary
          </h2>

          <div className="mt-8 space-y-6">

            <div className="flex items-center justify-between">
              <span className="text-gray-500">
                Revenue
              </span>

              <strong>
                ₹{stats?.todayRevenue ?? 0}
              </strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">
                Orders
              </span>

              <strong>
                {stats?.todayOrders ?? 0}
              </strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">
                Customers
              </span>

              <strong>
                {stats?.todayCustomers ?? 0}
              </strong>
            </div>

          </div>

        </div>

      </div>

      {/* Recent Orders */}

      <RecentOrders orders={orders} />

      {/* Bottom Widgets */}

      <div className="grid gap-6 lg:grid-cols-2">

        <TopProducts products={topProducts} />

        <LowStockProducts products={lowStock} />

      </div>

    </div>
  );
};

export default Dashboard;