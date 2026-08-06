import { useMemo } from "react";
import {
  Star,
  UserCircle2,
  MessageSquare,
} from "lucide-react";

const ProductReviews = ({ product }) => {
  if (!product) return null;

  const reviews = product.reviews || [];

  const averageRating =
    product.averageRating || 0;

  const ratingSummary = useMemo(() => {
    const counts = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    reviews.forEach((review) => {
      counts[Math.round(review.rating)]++;
    });

    return counts;
  }, [reviews]);

  return (
    <section className="space-y-10">

      {/* Header */}

      <div>

        <h2 className="text-2xl font-bold text-gray-900">
          Customer Reviews
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Genuine ratings from customers who purchased this product.
        </p>

      </div>

      {/* Rating Summary */}

      <div className="grid gap-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm lg:grid-cols-[280px,1fr]">

        <div>

          <h3 className="text-6xl font-bold text-green-600">
            {averageRating.toFixed(1)}
          </h3>

          <div className="mt-3 flex items-center gap-1">

            {Array.from({ length: 5 }).map((_, index) => (

              <Star
                key={index}
                size={20}
                className={
                  index < Math.round(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />

            ))}

          </div>

          <p className="mt-3 text-gray-500">
            Based on {reviews.length} reviews
          </p>

        </div>

        <div className="space-y-4">

          {[5, 4, 3, 2, 1].map((star) => {

            const count =
              ratingSummary[star];

            const percent =
              reviews.length === 0
                ? 0
                : (count / reviews.length) *
                  100;

            return (

              <div
                key={star}
                className="flex items-center gap-4"
              >

                <span className="w-8 text-sm font-semibold">
                  {star}★
                </span>

                <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">

                  <div
                    className="h-full rounded-full bg-green-600"
                    style={{
                      width: `${percent}%`,
                    }}
                  />

                </div>

                <span className="w-8 text-right text-sm text-gray-500">
                  {count}
                </span>

              </div>

            );

          })}

        </div>

      </div>

      {/* Reviews */}

      <div className="space-y-5">

        {reviews.length === 0 && (

          <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">

            <MessageSquare
              size={45}
              className="mx-auto text-gray-400"
            />

            <h3 className="mt-4 text-xl font-semibold text-gray-800">

              No Reviews Yet

            </h3>

            <p className="mt-2 text-gray-500">

              Be the first customer to review this product.

            </p>

          </div>

        )}

        {reviews.map((review) => (

          <div
            key={review._id}
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
          >

            <div className="flex items-start justify-between">

              <div className="flex gap-4">

                <UserCircle2
                  size={48}
                  className="text-green-600"
                />

                <div>

                  <h4 className="font-semibold text-gray-900">

                    {review.name}

                  </h4>

                  <div className="mt-2 flex items-center gap-1">

                    {Array.from({
                      length: 5,
                    }).map((_, index) => (

                      <Star
                        key={index}
                        size={16}
                        className={
                          index < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />

                    ))}

                  </div>

                </div>

              </div>

              <span className="text-sm text-gray-400">

                {new Date(
                  review.createdAt
                ).toLocaleDateString()}

              </span>

            </div>

            {review.comment && (

              <p className="mt-5 leading-7 text-gray-600">

                {review.comment}

              </p>

            )}

          </div>

        ))}

      </div>

    </section>
  );
};

export default ProductReviews;