import { CheckCircle2 } from "lucide-react";

const ProductHighlights = ({ product }) => {
  if (!product) return null;

  const highlights =
    product.highlights?.length > 0
      ? product.highlights
      : [
          "Farm Fresh Quality",
          "Premium Grade Product",
          "Hygienically Packed",
          "Fast Home Delivery",
        ];

  return (
    <section className="space-y-6">

      {/* Heading */}

      <div>

        <h3 className="text-2xl font-bold text-gray-900">
          Product Highlights
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Why customers love this product.
        </p>

      </div>

      {/* Highlights */}

      <div className="grid gap-4 md:grid-cols-2">

        {highlights.map((item, index) => (

          <div
            key={index}
            className="
              flex
              items-start
              gap-4
              rounded-2xl
              border
              border-gray-100
              bg-white
              p-5
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-green-300
              hover:shadow-lg
            "
          >

            <div
              className="
                mt-0.5
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-green-100
              "
            >

              <CheckCircle2
                size={20}
                className="text-green-600"
              />

            </div>

            <div>

              <h4 className="font-semibold text-gray-900">
                {item}
              </h4>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Carefully selected to ensure freshness,
                quality and a better shopping experience.
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default ProductHighlights;