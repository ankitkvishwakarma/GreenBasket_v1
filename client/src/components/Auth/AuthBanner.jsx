import { motion } from "framer-motion";
import { ShoppingBasket, Leaf, Truck, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Fresh Products",
  },
  {
    icon: Truck,
    title: "Fast Home Delivery",
  },
  {
    icon: ShieldCheck,
    title: "Secure Online Payments",
  },
];

const AuthBanner = () => {
  return (
    <div className="relative flex h-full min-h-[620px] flex-col justify-between overflow-hidden bg-gradient-to-br from-green-700 via-emerald-600 to-lime-500 px-8 py-8 text-white">
      {/* Background Blur */}
      <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white p-2 text-green-700">
            <ShoppingBasket size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              GreenBasket
            </h2>

            <p className="text-sm text-green-100">
              Fresh Grocery Store
            </p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold leading-tight">
          Fresh Groceries
          <br />
          Delivered
          <br />
          To Your Doorstep
        </h1>

        <p className="mt-4 max-w-sm text-base leading-7 text-green-100">
          Shop vegetables, fruits, dairy, bakery and everyday essentials with
          premium quality and lightning fast delivery.
        </p>

        {/* Image */}
        {/* <div className="mt-6 flex justify-center">
          <img
            src="/images/auth/login-banner.png"
            alt="GreenBasket"
            className="h-52 w-auto object-contain lg:h-60"
          />
        </div> */}
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm"
            >
              <div className="rounded-lg bg-white p-2 text-green-700">
                <Icon size={18} />
              </div>

              <span className="text-sm font-medium">
                {item.title}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default AuthBanner;