import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Store,
  Grid2x2,
  BadgePercent,
  Phone,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import WishlistButton from "./WishlistButton";
import CartButton from "./CartButton";
// import NotificationButton from "./NotificationButton";
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
    <div className="relative lg:hidden">
      {/* ================= Hamburger Button ================= */}

      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={() => setOpen(!open)}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-gray-200
          bg-white
          text-gray-800
          shadow-lg
          transition-all
          duration-300
          hover:border-green-500
          hover:bg-white
          hover:shadow-xl
          active:scale-95
          dark:bg-white
          dark:text-gray-900
          dark:border-gray-200
        "
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </motion.button>

      {/* ================= Dropdown ================= */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -15,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -15,
              scale: 0.96,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              absolute
              right-0
              top-14
              z-[999]
              w-[340px]
              max-w-[92vw]
              overflow-hidden
              rounded-3xl
              border
              border-gray-200
              bg-white
              shadow-[0_20px_60px_rgba(0,0,0,0.18)]
              dark:border-neutral-800
              dark:bg-neutral-950
            "
          >
                        {/* ================= Header ================= */}

            <div className="border-b border-gray-100 bg-white dark:border-neutral-800 dark:bg-neutral-950">

              <div className="flex items-center justify-between px-5 py-5">

                <div>
                  <h2 className="text-xl font-bold text-green-600">
                    GreenBasket
                  </h2>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Fresh Grocery Delivered
                  </p>
                </div>

                <motion.button
                  whileHover={{
                    rotate: 90,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  onClick={() => setOpen(false)}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-gray-100
                    text-gray-700
                    transition-all
                    duration-300
                    hover:bg-red-50
                    hover:text-red-500
                    dark:bg-neutral-800
                    dark:text-gray-200
                  "
                >
                  <X size={18} />
                </motion.button>

              </div>

              {/* Search */}

              <div className="px-4 pb-4">
                <SearchBar />
              </div>

            </div>

            {/* ================= Navigation ================= */}

            <nav
              className="
                max-h-[420px]
                overflow-y-auto
                px-4
                py-4
                space-y-2
              "
            >
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    whileHover={{
                      x: 5,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
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

                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                            {item.title}
                          </h4>

                          <p className="text-xs text-gray-400">
                            Explore {item.title}
                          </p>
                        </div>

                        <ChevronRight
                          size={18}
                          className="
                            text-gray-300
                            transition-all
                            duration-300
                            group-hover:translate-x-1
                            group-hover:text-green-600
                          "
                        />

                      </div>

                    </Link>
                  </motion.div>
                );
              })}
            </nav>
                        {/* ================= Bottom ================= */}

            <div className="border-t border-gray-100 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">

              {/* Quick Actions */}

             <div className="mb-5 flex items-center justify-center gap-3">

                 <CartButton count={4} />

                    {isAuthenticated && (
                     <WishlistButton count={2} />
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
                    h-12
                    w-full
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-r
                    from-green-600
                    to-emerald-500
                    font-semibold
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-xl
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
                    h-12
                    w-full
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-r
                    from-green-600
                    to-emerald-500
                    font-semibold
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-xl
                  "
                >
                  Login
                </Link>
              )}

              {/* Footer */}

              <div className="mt-5 border-t border-gray-100 pt-4 dark:border-neutral-800">
                <p className="text-center text-xs text-gray-400">
                  GreenBasket © 2026
                </p>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;