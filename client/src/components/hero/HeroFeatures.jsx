import { motion } from "framer-motion";
import {
  Leaf,
  Truck,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    subtitle: "Farm Fresh Products",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    subtitle: "Within 15 Minutes",
    color: "from-lime-500 to-green-500",
  },
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    subtitle: "Handpicked Everyday",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    subtitle: "Always Ready To Help",
    color: "from-green-600 to-green-400",
  },
];

const HeroFeatures = () => {
  return (
    <section className="relative mt-14">
      {/* Background */}
      <div className="absolute inset-0 -z-10 rounded-[40px] bg-gradient-to-r from-green-50 via-white to-emerald-50 blur-2xl" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              transition={{
                duration: 0.3,
              }}
              className="group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl"
            >
              {/* Decorative Glow */}
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-green-100 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

              {/* Icon */}
              <div
                className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-lg`}
              >
                <Icon
                  className="text-white"
                  size={30}
                />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900">
                {item.title}
              </h3>

              {/* Subtitle */}
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {item.subtitle}
              </p>

              {/* Bottom Accent */}
              <div className="mt-5 h-1 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-300 group-hover:w-full" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HeroFeatures;