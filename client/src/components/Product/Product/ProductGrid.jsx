import ProductCard from "@/components/Product/Product/ProductCard";

const ProductGrid = ({ products = [] }) => {
  return (
    <div
      className="
        grid
        gap-6

        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;