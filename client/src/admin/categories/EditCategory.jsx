import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import CategoryForm from "./CategoryForm";

import {
  updateCategory,
  getCategories,
} from "@/redux/admin/category/AdminCategoryThunk";

import {
  resetCategoryState,
} from "@/redux/admin/category/AdminCategorySlice";

const EditCategory = ({
  open,
  onClose,
  category,
}) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.category
  );

  if (!open || !category) return null;

  const handleSubmit = async (formData) => {
    try {
      const result = await dispatch(
        updateCategory({
          id: category._id,
          categoryData: formData,
        })
      );

      if (updateCategory.fulfilled.match(result)) {
        toast.success(
          result.payload?.message ||
          "Category updated successfully"
        );

        await dispatch(getCategories());

        dispatch(resetCategoryState());

        onClose();
      } else {
        toast.error(
          result.payload || "Failed to update category"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <CategoryForm
        mode="edit"
        initialData={category}
        loading={loading}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    </div>
  );
};

export default EditCategory;