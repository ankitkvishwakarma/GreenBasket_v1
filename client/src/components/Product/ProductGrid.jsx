import { motion } from "framer-motion";

import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const ProductGrid = ({
  products = [],
  loading = false,
  view = "grid",
  onQuickView,
  onAddToCart,
  onToggleWishlist,
}) => {
  // Loading State
  if (loading) {
    return <ProductSkeleton />;
  }

  // Empty State
  if (!loading && products.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            No Products Found
          </h3>

          <p className="mt-2 text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className={
        view === "grid"
          ? "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          : "flex flex-col gap-6"
      }
    >
      {products.map((product) => (
        <motion.div
          key={product._id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ProductCard
            product={product}
            view={view}
            onQuickView={onQuickView}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;