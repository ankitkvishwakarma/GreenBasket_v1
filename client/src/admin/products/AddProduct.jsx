import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import ProductForm from "./ProductForm";

import {
  createProduct,
  getProducts,
} from "@/redux/admin/product/productThunk";

import {
  resetProductState,
} from "@/redux/admin/product/productSlice";

const AddProduct = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.product
  );

  if (!open) return null;

  const handleSubmit = async (formData) => {
    try {
      const result = await dispatch(
        createProduct(formData)
      );

      if (createProduct.fulfilled.match(result)) {
        toast.success(
          result.payload?.message ||
          "Product created successfully"
        );

        await dispatch(getProducts());

        dispatch(resetProductState());

        onClose();
      } else {
        toast.error(
          result.payload ||
          "Failed to create product"
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
            Add Product
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
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;