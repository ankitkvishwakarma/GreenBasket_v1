import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

import {
  Flame,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Star,
} from "lucide-react";

const TrendingProducts = ({
  products = [],
}) => {
  const navigate = useNavigate();

  const [emblaRef, emblaApi] =
    useEmblaCarousel({
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
    });

  if (!products.length) return null;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-orange-100 p-2">

              <Flame
                size={20}
                className="text-orange-600"
              />

            </div>

            <h2 className="text-3xl font-bold text-gray-900">

              Trending Products

            </h2>

          </div>

          <p className="mt-2 text-gray-500">

            Most popular products customers are buying.

          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() =>
              emblaApi?.scrollPrev()
            }
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              bg-white
              transition
              hover:bg-green-600
              hover:text-white
            "
          >

            <ChevronLeft size={18} />

          </button>

          <button
            onClick={() =>
              emblaApi?.scrollNext()
            }
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              bg-white
              transition
              hover:bg-green-600
              hover:text-white
            "
          >

            <ChevronRight size={18} />

          </button>

        </div>

      </div>

      {/* Carousel */}

      <div
        ref={emblaRef}
        className="overflow-hidden"
      >

        <div className="flex">

          {products.map((product) => {

            const discount =
              product.mrp >
              product.sellingPrice
                ? Math.round(
                    ((product.mrp -
                      product.sellingPrice) /
                      product.mrp) *
                      100
                  )
                : 0;

            return (

              <motion.div
                key={product._id}
                whileHover={{
                  y: -6,
                }}
                className="
                  min-w-[285px]
                  flex-[0_0_285px]
                  p-3
                "
              >

                <div
                  className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-gray-100
                    bg-white
                    shadow-sm
                    transition
                    hover:shadow-xl
                  "
                >

                  {/* Image */}

                  <div className="relative">

                    {discount > 0 && (

                      <span
                        className="
                          absolute
                          left-4
                          top-4
                          z-10
                          rounded-full
                          bg-red-500
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          text-white
                        "
                      >

                        {discount}% OFF

                      </span>

                    )}

                    <img
                      src={
                        product.images?.[0]?.url
                      }
                      alt={product.name}
                      className="
                        aspect-square
                        w-full
                        bg-gray-50
                        object-contain
                        p-5
                        transition
                        duration-500
                        hover:scale-110
                      "
                    />

                  </div>

                  {/* Body */}

                  <div className="space-y-4 p-5">

                    <h3 className="line-clamp-2 text-lg font-semibold">

                      {product.name}

                    </h3>

                    <div className="flex items-center gap-2">

                      <Star
                        size={16}
                        className="
                          fill-yellow-400
                          text-yellow-400
                        "
                      />

                      <span>

                        {product.averageRating?.toFixed(
                          1
                        ) || "0.0"}

                      </span>

                    </div>

                    <div className="flex items-center gap-3">

                      <span
                        className="
                          text-2xl
                          font-bold
                          text-green-700
                        "
                      >

                        ₹{product.sellingPrice}

                      </span>

                      {discount > 0 && (

                        <span className="text-gray-400 line-through">

                          ₹{product.mrp}

                        </span>

                      )}

                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/product/${product.slug}`
                        )
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-green-600
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-green-700
                      "
                    >

                      <ShoppingCart size={18} />

                      View Product

                    </button>

                  </div>

                </div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
};

export default TrendingProducts;