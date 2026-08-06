import { motion } from "framer-motion";

const ProductSkeleton = () => {
  return (
    <motion.div
      animate={{
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 1.4,
        repeat: Infinity,
      }}
      className="min-w-[290px] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
    >
      {/* Image */}

      <div className="relative">

        <div className="aspect-square bg-gray-100" />

        <div className="absolute left-5 top-5 h-7 w-16 rounded-full bg-gray-200" />

        <div className="absolute right-5 top-5 h-10 w-10 rounded-full bg-gray-200" />

      </div>

      {/* Content */}

      <div className="space-y-4 p-5">

        <div className="h-3 w-24 rounded bg-gray-200" />

        <div className="h-6 w-full rounded bg-gray-200" />

        <div className="h-6 w-3/4 rounded bg-gray-200" />

        <div className="flex items-center gap-3">

          <div className="h-5 w-14 rounded-full bg-gray-200" />

          <div className="h-5 w-20 rounded-full bg-gray-200" />

        </div>

        <div className="h-8 w-32 rounded bg-gray-200" />

        <div className="h-14 rounded-2xl bg-gray-200" />

        <div className="h-14 rounded-2xl bg-gray-200" />

        <div className="flex gap-3">

          <div className="h-12 flex-1 rounded-2xl bg-gray-200" />

          <div className="h-12 w-12 rounded-2xl bg-gray-200" />

        </div>

      </div>
    </motion.div>
  );
};

export default ProductSkeleton;