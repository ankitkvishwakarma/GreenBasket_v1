import { useEffect, useRef, useState } from "react";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getCart,
  getCartSummary,
  updateCartItem,
  removeCartItem,
} from "@/redux/cart/cartThunk.js";

const CartButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const [open, setOpen] = useState(false);

  const {
    items,
    totalItems,
    totalPrice,
    loading,
  } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(getCart());
    dispatch(getCartSummary());
  }, [dispatch]);

  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handler
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handler
      );
  }, []);

  const increaseQty = (item) => {
    dispatch(
      updateCartItem({
        productId: item.product._id,
        quantity: item.quantity + 1,
      })
    ).then(() => dispatch(getCartSummary()));
  };

  const decreaseQty = (item) => {
    if (item.quantity <= 1) {
      dispatch(
        removeCartItem(item.product._id)
      ).then(() =>
        dispatch(getCartSummary())
      );

      return;
    }

    dispatch(
      updateCartItem({
        productId: item.product._id,
        quantity: item.quantity - 1,
      })
    ).then(() =>
      dispatch(getCartSummary())
    );
  };

  const removeItem = (id) => {
    dispatch(removeCartItem(id)).then(() =>
      dispatch(getCartSummary())
    );
  };

  const handleViewCart = () => {
    setOpen(false);
    navigate("/user/cart");
  };

  const handleCheckout = () => {
    setOpen(false);
    navigate("/user/checkout");
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >

      {/* Cart Button */}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="
          relative
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-gray-200
          bg-white
          shadow-sm
          transition-all
          hover:border-green-500
          hover:bg-green-50
        "
      >

        <ShoppingCart
          size={20}
          className="text-gray-700"
        />

        {totalItems > 0 && (
          <span
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
              bg-green-600
              px-1
              text-[10px]
              font-bold
              text-white
            "
          >
            {totalItems}
          </span>
        )}

      </motion.button>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: .25,
            }}
            className="
              absolute
              right-0
              top-full
              z-50
              mt-4
              w-[420px]
              overflow-hidden
              rounded-3xl
              border
              border-green-100
              bg-white
              shadow-[0_20px_60px_rgba(0,0,0,.15)]
            "
          >
                        {/* ================= Header ================= */}

            <div className="border-b border-green-100 bg-gradient-to-r from-green-50 via-white to-green-50 p-5">

              <div className="flex items-center justify-between">

                {/* Left */}

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-green-100
                    "
                  >
                    <ShoppingCart
                      size={24}
                      className="text-green-600"
                    />
                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-gray-800">
                      Shopping Cart
                    </h2>

                    <p className="text-sm text-gray-500">
                      {totalItems} Item
                      {totalItems !== 1 ? "s" : ""} in cart
                    </p>

                  </div>

                </div>

                {/* Close */}

                <button
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-gray-100
                    transition
                    hover:bg-red-100
                    hover:text-red-600
                  "
                >
                  <X size={18} />
                </button>

              </div>

            </div>

            {/* ================= Loading ================= */}

            {loading && (

              <div className="flex h-72 items-center justify-center">

                <div className="text-center">

                  <div
                    className="
                      mx-auto
                      h-10
                      w-10
                      animate-spin
                      rounded-full
                      border-4
                      border-green-200
                      border-t-green-600
                    "
                  />

                  <p className="mt-4 text-sm text-gray-500">
                    Loading your cart...
                  </p>

                </div>

              </div>

            )}

            {/* ================= Empty Cart ================= */}

            {!loading &&
              items.length === 0 && (

                <div className="px-6 py-14 text-center">

                  <div
                    className="
                      mx-auto
                      flex
                      h-24
                      w-24
                      items-center
                      justify-center
                      rounded-full
                      bg-green-50
                    "
                  >

                    <ShoppingCart
                      size={42}
                      className="text-green-400"
                    />

                  </div>

                  <h3 className="mt-6 text-xl font-bold text-gray-800">
                    Your cart is empty
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Looks like you haven't added
                    anything yet.
                  </p>

                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/");
                    }}
                    className="
                      mt-6
                      rounded-xl
                      bg-green-600
                      px-6
                      py-3
                      font-semibold
                      text-white
                      transition
                      hover:bg-green-700
                    "
                  >
                    Continue Shopping
                  </button>

                </div>

              )}

            {/* ================= Cart Items ================= */}

            {!loading &&
              items.length > 0 && (

                <div className="max-h-[420px] overflow-y-auto">
                                    {items.map((item) => {
                    const image =
                      item.product.images?.[0]?.url ||
                      item.product.images?.[0];

                    return (
                      <motion.div
                        key={item.product._id}
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="
                          flex
                          gap-4
                          border-b
                          border-green-100
                          p-5
                          transition-all
                          duration-300
                          hover:bg-green-50
                        "
                      >

                        {/* Product Image */}

                        <div className="relative">

                          <img
                            src={image}
                            alt={item.product.name}
                            className="
                              h-20
                              w-20
                              rounded-2xl
                              border
                              border-green-100
                              object-cover
                              bg-white
                            "
                          />

                        </div>

                        {/* Product Details */}

                        <div className="flex flex-1 flex-col justify-between">

                          <div>

                            <h3
                              className="
                                line-clamp-2
                                text-sm
                                font-semibold
                                text-gray-800
                              "
                            >
                              {item.product.name}
                            </h3>

                            <div className="mt-2 flex items-center gap-2">

                              <span
                                className="
                                  text-xl
                                  font-bold
                                  text-green-600
                                "
                              >
                                ₹{item.product.sellingPrice}
                              </span>

                              {item.product.mrp && (
                                <span
                                  className="
                                    text-sm
                                    text-gray-400
                                    line-through
                                  "
                                >
                                  ₹{item.product.mrp}
                                </span>
                              )}

                            </div>

                          </div>

                          {/* Bottom */}

                          <div className="mt-4 flex items-center justify-between">

                            {/* Quantity */}

                            <div
                              className="
                                flex
                                items-center
                                overflow-hidden
                                rounded-xl
                                border
                                border-green-200
                              "
                            >

                              <button
                                onClick={() =>
                                  decreaseQty(item)
                                }
                                className="
                                  px-3
                                  py-2
                                  transition
                                  hover:bg-green-100
                                "
                              >
                                <Minus size={15} />
                              </button>

                              <span
                                className="
                                  min-w-10
                                  text-center
                                  font-semibold
                                "
                              >
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  increaseQty(item)
                                }
                                className="
                                  bg-green-600
                                  px-3
                                  py-2
                                  text-white
                                  transition
                                  hover:bg-green-700
                                "
                              >
                                <Plus size={15} />
                              </button>

                            </div>

                            {/* Remove */}

                            <button
                              onClick={() =>
                                removeItem(
                                  item.product._id
                                )
                              }
                              className="
                                rounded-full
                                bg-red-50
                                p-2
                                text-red-500
                                transition
                                hover:bg-red-100
                              "
                            >
                              <Trash2 size={18} />
                            </button>

                          </div>

                        </div>

                      </motion.div>
                    );
                  })}

                </div>

              )}
                          {/* ================= Footer ================= */}

            {items.length > 0 && (

              <div className="border-t border-green-100 bg-gradient-to-b from-white to-green-50 p-5">

                {/* Summary */}

                <div className="mb-5 flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Total Amount
                    </p>

                    <h3 className="text-2xl font-bold text-green-600">
                      ₹{totalPrice}
                    </h3>

                  </div>

                  <div
                    className="
                      rounded-full
                      bg-green-100
                      px-3
                      py-1
                      text-sm
                      font-semibold
                      text-green-700
                    "
                  >
                    {totalItems} Item
                    {totalItems > 1 ? "s" : ""}
                  </div>

                </div>

                {/* View Cart */}

                <button
                  onClick={handleViewCart}
                  className="
                    mb-3
                    flex
                    h-12
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-green-600
                    bg-white
                    font-semibold
                    text-green-600
                    transition-all
                    duration-300
                    hover:bg-green-600
                    hover:text-white
                  "
                >
                  View Cart
                </button>

                {/* Checkout */}

                <button
                  onClick={handleCheckout}
                  className="
                    flex
                    h-12
                    w-full
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
                  "
                >
                  Proceed To Checkout
                </button>

              </div>

            )}

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  );
};

export default CartButton;