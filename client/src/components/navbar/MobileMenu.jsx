import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Store,
  Grid2x2,
  BadgePercent,
  Phone,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import WishlistButton from "./WishlistButton";
import CartButton from "./CartButton";
import NotificationButton from "./NotificationButton";
import ThemeToggle from "./ThemeToggle";

const menuItems = [
  {
    title: "Home",
    path: "/",
    icon: Home,
  },
  {
    title: "Shop",
    path: "/shop",
    icon: Store,
  },
  {
    title: "Categories",
    path: "/categories",
    icon: Grid2x2,
  },
  {
    title: "Offers",
    path: "/offers",
    icon: BadgePercent,
  },
  {
    title: "Contact",
    path: "/contact",
    icon: Phone,
  },
];

const MobileMenu = ({ open, setOpen }) => {
  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  return (
    <>
      {/* Menu Button */}

      <motion.button
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="
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
          lg:hidden
          dark:border-neutral-700
          dark:bg-neutral-900
        "
      >
        <Menu size={20} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />

            {/* Drawer */}

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
              }}
              className="
                fixed
                right-0
                top-0
                z-50
                flex
                h-screen
                w-[340px]
                max-w-[90vw]
                flex-col
                overflow-hidden
                border-l
                border-gray-200
                bg-white/95
                backdrop-blur-xl
                shadow-[0_20px_80px_rgba(0,0,0,.20)]
                dark:border-neutral-800
                dark:bg-neutral-950
              "
            >
              {/* Header */}

              <div className="flex items-center justify-between border-b border-gray-100 p-5 dark:border-neutral-800">

                <div>
                  <h2 className="text-xl font-bold text-green-600">
                    GreenBasket
                  </h2>

                  <p className="text-xs text-gray-500">
                    Fresh Grocery Delivered
                  </p>
                </div>

                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  className="rounded-xl p-2 transition hover:bg-gray-100 dark:hover:bg-neutral-800"
                >
                  <X size={20} />
                </motion.button>

              </div>

              {/* Search */}

              <div className="border-b border-gray-100 p-5 dark:border-neutral-800">
                <SearchBar />
              </div>

              {/* Navigation */}

              <nav className="flex flex-1 flex-col gap-2 p-4">
                                {menuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className="
                          group
                          flex
                          items-center
                          gap-4
                          rounded-2xl
                          p-3
                          transition-all
                          duration-300
                          hover:bg-green-50
                          dark:hover:bg-neutral-800
                        "
                      >
                        <div
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-green-100
                            text-green-600
                            transition-all
                            duration-300
                            group-hover:bg-green-600
                            group-hover:text-white
                            dark:bg-neutral-800
                          "
                        >
                          <Icon size={20} />
                        </div>

                        <div className="flex flex-1 items-center justify-between">
                          <span className="font-medium text-gray-700 dark:text-gray-200">
                            {item.title}
                          </span>

                          <span className="text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-green-600">
                            →
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom */}
                            <div className="border-t border-gray-100 p-5 dark:border-neutral-800">

                {/* Quick Actions */}

                <div className="mb-5 flex items-center justify-center gap-3">

                  <CartButton count={4} />

                  {isAuthenticated && (
                    <>
                      <WishlistButton count={2} />
                      <NotificationButton count={3} />
                    </>
                  )}

                  <ThemeToggle />

                </div>

                {/* Login / Profile */}

                {isAuthenticated ? (
                  <Link
                    to="/profile"
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
                    My Profile
                  </Link>
                ) : (
                  <Link
                    to="/login"
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
                    Login
                  </Link>
                )}

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;