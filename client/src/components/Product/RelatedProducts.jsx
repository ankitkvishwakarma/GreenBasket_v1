import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import productService from "@/services/productService";

const RelatedProducts = ({ productId, categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);

        const response = await productService.getRelatedProducts(
          productId,
          categoryId
        );

        setProducts(response.data || []);
      } catch (error) {
        console.error("Related Products Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId && categoryId) {
      fetchRelatedProducts();
    }
  }, [productId, categoryId]);

  if (loading) {
    return (
      <section className="mt-16">
        <h2 className="mb-8 text-3xl font-bold">
          Related Products
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-3xl border bg-white p-4"
            >
              <div className="h-52 rounded-2xl bg-gray-200"></div>

              <div className="mt-4 h-4 rounded bg-gray-200"></div>

              <div className="mt-3 h-4 w-1/2 rounded bg-gray-200"></div>

              <div className="mt-4 h-10 rounded-xl bg-gray-200"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="mt-20">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          Related Products
        </h2>

        <Link
          to="/shop"
          className="font-semibold text-green-600 hover:text-green-700"
        >
          View All →
        </Link>

      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {products.map((product) => (
          <motion.div
            key={product._id}
            whileHover={{ y: -8 }}
            className="overflow-hidden rounded-3xl border border-gray-200 bg-white transition-shadow hover:shadow-xl"
          >
            <Link to={`/product/${product._id}`}>

              <img
                src={
                  product.images?.[0]?.url ||
                  "/images/product-placeholder.png"
                }
                alt={product.name}
                className="h-60 w-full object-cover"
              />

              <div className="space-y-3 p-5">

                <span className="text-sm text-green-600">
                  {product.category?.name}
                </span>

                <h3 className="line-clamp-2 text-lg font-semibold">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2">

                  <Star
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <span>
                    {product.rating || 4.5}
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <span className="text-2xl font-bold text-green-600">
                    ₹{product.price}
                  </span>

                  {product.originalPrice && (
                    <span className="text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}

                </div>

                <button className="w-full rounded-2xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700">
                  View Product
                </button>

              </div>

            </Link>
          </motion.div>
        ))}

      </div>

    </section>
  );
};

export default RelatedProducts;