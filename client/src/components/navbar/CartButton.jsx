import { useState } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const demoItems = [
  {
    id: 1,
    name: "Fresh Tomato",
    price: 120,
    qty: 2,
    image: "/images/products/tomato.png",
  },
  {
    id: 2,
    name: "Red Apple",
    price: 180,
    qty: 1,
    image: "/images/products/apple.png",
  },
];

const CartButton = ({ count = 3 }) => {
  const [open, setOpen] = useState(false);

  const subtotal = demoItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="relative">

      {/* Cart Button */}

      <motion.button
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={() => setOpen(!open)}
        className="
          relative
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-gray-200
          bg-white/80
          backdrop-blur-xl
          shadow-sm
          transition-all
          duration-300
          hover:border-green-500
          hover:bg-green-50
          hover:shadow-lg
          dark:border-neutral-700
          dark:bg-neutral-900
          dark:hover:bg-neutral-800
        "
      >
        <ShoppingCart
          size={18}
          className="text-gray-700 dark:text-white"
        />

        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="
            absolute
            -right-1
            -top-1
            flex
            h-5
            min-w-5
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r
            from-green-600
            to-emerald-500
            px-1
            text-[10px]
            font-bold
            text-white
            shadow-md
          "
        >
          {count}
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="
              absolute
              right-0
              mt-3
              w-[360px]
              max-w-[calc(100vw-24px)]
              overflow-hidden
              rounded-3xl
              border
              border-gray-200
              bg-white/95
              backdrop-blur-xl
              shadow-[0_20px_60px_rgba(0,0,0,.12)]
              dark:border-neutral-700
              dark:bg-neutral-900
            "
          >

            {/* Header */}

            <div className="border-b border-gray-100 px-5 py-4 dark:border-neutral-800">

              <h2 className="text-lg font-bold">
                Shopping Cart
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {count} item(s) in your cart
              </p>

            </div>

            {/* Cart Items */}

            <div className="max-h-80 overflow-y-auto">

                            {demoItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  className="flex items-center gap-4 border-b border-gray-100 px-5 py-4 transition-all duration-300 dark:border-neutral-800 dark:hover:bg-neutral-800/40"
                >
                  {/* Product Image */}

                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      h-14
                      w-14
                      rounded-2xl
                      border
                      border-gray-100
                      bg-gray-100
                      object-cover
                      p-1
                    "
                  />

                  {/* Product Details */}

                  <div className="min-w-0 flex-1">

                    <h3 className="truncate text-sm font-semibold text-gray-800 dark:text-white">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-green-600">
                      ₹{item.price}
                    </p>

                    {/* Qty */}

                    <div className="mt-3 flex items-center gap-2">

                      <button
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-lg
                          bg-gray-100
                          transition
                          hover:bg-green-100
                        "
                      >
                        <Minus size={14} />
                      </button>

                      <span className="w-6 text-center text-sm font-semibold">
                        {item.qty}
                      </span>

                      <button
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-lg
                          bg-gray-100
                          transition
                          hover:bg-green-100
                        "
                      >
                        <Plus size={14} />
                      </button>

                    </div>

                  </div>

                </motion.div>
              ))}
            </div>
                        {/* Footer */}

            <div className="border-t border-gray-100 p-5 dark:border-neutral-800">

              {/* Subtotal */}

              <div className="mb-5 flex items-center justify-between rounded-2xl bg-gray-50 p-4 dark:bg-neutral-800">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Subtotal
                </span>

                <span className="text-xl font-bold text-green-600">
                  ₹{subtotal}
                </span>
              </div>

              {/* View Cart */}

              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="
                  mb-3
                  flex
                  h-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-green-600
                  font-semibold
                  text-green-600
                  transition-all
                  duration-300
                  hover:bg-green-50
                  dark:hover:bg-neutral-800
                "
              >
                View Cart
              </Link>

              {/* Checkout */}

              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="
                  flex
                  h-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-r
                  from-green-600
                  to-emerald-500
                  font-semibold
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:from-green-700
                  hover:to-emerald-600
                "
              >
                Proceed to Checkout
              </Link>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartButton;