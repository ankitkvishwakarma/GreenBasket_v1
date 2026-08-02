import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import CategoryForm from "./CategoryForm";

import {
  createCategory,
  getCategories,
} from "@/redux/admin/category/AdminCategoryThunk";

import {
  resetCategoryState,
} from "@/redux/admin/category/AdminCategorySlice";

const AddCategory = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.category);

  if (!open) return null;

  const handleSubmit = async (formData) => {
    try {
      const result = await dispatch(createCategory(formData));

      if (createCategory.fulfilled.match(result)) {
        toast.success(
          result.payload?.message || "Category created successfully"
        );

        await dispatch(getCategories());

        dispatch(resetCategoryState());

        onClose();
      } else {
        toast.error(
          result.payload || "Failed to create category"
        );
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <CategoryForm
        mode="add"
        loading={loading}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    </div>
  );
};

export default AddCategory;