import { useDispatch, useSelector } from "react-redux";
import { Trash2, X } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  deleteCategory,
  getCategories,
} from "@/redux/admin/category/AdminCategoryThunk";

import {
  resetCategoryState,
} from "@/redux/admin/category/AdminCategorySlice";

const DeleteCategoryModal = ({
  open,
  onClose,
  category,
}) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.category
  );

  if (!open || !category) return null;

  const handleDelete = async () => {
    try {
      const result = await dispatch(
        deleteCategory(category._id)
      );

      if (deleteCategory.fulfilled.match(result)) {
        toast.success(
          result.payload?.message ||
          "Category deleted successfully"
        );

        await dispatch(getCategories());

        dispatch(resetCategoryState());

        onClose();
      } else {
        toast.error(
          result.payload ||
          "Failed to delete category"
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
              Delete Category
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 p-6">
          <p className="text-gray-600">
            Are you sure you want to delete this
            category?
          </p>

          <div className="rounded-xl bg-red-50 p-4">
            <h3 className="font-semibold text-red-700">
              {category.name}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {category.description ||
                "No description available"}
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
            className="rounded-xl border px-5 py-2.5 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex min-w-[120px] items-center justify-center rounded-xl bg-red-600 px-5 py-2.5 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg
                  className="mr-2 h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-20"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-90"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;