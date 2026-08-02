import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const FeaturedGrid = ({ products }) => {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-4
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
      "
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: index * 0.08,
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturedGrid;