import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

const ProductDescription = ({ product }) => {
  const [expanded, setExpanded] = useState(false);

  if (!product) return null;

  const description =
    product.description ||
    "No description available.";

  const shouldCollapse =
    description.length > 350;

  const displayText =
    expanded || !shouldCollapse
      ? description
      : `${description.slice(0, 350)}...`;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div>

        <h2 className="text-2xl font-bold text-gray-900">

          Product Description

        </h2>

        <p className="mt-2 text-sm text-gray-500">

          Everything you need to know about this
          product.

        </p>

      </div>

      {/* Description Card */}

      <motion.div
        layout
        className="
          rounded-3xl
          border
          border-gray-100
          bg-white
          p-8
          shadow-sm
        "
      >

        <p
          className="
            whitespace-pre-line
            text-[15px]
            leading-8
            text-gray-600
          "
        >

          {displayText}

        </p>

        {shouldCollapse && (

          <button
            onClick={() =>
              setExpanded(!expanded)
            }
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-green-50
              px-5
              py-3
              font-medium
              text-green-700
              transition
              hover:bg-green-100
            "
          >

            {expanded ? (
              <>
                <ChevronUp size={18} />

                Show Less
              </>
            ) : (
              <>
                <ChevronDown size={18} />

                Read More
              </>
            )}

          </button>

        )}

      </motion.div>

      {/* Information Box */}

      <div
        className="
          rounded-3xl
          border
          border-green-100
          bg-green-50
          p-6
        "
      >

        <h4 className="font-semibold text-green-700">

          Good To Know

        </h4>

        <p className="mt-3 text-sm leading-7 text-green-800">

          Product specifications, packaging,
          weight, colour and appearance may vary
          slightly depending on the batch received
          from the supplier.

        </p>

      </div>

    </section>
  );
};

export default ProductDescription;