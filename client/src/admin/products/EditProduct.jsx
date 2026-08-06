import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import ProductForm from "./ProductForm";

import {
  updateProduct,
  getProducts,
} from "@/redux/admin/product/productThunk";

import {
  clearProductState,
} from "@/redux/admin/product/productSlice";

const EditProduct = ({
  open,
  onClose,
  product,
}) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.adminProduct
  );

  if (!open || !product) return null;

  const handleSubmit = async (formData) => {
    try {
      const result = await dispatch(
        updateProduct({
          id: product._id,
          productData: formData,
        })
      );

      if (updateProduct.fulfilled.match(result)) {
        toast.success(
          result.payload?.message ||
            "Product updated successfully"
        );

        await dispatch(getProducts());

        dispatch(clearProductState());

        onClose();
      } else {
        toast.error(
          result.payload ||
            "Failed to update product"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b bg-white p-5">
          <h2 className="text-2xl font-bold">
            Edit Product
          </h2>

          <button
            onClick={onClose}
            disabled={loading}
            className="text-3xl leading-none text-gray-500 hover:text-red-600"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <ProductForm
            initialData={product}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProduct;