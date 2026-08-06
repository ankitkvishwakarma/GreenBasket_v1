import { SlidersHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { getCategories } from "@/redux/category/categoryThunk";

import { useEffect } from "react";

const ProductFilter = () => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const { categories } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const updateFilter = (key, value) => {
    if (!value) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }

    searchParams.set("page", 1);

    setSearchParams(searchParams);
  };

  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center gap-2">

        <SlidersHorizontal
          size={20}
          className="text-green-600"
        />

        <h2 className="text-lg font-semibold">
          Filters
        </h2>

      </div>

      {/* Category */}

      <div className="mb-6">

        <h3 className="mb-3 font-medium">
          Categories
        </h3>

        <div className="space-y-2">

          <button
            onClick={() =>
              updateFilter("category", "")
            }
            className="block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-green-50"
          >
            All Categories
          </button>

          {categories?.map((category) => (
            <button
              key={category._id}
              onClick={() =>
                updateFilter(
                  "category",
                  category._id
                )
              }
              className="block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-green-50"
            >
              {category.name}
            </button>
          ))}

        </div>

      </div>

      {/* Availability */}

      <div className="mb-6">

        <h3 className="mb-3 font-medium">
          Availability
        </h3>

        <label className="mb-2 flex cursor-pointer items-center gap-2">

          <input
            type="checkbox"
            onChange={(e) =>
              updateFilter(
                "inStock",
                e.target.checked
                  ? "true"
                  : ""
              )
            }
          />

          <span className="text-sm">
            In Stock
          </span>

        </label>

      </div>

      {/* Organic */}

      <div className="mb-6">

        <h3 className="mb-3 font-medium">
          Organic
        </h3>

        <label className="flex cursor-pointer items-center gap-2">

          <input
            type="checkbox"
            onChange={(e) =>
              updateFilter(
                "organic",
                e.target.checked
                  ? "true"
                  : ""
              )
            }
          />

          <span className="text-sm">
            Organic Products
          </span>

        </label>

      </div>

      {/* Featured */}

      <div className="mb-8">

        <h3 className="mb-3 font-medium">
          Featured
        </h3>

        <label className="flex cursor-pointer items-center gap-2">

          <input
            type="checkbox"
            onChange={(e) =>
              updateFilter(
                "featured",
                e.target.checked
                  ? "true"
                  : ""
              )
            }
          />

          <span className="text-sm">
            Featured Products
          </span>

        </label>

      </div>

      {/* Clear */}

      <button
        onClick={() => {
          setSearchParams({});
        }}
        className="w-full rounded-xl bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
      >
        Clear Filters
      </button>

    </aside>
  );
};

export default ProductFilter;