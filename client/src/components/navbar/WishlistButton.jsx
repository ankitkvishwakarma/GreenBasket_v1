import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const WishlistButton = ({ count = 0 }) => {
  return (
    <Link to="/wishlist">
      <motion.button
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
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
        <Heart
          size={18}
          strokeWidth={2.2}
          className="text-gray-700 transition-colors duration-300 hover:text-red-500 dark:text-white"
        />

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
    </Link>
  );
};

export default WishlistButton;