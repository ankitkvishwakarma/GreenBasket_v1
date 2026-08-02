import { RotateCcw, Star } from "lucide-react";

const ProductFilters = ({
  categories = [],
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  availability,
  setAvailability,
  rating,
  setRating,
  clearFilters,
}) => {
  return (
    <aside className="sticky top-24 h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">
          Filters
        </h3>

        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      {/* Category */}
      <div className="mb-8">
        <label className="mb-3 block font-semibold">
          Category
        </label>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 p-3 outline-none focus:border-green-500"
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option
              key={category._id}
              value={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="mb-8">
        <label className="mb-3 block font-semibold">
          Maximum Price
        </label>

        <input
          type="range"
          min={0}
          max={5000}
          step={100}
          value={priceRange}
          onChange={(e) =>
            setPriceRange(Number(e.target.value))
          }
          className="w-full accent-green-600"
        />

        <p className="mt-2 text-sm text-gray-600">
          ₹ {priceRange}
        </p>
      </div>

      {/* Availability */}
      <div className="mb-8">
        <label className="mb-3 block font-semibold">
          Availability
        </label>

        <div className="space-y-3">
          {[
            { label: "All", value: "all" },
            { label: "In Stock", value: "in-stock" },
            { label: "Out of Stock", value: "out-of-stock" },
          ].map((item) => (
            <label
              key={item.value}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                checked={availability === item.value}
                onChange={() =>
                  setAvailability(item.value)
                }
              />

              {item.label}
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="mb-3 block font-semibold">
          Minimum Rating
        </label>

        <div className="space-y-2">
          {[4, 3, 2, 1].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className={`flex w-full items-center gap-2 rounded-xl p-2 transition ${
                rating === value
                  ? "bg-green-100 text-green-700"
                  : "hover:bg-gray-100"
              }`}
            >
              {Array.from({ length: value }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}

              <span>& Up</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ProductFilters;