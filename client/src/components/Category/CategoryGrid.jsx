import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";

const CategoryGrid = ({ categories }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        grid
        grid-cols-2
        gap-4
        sm:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
      "
    >
      {categories.map((category, index) => (
        <motion.div
          key={category._id}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: index * 0.05,
          }}
        >
          <CategoryCard category={category} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategoryGrid;