const ProductSkeleton = ({
  count = 10,
  view = "grid",
}) => {
  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          : "flex flex-col gap-6"
      }
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          aria-hidden="true"
          className={`animate-pulse overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm ${
            view === "list"
              ? "flex flex-col md:flex-row"
              : ""
          }`}
        >
          {/* Image */}
          <div
            className={`bg-gray-200 ${
              view === "list"
                ? "h-64 md:h-auto md:w-72"
                : "h-64 w-full"
            }`}
          />

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between p-5">
            <div>
              <div className="h-4 w-24 rounded bg-gray-200" />

              <div className="mt-4 h-5 w-full rounded bg-gray-200" />

              <div className="mt-3 h-5 w-3/4 rounded bg-gray-200" />

              <div className="mt-5 flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-gray-200" />
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>

              <div className="mt-6 h-7 w-28 rounded bg-gray-200" />
            </div>

            <div className="mt-8 h-12 rounded-2xl bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;