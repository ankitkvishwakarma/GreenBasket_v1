import { motion } from "framer-motion";
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const CheckoutHeader = () => {
  return (
    <div className="space-y-3">
      {/* Breadcrumb */}

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link
          to="/"
          className="transition hover:text-green-600"
        >
          Home
        </Link>

        <ChevronRight size={14} />

        <Link
          to="/user/cart"
          className="transition hover:text-green-600"
        >
          Cart
        </Link>

        <ChevronRight size={14} />

        <span className="font-medium text-gray-800">
          Checkout
        </span>
      </div>

      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <ShieldCheck
                size={20}
                className="text-green-600"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Secure Checkout
              </h1>

              <p className="mt-0.5 text-sm text-gray-500">
                Complete your order safely.
              </p>
            </div>
          </div>

          {/* Stepper */}

          <div className="flex flex-wrap items-center gap-3">
            {/* Cart */}

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white">
                <ShoppingCart size={16} />
              </div>

              <span className="text-sm font-medium">
                Cart
              </span>
            </div>

            <ChevronRight
              size={14}
              className="text-gray-400"
            />

            {/* Address */}

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white">
                <MapPin size={16} />
              </div>

              <span className="text-sm font-medium">
                Address
              </span>
            </div>

            <ChevronRight
              size={14}
              className="text-gray-400"
            />

            {/* Payment */}

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                <CreditCard size={16} />
              </div>

              <span className="text-sm text-gray-500">
                Payment
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutHeader;