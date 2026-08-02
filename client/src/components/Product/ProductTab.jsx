import { useState } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    id: "description",
    label: "Description",
  },
  {
    id: "additional",
    label: "Additional Info",
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
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-16 rounded-3xl border border-gray-200 bg-white p-6">

      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-3 border-b pb-4">

        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-xl px-5 py-3 font-semibold transition ${
              activeTab === tab.id
                ? "bg-green-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}

      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="pt-8"
        >

          {activeTab === "description" && (
            <div>
              <h3 className="mb-4 text-2xl font-bold">
                Product Description
              </h3>

              <p className="leading-8 text-gray-600">
                {product.description ||
                  "No description available."}
              </p>
            </div>
          )}

          {activeTab === "additional" && (
            <div>

              <h3 className="mb-4 text-2xl font-bold">
                Additional Information
              </h3>

              <div className="grid gap-4 md:grid-cols-2">

                <div className="rounded-xl bg-gray-50 p-4">
                  <strong>Category</strong>
                  <p>{product.category?.name || "-"}</p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <strong>Brand</strong>
                  <p>{product.brand || "GreenBasket"}</p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <strong>Weight</strong>
                  <p>{product.weight || "1 Kg"}</p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <strong>Origin</strong>
                  <p>{product.origin || "India"}</p>
                </div>

              </div>

            </div>
          )}

          {activeTab === "reviews" && (
            <div>

              <h3 className="mb-6 text-2xl font-bold">
                Customer Reviews
              </h3>

              {product.reviews?.length ? (
                <div className="space-y-6">

                  {product.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="rounded-2xl border p-5"
                    >
                      <div className="mb-2 flex items-center justify-between">

                        <h4 className="font-semibold">
                          {review.user?.name}
                        </h4>

                        <div className="flex items-center gap-1">

                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          ))}

                        </div>

                      </div>

                      <p className="text-gray-600">
                        {review.comment}
                      </p>

                    </div>
                  ))}

                </div>
              ) : (
                <p className="text-gray-500">
                  No reviews available.
                </p>
              )}

            </div>
          )}

          {activeTab === "shipping" && (
            <div>

              <h3 className="mb-4 text-2xl font-bold">
                Shipping Information
              </h3>

              <ul className="space-y-3 text-gray-600">
                <li>🚚 Free delivery on orders above ₹499.</li>
                <li>📦 Delivery within 2–5 business days.</li>
                <li>🔄 Easy 7-day return policy.</li>
                <li>💳 Cash on Delivery & Online Payment available.</li>
              </ul>

            </div>
          )}

        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default ProductTabs;