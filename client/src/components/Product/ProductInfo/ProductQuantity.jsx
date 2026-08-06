import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const ProductQuantity = ({
  quantity,
  setQuantity,
  selectedVariant,
  product,
}) => {
  const stock =
    selectedVariant?.stock ??
    product?.stock ??
    0;

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleChange = (e) => {
    const value = Number(e.target.value);

    if (isNaN(value)) return;

    if (value < 1) {
      setQuantity(1);
      return;
    }

    if (value > stock) {
      setQuantity(stock);
      return;
    }

    setQuantity(value);
  };

  return (
    <section className="space-y-5">

      <div>

        <h3 className="text-lg font-semibold text-gray-900">
          Quantity
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Select how many items you want to purchase.
        </p>

      </div>

      <div className="flex items-center gap-5">

        <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50">

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            className="flex h-12 w-12 items-center justify-center rounded-l-2xl transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Minus size={18} />
          </motion.button>

          <input
            type="number"
            min={1}
            max={stock}
            value={quantity}
            onChange={handleChange}
            className="h-12 w-20 border-x border-gray-200 bg-white text-center font-semibold outline-none"
          />

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={increaseQuantity}
            disabled={quantity >= stock}
            className="flex h-12 w-12 items-center justify-center rounded-r-2xl transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={18} />
          </motion.button>

        </div>

        <div className="rounded-xl bg-green-50 px-4 py-3">

          <p className="text-sm font-medium text-green-700">
            Available :
            <span className="ml-1 font-bold">
              {stock}
            </span>
          </p>

        </div>

      </div>

      {stock <= 5 && stock > 0 && (
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">

          <p className="text-sm font-medium text-orange-600">
            Hurry! Only {stock} item
            {stock > 1 ? "s" : ""} left in stock.
          </p>

        </div>
      )}

      {stock === 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">

          <p className="text-sm font-medium text-red-600">
            Product is currently out of stock.
          </p>

        </div>
      )}

    </section>
  );
};

export default ProductQuantity;