const LowStockProducts = ({ products = [] }) => {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-bold text-red-600">
          Low Stock Products
        </h2>
      </div>

      <div className="divide-y">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div>
                <h3 className="font-semibold">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Remaining Stock
                </p>
              </div>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                {product.stock}
              </span>
            </div>
          ))
        ) : (
          <p className="p-6 text-center text-gray-500">
            Everything looks good 🎉
          </p>
        )}
      </div>
    </div>
  );
};

export default LowStockProducts;