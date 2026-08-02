
import { motion } from "framer-motion";
import {
  MapPinned,
  Star,
  Home,
  Truck,
} from "lucide-react";

const AddressStats = ({ addresses = [] }) => {
  const totalAddresses = addresses.length;

  const defaultAddress = addresses.filter(
    (item) => item.isDefault
  ).length;

  const homeAddresses = addresses.filter(
    (item) => item.addressType === "Home"
  ).length;

  const officeAddresses = addresses.filter(
    (item) => item.addressType === "Office"
  ).length;

  const stats = [
    {
      title: "Total Addresses",
      value: totalAddresses,
      icon: MapPinned,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Default Address",
      value: defaultAddress,
      icon: Star,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Home",
      value: homeAddresses,
      icon: Home,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Office",
      value: officeAddresses,
      icon: Truck,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
            }}
            className="rounded-3xl border bg-white p-6 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {item.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
              >
                <Icon className="h-7 w-7" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AddressStats;