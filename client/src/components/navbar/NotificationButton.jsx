import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const NotificationButton = ({ count = 0 }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Notification Button */}

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
        <motion.div
          animate={
            count > 0
              ? {
                  rotate: [0, 15, -15, 10, -10, 0],
                }
              : {}
          }
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <Bell
            size={18}
            className="text-gray-700 dark:text-white"
          />
        </motion.div>

        {count > 0 && (
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
              from-red-500
              to-pink-500
              px-1
              text-[10px]
              font-bold
              text-white
              shadow-md
            "
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </motion.button>

      {/* Dropdown */}

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
              w-80
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
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold dark:text-white">
                  Notifications
                </h3>

                {count > 0 && (
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900 dark:text-green-300">
                    {count} New
                  </span>
                )}
              </div>
            </div>

            {/* Notifications */}

            <div className="max-h-80 overflow-y-auto p-3 space-y-3">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:bg-green-50 dark:border-neutral-800 dark:bg-neutral-800">
                <p className="font-medium dark:text-white">
                  🎉 Welcome to GreenBasket
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Thanks for joining us.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:bg-green-50 dark:border-neutral-800 dark:bg-neutral-800">
                <p className="font-medium dark:text-white">
                  🥦 Fresh vegetables available
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Check today's latest arrivals.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:bg-green-50 dark:border-neutral-800 dark:bg-neutral-800">
                <p className="font-medium dark:text-white">
                  🚚 Order Shipped
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Your latest order is on the way.
                </p>
              </div>
            </div>

            {/* Footer */}

            <div className="border-t border-gray-100 px-5 py-4 dark:border-neutral-800">
              <button
                className="
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-green-600
                  to-emerald-500
                  py-2.5
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:from-green-700
                  hover:to-emerald-600
                "
              >
                View All Notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationButton;