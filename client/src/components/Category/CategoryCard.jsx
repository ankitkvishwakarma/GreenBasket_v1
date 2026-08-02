import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products?category=${category.slug || category._id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25 }}
      onClick={handleClick}
      className="
        group
        cursor-pointer
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:border-green-500
        hover:shadow-2xl
      "
    >
      {/* Image */}

      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100">

        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />

        <img
          src={category.image.url}
          alt={category.name}
          loading="lazy"
          className="
            mx-auto
            h-40
            w-full
            object-contain
            p-6
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />

        {category.featured && (
          <span
            className="
              absolute
              left-3
              top-3
              rounded-full
              bg-green-600
              px-3
              py-1
              text-xs
              font-semibold
              text-white
            "
          >
            Featured
          </span>
        )}
      </div>

      {/* Content */}

      <div className="space-y-4 p-5">

        <div>

          <h3 className="line-clamp-1 text-lg font-bold text-gray-900">
            {category.name}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <Package size={15} />

            {category.productCount || 0} Products
          </div>

        </div>

        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <span className="font-medium text-green-600">
            Explore
          </span>

          <ArrowRight
            size={18}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-2
              text-green-600
            "
          />
        </div>

      </div>
    </motion.div>
  );
};

export default CategoryCard;