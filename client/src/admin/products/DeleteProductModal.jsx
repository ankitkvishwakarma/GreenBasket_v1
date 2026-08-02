import { useDispatch, useSelector } from "react-redux";
import { Trash2, X } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  deleteProduct,
  getProducts,
} from "@/redux/admin/product/productThunk";

import {
  resetProductState,
} from "@/redux/admin/product/productSlice";

const DeleteProductModal = ({
  open,
  onClose,
  product,
}) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.product
  );

  if (!open || !product) return null;

  const handleDelete = async () => {
    try {
      const result = await dispatch(
        deleteProduct(product._id)
      );

      if (deleteProduct.fulfilled.match(result)) {
        toast.success(
          result.payload?.message ||
          "Product deleted successfully"
        );

        await dispatch(getProducts());

        dispatch(resetProductState());

        onClose();
      } else {
        toast.error(
          result.payload ||
          "Failed to delete product"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-100 p-3">
              <Trash2
                size={22}
                className="text-red-600"
              />
            </div>

            <h2 className="text-xl font-semibold">
              Delete Product
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 transition hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 p-6">
          <p className="text-gray-600">
            Are you sure you want to delete this
            product?
          </p>

          <div className="rounded-xl bg-red-50 p-4">
            <h3 className="font-semibold text-red-700">
              {product.name}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              SKU: {product.sku || "-"}
            </p>

            <p className="text-sm text-gray-500">
              Price: ₹{product.price}
            </p>

            <p className="text-sm text-gray-500">
              Stock: {product.stock}
            </p>
          </div>

          <p className="text-sm font-medium text-red-500">
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 border-t p-5">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border px-5 py-2.5 transition hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;