import { Grid2X2, List, Search } from "lucide-react";

const ProductToolbar = ({
  sort,
  onSortChange,
  totalProducts = 0,
}) => {
  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}
        <div className="relative w-full lg:max-w-sm">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              py-3
              pl-11
              pr-4
              text-sm
              outline-none
              transition
              focus:border-green-500
            "
          />

        </div>

        {/* Right Side */}
        <div className="flex flex-wrap items-center gap-3">

          {/* Product Count */}
          <span className="text-sm font-medium text-gray-500">
            {totalProducts} Products
          </span>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) =>
              onSortChange(e.target.value)
            }
            className="
              rounded-xl
              border
              border-gray-200
              px-4
              py-2
              text-sm
              outline-none
              focus:border-green-500
            "
          >
            <option value="latest">
              Latest
            </option>

            <option value="priceLow">
              Price: Low → High
            </option>

            <option value="priceHigh">
              Price: High → Low
            </option>

            <option value="rating">
              Highest Rated
            </option>

            <option value="popular">
              Best Selling
            </option>
          </select>

          {/* View Buttons */}

          <button
            className="
              rounded-xl
              border
              border-green-600
              bg-green-600
              p-2
              text-white
            "
          >
            <Grid2X2 size={18} />
          </button>

          <button
            className="
              rounded-xl
              border
              border-gray-200
              p-2
              text-gray-500
              transition
              hover:bg-gray-100
            "
          >
            <List size={18} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductToolbar;