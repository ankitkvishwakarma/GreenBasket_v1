import {
  LayoutDashboard,
  ShoppingBag,
  Shapes,
  ShoppingCart,
  Users,
  TicketPercent,
  MessageSquare,
  Bell,
  Truck,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import "./index.css";
import { NavLink } from "react-router-dom";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    title: "Products",
    icon: ShoppingBag,
    path: "/admin/products",
  },
  {
    title: "Categories",
    icon: Shapes,
    path: "/admin/categories",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    path: "/admin/orders",
  },
  {
    title: "Customers",
    icon: Users,
    path: "/admin/customers",
  },
  {
    title: "Coupons",
    path: "/admin/coupons",
    icon: TicketPercent,
  },
  {
    title: "Reviews",
    icon: MessageSquare,
    path: "/admin/reviews",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/admin/notifications",
  },
  {
    title: "Delivery",
    icon: Truck,
    path: "/admin/delivery",
  },
  {
    title: "Payments",
    icon: CreditCard,
    path: "/admin/payments",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

const Sidebar = () => {
  return (
    <aside className="flex h-full flex-col border-r border-white/20 bg-gradient-to-b from-emerald-700 via-emerald-600 to-green-700 text-white shadow-2xl">
      <div className="flex h-20 items-center justify-center border-b border-white/20">
        <h1 className="text-3xl font-extrabold tracking-wide text-white">
          GreenBasket
        </h1>
      </div>

      <div className="sidebar-scroll flex-1 space-y-2 overflow-y-auto px-4 py-6">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            end={menu.path === "/admin"}
            className={({ isActive }) =>
              `group flex items-center gap-4 rounded-2xl px-4 py-3 font-medium transition-all duration-300
  ${isActive
                ? "bg-white text-emerald-700 shadow-xl"
                : "text-emerald-50 hover:bg-white/15 hover:text-white"
              }`
            }
          >
            <menu.icon size={21} />
            <span>{menu.title}</span>
          </NavLink>
        ))}
      </div>

      <div className="border-t border-white/20 p-5">
        <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-500 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;