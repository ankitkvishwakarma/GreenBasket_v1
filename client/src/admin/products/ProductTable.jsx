import { Pencil, Trash2 } from "lucide-react";

const ProductTable = ({
  products = [],
  loading = false,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        <div className="text-center text-gray-500">
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-4 text-left">#</th>
              <th className="px-5 py-4 text-left">Image</th>
              <th className="px-5 py-4 text-left">Product</th>
              <th className="px-5 py-4 text-left">Category</th>
              <th className="px-5 py-4 text-left">Brand</th>
              <th className="px-5 py-4 text-center">Price</th>
              <th className="px-5 py-4 text-center">Stock</th>
              <th className="px-5 py-4 text-center">Status</th>
              <th className="px-5 py-4 text-center">Featured</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="py-12 text-center text-gray-500"
                >
                  No Products Found
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr
                  key={product._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    {index + 1}
                  </td>

                  <td className="px-5 py-4">
                    <img
                      src={
                        product.images?.[0]?.url ||
                        "/images/no-image.png"
                      }
                      alt={product.name}
                      className="h-14 w-14 rounded-lg border object-cover"
                    />
                  </td>

                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold">
                        {product.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        SKU : {product.sku || "-"}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    {product.Categories?.name || "-"}
                  </td>

                  <td className="px-5 py-4">
                    {product.brand || "-"}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <div>
                      <p className="font-semibold text-green-600">
                        ₹{product.sellingPrice}
                      </p>

                      {product.mrp > product.sellingPrice && (
                        <p className="text-xs text-gray-400 line-through">
                          ₹{product.mrp}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        product.stock > 10
                          ? "bg-green-100 text-green-700"
                          : product.stock > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        product.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.isAvailable
                        ? "Available"
                        : "Out of Stock"}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        product.isFeatured
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {product.isFeatured ? "Yes" : "No"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onEdit(product)}
                        className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(product)}
                        className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ProductTable;