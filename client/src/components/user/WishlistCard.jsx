import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistCard = ({ wishlist = [], loading }) => {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-center text-slate-500">
          Loading wishlist...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Wishlist
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your favourite products
          </p>
        </div>

        <Link
          to="/wishlist"
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          View All
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center py-10">

          <Heart
            size={55}
            className="text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            Wishlist Empty
          </h3>

          <p className="mt-2 text-center text-sm text-slate-500">
            Save products you love and access them anytime.
          </p>

          <Link
            to="/products"
            className="mt-5 rounded-xl bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
          >
            Explore Products
          </Link>

        </div>
      ) : (
        <div className="space-y-4">

          {wishlist.slice(0, 3).map((item) => {

            const product = item.product || item;

            return (
              <div
                key={product._id}
                className="flex items-center gap-4 rounded-xl border border-slate-200 p-3 transition hover:border-green-500"
              >

                <img
                  src={
                    product.images?.[0]?.url ||
                    "/images/product-placeholder.png"
                  }
                  alt={product.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />

                <div className="flex-1">

                  <h3 className="line-clamp-1 font-semibold text-slate-800">
                    {product.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2">

                    <span className="font-bold text-green-600">
                      ₹{product.sellingPrice}
                    </span>

                    {product.mrp && (
                      <span className="text-sm text-slate-400 line-through">
                        ₹{product.mrp}
                      </span>
                    )}

                  </div>

                </div>

                <button
                  className="rounded-lg bg-green-100 p-3 text-green-600 transition hover:bg-green-600 hover:text-white"
                >
                  <ShoppingCart size={18} />
                </button>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default WishlistCard;