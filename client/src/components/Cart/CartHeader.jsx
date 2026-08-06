import {
  ShoppingCart,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CartHeader = ({ totalItems = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mb-6"
    >
      {/* Breadcrumb */}

      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">

        <Link
          to="/"
          className="transition hover:text-green-600"
        >
          Home
        </Link>

        <ChevronRight size={14} />

        <span className="font-medium text-gray-700">
          Shopping Cart
        </span>

      </div>

      {/* Header */}

      <div
        className="
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm

        md:flex-row
        md:items-center
        md:justify-between
      "
      >
        {/* Left */}

        <div className="flex items-center gap-3">

          <div
            className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-green-100
          "
          >
            <ShoppingCart
              size={28}
              className="text-green-600"
            />
          </div>

          <div>

            <h1
              className="
              text-2xl
              font-bold
              text-gray-900
            "
            >
              Shopping Cart
            </h1>

            <p
              className="
              mt-1
              text-sm
              text-gray-500
            "
            >
              {totalItems} item
              {totalItems !== 1 ? "s" : ""} ready for checkout
            </p>

          </div>

        </div>

        {/* Right */}

        <Link
          to="/"
          className="
          inline-flex
          h-10
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-green-600
          px-4
          text-sm
          font-medium
          text-green-600
          transition-all
          hover:bg-green-600
          hover:text-white
        "
        >
          <ArrowLeft size={16} />

          Continue Shopping

        </Link>

      </div>

    </motion.div>
  );
};

export default CartHeader;