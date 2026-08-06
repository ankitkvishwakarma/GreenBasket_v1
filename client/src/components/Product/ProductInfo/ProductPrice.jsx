import { motion } from "framer-motion";
import {
  BadgePercent,
  Wallet,
  ShieldCheck,
} from "lucide-react";

const ProductPrice = ({
  product,
  selectedVariant,
}) => {
  if (!product) return null;

  const price =
    selectedVariant?.price ??
    product.sellingPrice;

  const mrp =
    selectedVariant?.mrp ??
    product.mrp;

  const discount =
    mrp > price
      ? Math.round(
          ((mrp - price) / mrp) * 100
        )
      : 0;

  const saved = mrp - price;

  return (
    <div className="space-y-6">

      {/* Price */}

      <div className="flex flex-wrap items-end gap-4">

        <motion.h2
          initial={{
            scale: 0.95,
          }}
          animate={{
            scale: 1,
          }}
          className="text-4xl font-bold text-green-700"
        >
          ₹{price}
        </motion.h2>

        {mrp > price && (
          <span className="text-xl text-gray-400 line-through">
            ₹{mrp}
          </span>
        )}

        {discount > 0 && (
          <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-bold text-red-600">
            {discount}% OFF
          </span>
        )}

      </div>

      {/* Save */}

      {saved > 0 && (
        <div className="flex items-center gap-2 rounded-2xl bg-green-50 p-4">

          <BadgePercent
            size={18}
            className="text-green-600"
          />

          <span className="font-medium text-green-700">

            You Save ₹{saved}

          </span>

        </div>
      )}

      {/* Payment */}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4">

          <Wallet
            size={20}
            className="text-green-600"
          />

          <div>

            <p className="font-semibold">

              Cash on Delivery

            </p>

            <p className="text-sm text-gray-500">

              Available

            </p>

          </div>

        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 p-4">

          <ShieldCheck
            size={20}
            className="text-green-600"
          />

          <div>

            <p className="font-semibold">

              Secure Payment

            </p>

            <p className="text-sm text-gray-500">

              100% Protected

            </p>

          </div>

        </div>

      </div>

      {/* Tax */}

      <div className="rounded-2xl border border-dashed border-green-300 bg-green-50 p-4">

        <p className="text-sm text-green-700">

          ✔ Inclusive of all taxes

        </p>

      </div>

    </div>
  );
};

export default ProductPrice;