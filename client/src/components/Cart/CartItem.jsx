import {
  Trash2,
  Minus,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import {
  updateCartItem,
  removeCartItem,
} from "@/redux/cart/cartThunk.js";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const product = item.product;

  const image =
    product?.images?.[0]?.url ||
    product?.images?.[0] ||
    "/images/product-placeholder.png";

  const sellingPrice =
    product?.sellingPrice ??
    product?.price ??
    0;

  const total =
    sellingPrice * item.quantity;

  const increaseQty = () => {
    dispatch(
      updateCartItem({
        productId: product._id,
        quantity: item.quantity + 1,
      })
    );
  };

  const decreaseQty = () => {
    if (item.quantity === 1) {
      dispatch(removeCartItem(product._id));
      return;
    }

    dispatch(
      updateCartItem({
        productId: product._id,
        quantity: item.quantity - 1,
      })
    );
  };

  const removeItem = () => {
    dispatch(removeCartItem(product._id));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 80 }}
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex gap-4">

        {/* Image */}

        <img
          src={image}
          alt={product?.name}
          className="h-24 w-24 rounded-xl border object-cover flex-shrink-0"
        />

        {/* Content */}

        <div className="flex flex-1 flex-col">

          {/* Top */}

          <div className="flex justify-between gap-3">

            <div className="flex-1">

              <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
                {product?.name}
              </h3>

              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500">

                <span>
                  Stock :
                  <span className="ml-1 font-semibold text-green-600">
                    {product?.stock}
                  </span>
                </span>

                {item.variant && (
                  <span>
                    {item.variant}
                  </span>
                )}

              </div>

            </div>

            <button
              onClick={removeItem}
              className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
            >
              <Trash2 size={16} />
            </button>

          </div>

          {/* Price */}

          <div className="mt-3">

            <span className="text-xl font-bold text-green-600">
              ₹{sellingPrice}
            </span>

          </div>

          {/* Bottom */}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">

            {/* Quantity */}

            <div className="flex items-center overflow-hidden rounded-lg border">

              <button
                onClick={decreaseQty}
                className="p-2 hover:bg-gray-100"
              >
                <Minus size={15} />
              </button>

              <span className="min-w-[42px] text-center text-sm font-semibold">
                {item.quantity}
              </span>

              <button
                onClick={increaseQty}
                className="bg-green-600 p-2 text-white hover:bg-green-700"
              >
                <Plus size={15} />
              </button>

            </div>

            {/* Total */}

            <div className="text-right">

              <p className="text-xs text-gray-500">
                Total
              </p>

              <p className="text-lg font-bold text-gray-900">
                ₹{total}
              </p>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
};

export default CartItem;