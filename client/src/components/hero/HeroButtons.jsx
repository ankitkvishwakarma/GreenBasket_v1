import { motion } from "framer-motion";
import { ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const HeroButtons = () => {
  return (
    <div className="flex flex-wrap items-center gap-5">
      {/* Shop Now */}
      <Link to="/shop">
        <motion.button
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 rounded-xl bg-green-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-green-200"
        >
          Shop Now
          <ArrowRight size={18} />
        </motion.button>
      </Link>

      {/* View Offers */}
      <Link to="/offers">
        <motion.button
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 rounded-xl border border-green-600 bg-white px-8 py-4 text-base font-semibold text-green-600 transition-all duration-300 hover:bg-green-50"
        >
          View Offers
          <Tag size={18} />
        </motion.button>
      </Link>
    </div>
  );
};

export default HeroButtons;