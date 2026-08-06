import { Package2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProductHeader = () => {
  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-8 p-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}
        <div className="flex-1">

          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <Link
              to="/"
              className="transition hover:text-green-600"
            >
              Home
            </Link>

            <ChevronRight size={16} />

            <span className="font-medium text-gray-900">
              Products
            </span>
          </div>

          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            <Package2 size={18} />
            Fresh Grocery Collection
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            Shop Fresh Products
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Fresh vegetables, fruits, dairy, bakery,
            snacks and daily essentials at the best
            price with fast delivery.
          </p>

        </div>

        {/* Right Banner */}
        <div className="flex justify-center">

          <img
            src="/images/banner/products-banner.png"
            alt="Products"
            className="w-full max-w-md object-contain"
          />

        </div>

      </div>
    </section>
  );
};

export default ProductHeader;