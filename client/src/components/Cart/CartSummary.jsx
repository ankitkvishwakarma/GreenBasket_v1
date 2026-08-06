import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgePercent,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import { clearCart } from "@/redux/cart/cartThunk.js";
import DeliveryProgress from "@/components/Cart/DeliveryProgress";

const CartSummary = () => {
  const dispatch = useDispatch();

  const {
    summary,
    totalItems,
    totalPrice,
    loading,
  } = useSelector((state) => state.cart);

  const {
    subtotal = totalPrice,
    deliveryCharge = 0,
    platformFee = 0,
    discount = 0,
    grandTotal = totalPrice,
  } = summary || {};

  return (
    <div className="sticky top-20 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      {/* Header */}

      <div className="flex items-end justify-between">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Order Summary
          </h2>

          <p className="text-sm text-gray-500">
            {totalItems} Item{totalItems !== 1 ? "s" : ""}
          </p>
        </div>

        <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
          {totalItems}
        </span>

      </div>

      {/* Delivery Progress */}

      <div className="mt-4">
        <DeliveryProgress subtotal={subtotal} />
      </div>

      {/* Coupon */}

      <div className="mt-4">

        <label className="mb-2 block text-sm font-medium">
          Coupon Code
        </label>

        <div className="flex">

          <input
            type="text"
            placeholder="Enter coupon"
            className="flex-1 rounded-l-lg border border-r-0 px-3 py-2.5 text-sm outline-none focus:border-green-600"
          />

          <button
            className="rounded-r-lg bg-green-600 px-4 text-sm font-semibold text-white hover:bg-green-700"
          >
            Apply
          </button>

        </div>

      </div>

      {/* Price */}

      <div className="mt-5 space-y-3 text-sm">

        <div className="flex justify-between">
          <span className="text-gray-500">
            Subtotal
          </span>

          <span className="font-semibold">
            ₹{subtotal}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Delivery
          </span>

          <span className="font-semibold">
            ₹{deliveryCharge}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Platform Fee
          </span>

          <span className="font-semibold">
            ₹{platformFee}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Discount
          </span>

          <span className="font-semibold text-green-600">
            -₹{discount}
          </span>
        </div>

      </div>

      <div className="my-5 border-t border-dashed" />

      {/* Total */}

      <div className="flex items-center justify-between">

        <span className="text-lg font-bold">
          Grand Total
        </span>

        <span className="text-2xl font-bold text-green-600">
          ₹{grandTotal}
        </span>

      </div>

      {/* Trust */}

      <div className="mt-5 rounded-xl bg-gray-50 p-3">

        <div className="flex items-center gap-2">

          <ShieldCheck
            size={16}
            className="text-green-600"
          />

          <span className="text-xs">
            Secure Checkout
          </span>

        </div>

        <div className="mt-2 flex items-center gap-2">

          <BadgePercent
            size={16}
            className="text-green-600"
          />

          <span className="text-xs">
            Best Price Guaranteed
          </span>

        </div>

      </div>

      {/* Buttons */}

      <div className="mt-5 space-y-2">

        <button
          onClick={() => dispatch(clearCart())}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
        >
          <Trash2 size={16} />
          Clear Cart
        </button>

        <Link
          to="/user/checkout"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.01]"
        >
          Proceed To Checkout

          <ArrowRight size={16} />
        </Link>

      </div>

    </div>
  );
};

export default CartSummary;