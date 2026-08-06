const ProductSkeletonCard = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white">

      {/* Image */}

      <div className="h-56 bg-gray-200" />

      {/* Body */}

      <div className="space-y-4 p-4">

        <div className="h-3 w-20 rounded bg-gray-200" />

        <div className="h-5 rounded bg-gray-200" />

        <div className="h-5 w-3/4 rounded bg-gray-200" />

        <div className="flex gap-2">

          <div className="h-4 w-14 rounded bg-gray-200" />

          <div className="h-4 w-10 rounded bg-gray-200" />

        </div>

        <div className="h-7 w-28 rounded bg-gray-200" />

        <div className="h-4 w-20 rounded bg-gray-200" />

        <div className="mt-6 flex gap-2">

          <div className="h-11 w-11 rounded-xl bg-gray-200" />

          <div className="h-11 flex-1 rounded-xl bg-gray-200" />

        </div>

      </div>

    </div>
  );
};

const ProductSkeleton = () => {
  return (
    <div
      className="
        grid
        gap-6

        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductSkeletonCard
          key={index}
        />
      ))}
    </div>
  );
};

export default ProductSkeleton;