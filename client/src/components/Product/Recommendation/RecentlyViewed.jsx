import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Star,
} from "lucide-react";

const RecentlyViewed = ({
  currentProduct,
}) => {
  const navigate = useNavigate();

  const [products, setProducts] =
    useState([]);

  const [emblaRef, emblaApi] =
    useEmblaCarousel({
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
    });

  useEffect(() => {
    const stored =
      JSON.parse(
        localStorage.getItem(
          "recentProducts"
        )
      ) || [];

    if (currentProduct) {
      const filtered =
        stored.filter(
          (item) =>
            item._id !== currentProduct._id
        );

      filtered.unshift(currentProduct);

      const latest =
        filtered.slice(0, 10);

      localStorage.setItem(
        "recentProducts",
        JSON.stringify(latest)
      );

      setProducts(latest);
    } else {
      setProducts(stored);
    }
  }, [currentProduct]);

  if (products.length <= 1) return null;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-green-100 p-2">

              <Eye
                size={20}
                className="text-green-700"
              />

            </div>

            <h2 className="text-3xl font-bold text-gray-900">

              Recently Viewed

            </h2>

          </div>

          <p className="mt-2 text-gray-500">

            Continue exploring your recently viewed products.

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

          {products
            .filter(
              (item) =>
                item._id !==
                currentProduct?._id
            )
            .map((product) => (

              <div
                key={product._id}
                className="
                  min-w-[280px]
                  flex-[0_0_280px]
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
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >

                  <img
                    src={
                      product.images?.[0]
                        ?.url
                    }
                    alt={product.name}
                    className="
                      aspect-square
                      w-full
                      bg-gray-50
                      object-contain
                      p-5
                    "
                  />

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

                        ₹
                        {
                          product.sellingPrice
                        }

                      </span>

                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/product/${product.slug}`
                        )
                      }
                      className="
                        w-full
                        rounded-2xl
                        bg-green-600
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-green-700
                      "
                    >

                      View Product

                    </button>

                  </div>

                </div>

              </div>

            ))}

        </div>

      </div>

    </section>
  );
};

export default RecentlyViewed;