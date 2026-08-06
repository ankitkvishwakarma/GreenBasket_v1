import { motion } from "framer-motion";

const SkeletonItem = () => {
  return (
    <div className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

      {/* Product Image */}

      <div className="h-24 w-24 flex-shrink-0 animate-pulse rounded-xl bg-gray-200" />

      {/* Content */}

      <div className="flex flex-1 flex-col justify-between">

        <div>

          <div className="h-5 w-52 animate-pulse rounded bg-gray-200" />

          <div className="mt-2 h-3 w-32 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-6 w-24 animate-pulse rounded bg-gray-200" />

        </div>

        {/* Bottom */}

        <div className="mt-4 flex items-center justify-between">

          {/* Quantity */}

          <div className="flex items-center gap-2 rounded-lg border px-2 py-2">

            <div className="h-5 w-5 animate-pulse rounded bg-gray-200" />

            <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />

            <div className="h-5 w-5 animate-pulse rounded bg-gray-200" />

          </div>

          {/* Total */}

          <div className="text-right">

            <div className="ml-auto h-3 w-12 animate-pulse rounded bg-gray-200" />

            <div className="mt-2 ml-auto h-6 w-20 animate-pulse rounded bg-gray-200" />

          </div>

        </div>

      </div>

    </div>
  );
};

const CartSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      {[1, 2, 3].map((item) => (
        <SkeletonItem key={item} />
      ))}
    </motion.div>
  );
};

export default CartSkeleton;