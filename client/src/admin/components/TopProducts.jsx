const TopProducts = ({ products = [] }) => {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-bold">
          Top Selling Products
        </h2>
      </div>

      <div className="divide-y">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="flex items-center gap-4 p-4 hover:bg-gray-50"
            >
              <img
                src={product.images?.[0] || "/images/product-placeholder.png"}
                alt={product.name}
                className="h-14 w-14 rounded-lg object-cover border"
              />

              <div className="flex-1">
                <h3 className="font-semibold">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Sold : {product.totalSold || 0}
                </p>
              </div>

              <div className="font-bold text-green-600">
                ₹{product.price}
              </div>
            </div>
          ))
        ) : (
          <p className="p-6 text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default TopProducts;