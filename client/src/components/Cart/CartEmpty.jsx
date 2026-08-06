import { ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CartEmpty = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-green-200 bg-white px-6 py-12 text-center shadow-sm"
    >
      {/* Icon */}

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <ShoppingCart
          size={30}
          className="text-green-600"
        />
      </div>

      {/* Heading */}

      <h2 className="mt-4 text-xl font-bold text-gray-900">
        Your Cart is Empty
      </h2>

      {/* Description */}

      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
        Looks like you haven't added any products yet.
        Explore our fresh grocery collection and
        start shopping.
      </p>

      {/* Button */}

      <Link
        to="/products"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02]"
      >
        Continue Shopping

        <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
};

export default CartEmpty;