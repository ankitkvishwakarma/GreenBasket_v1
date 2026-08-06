import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import CartItem from "@/components/Cart/CartItem";
import CartSummary from "@/components/Cart/CartSummary";
import CartEmpty from "@/components/Cart/CartEmpty";
import CartSkeleton from "@/components/Cart/CartSkeleton";

import {
  getCart,
  getCartSummary,
} from "@/redux/cart/cartThunk.js";

const CartPage = () => {
  const dispatch = useDispatch();

  const {
    items,
    loading,
    totalItems,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
    dispatch(getCartSummary());
  }, [dispatch]);

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 py-6">
        <div className="mx-auto max-w-7xl px-4">
          <CartSkeleton />
        </div>
      </section>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <section className="min-h-screen bg-gray-50 py-6">
        <div className="mx-auto max-w-7xl px-4">
          <CartEmpty />
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-6">
      <div className="mx-auto max-w-7xl px-4">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-6"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">

            <div>

              <h1 className="text-2xl font-bold text-gray-900">
                Shopping Cart
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {totalItems} Item
                {totalItems !== 1 ? "s" : ""} in your cart
              </p>

            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              {totalItems} Items
            </span>

          </div>
        </motion.div>

        {/* Layout */}

        <div className="grid gap-6 xl:grid-cols-3">

          {/* Cart Items */}

          <div className="space-y-4 xl:col-span-2">

            <AnimatePresence mode="popLayout">

              {items.map((item) => (
                <CartItem
                  key={item.product._id}
                  item={item}
                />
              ))}

            </AnimatePresence>

          </div>

          {/* Summary */}

          <div>
            <CartSummary />
          </div>

        </div>

      </div>
    </section>
  );
};

export default CartPage;