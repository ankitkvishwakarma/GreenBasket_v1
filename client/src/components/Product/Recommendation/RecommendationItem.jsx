import { motion } from "framer-motion";

const RecommendationItem = ({ children }) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        min-w-[280px]
        sm:min-w-[300px]
        lg:min-w-[290px]
        xl:min-w-[300px]
        flex-shrink-0
      "
    >
      {children}
    </motion.div>
  );
};

export default RecommendationItem;