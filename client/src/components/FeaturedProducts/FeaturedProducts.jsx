import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import FeaturedGrid from "./FeaturedGrid";
import { featuredProducts } from "./featuredData";

const FeaturedProducts = () => {
  return (
    <section className="overflow-hidden bg-gray-50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
        >
          {/* Left */}
          <div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

              <Sparkles
                size={18}
                className="text-green-600"
              />

              Featured Products

            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Fresh Picks Just For You
            </h2>

            <p className="mt-3 max-w-2xl text-gray-500">
              Handpicked premium groceries delivered fresh from trusted farms
              directly to your doorstep.
            </p>

          </div>

          {/* Right */}
          <button
            className="
            group
            inline-flex
            items-center
            gap-2
            font-semibold
            text-green-600
            transition
            hover:text-green-700
            "
          >
            View All Products

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />

          </button>

        </motion.div>

        {/* Product Grid */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.5,
          }}
        >
          <FeaturedGrid products={featuredProducts} />
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedProducts;