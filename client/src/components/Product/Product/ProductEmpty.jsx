import { SearchX } from "lucide-react";
import { Link } from "react-router-dom";

const ProductEmpty = () => {
  return (
    <div className="flex min-h-[450px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">

      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">

        <SearchX
          size={50}
          className="text-green-600"
        />

      </div>

      <h2 className="mt-6 text-2xl font-bold text-gray-900">
        No Products Found
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        We couldn't find any products matching
        your current filters. Try changing your
        filters or explore all products.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">

        <button
          onClick={() =>
            (window.location.href = "/products")
          }
          className="
            rounded-xl
            bg-green-600
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-green-700
          "
        >
          Clear Filters
        </button>

        <Link
          to="/"
          className="
            rounded-xl
            border
            border-gray-300
            px-6
            py-3
            font-medium
            transition
            hover:bg-gray-100
          "
        >
          Back Home
        </Link>

      </div>

    </div>
  );
};

export default ProductEmpty;