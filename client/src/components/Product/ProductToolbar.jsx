import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
} from "lucide-react";

const ProductToolbar = ({
  totalProducts = 0,
  search = "",
  setSearch,
  sortBy = "latest",
  setSortBy,
  view = "grid",
  setView,
  onOpenFilters,
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      {/* ================= LEFT SECTION ================= */}
      <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch?.(e.target.value)}
            aria-label="Search Products"
            className="h-11 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 outline-none transition-all duration-300 focus:border-green-500 focus:bg-white"
          />
        </div>

        {/* Product Count */}
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-900">
            {totalProducts}
          </span>{" "}
          Products Found
        </p>
      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Mobile Filter Button */}
        <button
          type="button"
          onClick={() => onOpenFilters?.()}
          className="flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-2 transition hover:bg-gray-100 lg:hidden"
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy?.(e.target.value)}
          aria-label="Sort Products"
          className="rounded-2xl border border-gray-200 bg-white px-4 py-2 outline-none transition focus:border-green-500"
        >
          <option value="latest">Latest</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="name">Name (A-Z)</option>
        </select>

        {/* Grid / List View Toggle */}
        <div className="flex overflow-hidden rounded-2xl border border-gray-200">
          <button
            type="button"
            onClick={() => setView?.("grid")}
            aria-label="Grid View"
            className={`p-3 transition-all duration-300 ${
              view === "grid"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <LayoutGrid size={18} />
          </button>

          <button
            type="button"
            onClick={() => setView?.("list")}
            aria-label="List View"
            className={`p-3 transition-all duration-300 ${
              view === "list"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductToolbar;