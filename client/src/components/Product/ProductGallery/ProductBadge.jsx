import {
  Award,
  Leaf,
  Sparkles,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const ProductBadge = ({ product }) => {
  if (!product) return null;

  const badges = [];

  // Organic
  if (product.isOrganic) {
    badges.push({
      label: "Organic",
      icon: <Leaf size={14} />,
      className:
        "bg-emerald-600 text-white",
    });
  }

  // Featured
  if (product.isFeatured) {
    badges.push({
      label: "Featured",
      icon: <Sparkles size={14} />,
      className:
        "bg-yellow-500 text-white",
    });
  }

  // Best Seller
  if (product.sold >= 100) {
    badges.push({
      label: "Best Seller",
      icon: <Award size={14} />,
      className:
        "bg-red-500 text-white",
    });
  }

  // Trending
  if (product.sold >= 50) {
    badges.push({
      label: "Trending",
      icon: <TrendingUp size={14} />,
      className:
        "bg-blue-600 text-white",
    });
  }

  // Low Stock
  if (
    product.stock > 0 &&
    product.stock <= 5
  ) {
    badges.push({
      label: `Only ${product.stock} Left`,
      icon: (
        <AlertTriangle size={14} />
      ),
      className:
        "bg-orange-500 text-white",
    });
  }

  // Discount
  if (
    product.mrp >
    product.sellingPrice
  ) {
    const discount = Math.round(
      ((product.mrp -
        product.sellingPrice) /
        product.mrp) *
        100
    );

    badges.push({
      label: `${discount}% OFF`,
      className:
        "bg-green-600 text-white",
    });
  }

  if (!badges.length) return null;

  return (
    <div className="absolute left-5 top-5 z-20 flex flex-col gap-3">

      {badges.map(
        (badge, index) => (
          <div
            key={index}
            className={`
              flex
              items-center
              gap-2
              rounded-full
              px-4
              py-2
              text-xs
              font-semibold
              shadow-lg
              backdrop-blur-md
              ${badge.className}
            `}
          >

            {badge.icon}

            <span>
              {badge.label}
            </span>

          </div>
        )
      )}

    </div>
  );
};

export default ProductBadge;