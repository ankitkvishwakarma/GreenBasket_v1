import {
  Package,
  Tag,
  Scale,
  Truck,
  Globe,
  Clock,
} from "lucide-react";

const ProductSpecification = ({ product }) => {
  if (!product) return null;

  const specifications = [
    {
      icon: <Package size={18} />,
      label: "Category",
      value:
        product.Categories?.name ||
        "N/A",
    },

    {
      icon: <Tag size={18} />,
      label: "Brand",
      value: product.brand || "GreenBasket",
    },

    {
      icon: <Scale size={18} />,
      label: "Weight",
      value:
        product.weight && product.unit
          ? `${product.weight} ${product.unit}`
          : "N/A",
    },

    {
      icon: <Truck size={18} />,
      label: "Delivery",
      value:
        product.deliveryTime ||
        "Within 24 Hours",
    },

    {
      icon: <Globe size={18} />,
      label: "Origin",
      value:
        product.origin || "India",
    },

    {
      icon: <Clock size={18} />,
      label: "Availability",
      value:
        product.stock > 0
          ? "In Stock"
          : "Out Of Stock",
    },
  ];

  return (
    <section className="space-y-6">

      <div>

        <h3 className="text-2xl font-bold text-gray-900">
          Specifications
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Product information and technical
          details.
        </p>

      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

        {specifications.map(
          (item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between gap-5 px-6 py-5 transition hover:bg-green-50

              ${
                index !==
                specifications.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-green-50 p-3 text-green-700">

                  {item.icon}

                </div>

                <span className="font-medium text-gray-700">

                  {item.label}

                </span>

              </div>

              <span className="text-right font-semibold text-gray-900">

                {item.value}

              </span>

            </div>
          )
        )}

      </div>

      {/* Dynamic Specifications */}

      {product.specifications &&
        Object.keys(product.specifications)
          .length > 0 && (

          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

            <div className="border-b border-gray-100 px-6 py-5">

              <h4 className="font-semibold text-gray-900">

                Additional Details

              </h4>

            </div>

            {Object.entries(
              product.specifications
            ).map(([key, value]) => (

              <div
                key={key}
                className="flex justify-between border-b border-gray-100 px-6 py-4 last:border-none"
              >

                <span className="capitalize text-gray-600">

                  {key.replace(/_/g, " ")}

                </span>

                <span className="font-medium text-gray-900">

                  {value}

                </span>

              </div>

            ))}

          </div>

        )}

    </section>
  );
};

export default ProductSpecification;