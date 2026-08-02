import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 cursor-pointer select-none"
      >
        {/* Logo Icon */}
        <motion.div
          animate={{
            rotate: [0, -8, 8, -8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-lime-400 shadow-lg"
        >
          <Leaf
            size={26}
            className="text-white"
            strokeWidth={2.5}
          />
        </motion.div>

        {/* Text */}
        <div className="leading-none">
          <motion.h1
            className="bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 bg-clip-text text-2xl font-extrabold text-transparent"
            whileHover={{ letterSpacing: "0.5px" }}
          >
            GreenBasket
          </motion.h1>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Fresh Grocery Delivered
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default Logo;