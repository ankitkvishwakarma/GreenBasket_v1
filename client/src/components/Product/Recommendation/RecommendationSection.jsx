import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const RecommendationSection = ({
  title,
  subtitle,
  icon,
  children,
  onViewAll,
  showViewAll = true,
  loading = false,
}) => {
  return (
    <section className="relative">

      {/* Header */}

      <div className="mb-6 flex items-end justify-between">

        <div>

          <div className="flex items-center gap-3">

            {icon && (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700 shadow-sm">
                {icon}
              </div>
            )}

            <div>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {title}
              </h2>

              {subtitle && (
                <p className="mt-1 text-sm text-gray-500">
                  {subtitle}
                </p>
              )}

            </div>

          </div>

        </div>

        {showViewAll && (
          <motion.button
            whileHover={{
              x: 4,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={onViewAll}
            className="hidden items-center gap-2 rounded-xl border border-green-200 bg-white px-5 py-3 font-medium text-green-700 transition-all hover:bg-green-50 lg:flex"
          >
            View All

            <ArrowRight
              size={18}
            />

          </motion.button>
        )}

      </div>

      {/* Body */}

      <div className="relative">

        {/* Left Fade */}

        <div className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-14 bg-gradient-to-r from-[#f8f9fb] to-transparent lg:block" />

        {/* Right Fade */}

        <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-14 bg-gradient-to-l from-[#f8f9fb] to-transparent lg:block" />

        {/* Products */}

        <div
          className="
            recommendation-scroll
            flex
            gap-5
            overflow-x-auto
            scroll-smooth
            pb-4
          "
        >
          {children}
        </div>

      </div>
            {/* Navigation */}

      <div className="mt-6 flex items-center justify-between">

        <div className="text-sm text-gray-500">
          Explore more fresh products
        </div>

        <div className="flex gap-3">

          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:border-green-500 hover:text-green-600"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:border-green-500 hover:text-green-600"
          >
            <ChevronRight size={20} />
          </motion.button>

        </div>

      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-white/60 backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
        </div>
      )}

    </section>
  );
};

export default RecommendationSection;