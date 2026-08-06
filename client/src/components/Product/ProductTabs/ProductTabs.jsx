import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ProductDescription from "./ProductDescription";
import ProductSpecification from "../ProductInfo/ProductSpecification";
import ProductHighlights from "../ProductInfo/ProductHighlights";
import ProductReviews from "./ProductReviews";
import ShippingReturns from "./ShippingReturns";

const tabs = [
  {
    id: "description",
    label: "Description",
  },
  {
    id: "highlights",
    label: "Highlights",
  },
  {
    id: "specifications",
    label: "Specifications",
  },
  {
    id: "reviews",
    label: "Reviews",
  },
  {
    id: "shipping",
    label: "Shipping",
  },
];

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] =
    useState("description");

  const renderTab = () => {
    switch (activeTab) {
      case "description":
        return (
          <ProductDescription
            product={product}
          />
        );

      case "highlights":
        return (
          <ProductHighlights
            product={product}
          />
        );

      case "specifications":
        return (
          <ProductSpecification
            product={product}
          />
        );

      case "reviews":
        return (
          <ProductReviews
            product={product}
          />
        );

      case "shipping":
        return <ShippingReturns />;

      default:
        return null;
    }
  };

  return (
    <section className="space-y-8">

      {/* Tabs */}

      <div className="overflow-x-auto">

        <div className="inline-flex rounded-2xl border border-gray-100 bg-white p-2 shadow-sm">

          {tabs.map((tab) => (

            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id)
              }
              className={`
                relative
                rounded-xl
                px-6
                py-3
                text-sm
                font-semibold
                transition-all

                ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-600 hover:text-green-700"
                }
              `}
            >

              {activeTab === tab.id && (

                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-green-600"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.45,
                  }}
                />

              )}

              <span className="relative z-10">

                {tab.label}

              </span>

            </button>

          ))}

        </div>

      </div>

      {/* Content */}

      <AnimatePresence mode="wait">

        <motion.div
          key={activeTab}
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -15,
          }}
          transition={{
            duration: 0.25,
          }}
          className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
        >

          {renderTab()}

        </motion.div>

      </AnimatePresence>

    </section>
  );
};

export default ProductTabs;
