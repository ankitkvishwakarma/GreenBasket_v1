import { useEffect, useState } from "react";
import { X, UploadCloud } from "lucide-react";

const initialState = {
  name: "",
  description: "",
  isActive: true,
};

const CategoryForm = ({
  mode = "add",
  initialData = null,
  loading = false,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState(initialState);

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        isActive:
          initialData.isActive === undefined
            ? true
            : initialData.isActive,
      });

      setPreview(initialData.image?.url || "");
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }

    if (formData.name.length > 50) {
      newErrors.name =
        "Maximum 50 characters allowed";
    }

    if (formData.description.length > 300) {
      newErrors.description =
        "Maximum 300 characters allowed";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const submitData = new FormData();

    submitData.append("name", formData.name);

    submitData.append(
      "description",
      formData.description
    );

    submitData.append(
      "isActive",
      formData.isActive
    );

    if (image) {
      submitData.append("image", image);
    }

    onSubmit(submitData);
  };
    return (
    <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-2xl font-bold">
          {mode === "edit" ? "Edit Category" : "Add Category"}
        </h2>

        <button
          onClick={onClose}
          className="rounded-lg p-2 transition hover:bg-gray-100"
          type="button"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 p-6">

        {/* Category Name */}
        <div>
          <label className="mb-2 block font-medium">
            Category Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            className={`w-full rounded-xl border px-4 py-3 outline-none transition
              ${
                errors.name
                  ? "border-red-500"
                  : "focus:border-green-600"
              }`}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write category description..."
            className={`w-full rounded-xl border px-4 py-3 outline-none transition
              ${
                errors.description
                  ? "border-red-500"
                  : "focus:border-green-600"
              }`}
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="mb-2 block font-medium">
            Category Image
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 transition hover:border-green-500">
            <UploadCloud
              size={42}
              className="mb-3 text-green-600"
            />

            <span className="font-medium">
              Click to Upload Image
            </span>

            <span className="mt-1 text-sm text-gray-500">
              JPG, PNG, WEBP
            </span>

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImage}
            />
          </label>

          {preview && (
            <div className="mt-5">
              <img
                src={preview}
                alt="Preview"
                className="h-36 w-36 rounded-xl border object-cover"
              />
            </div>
          )}
        </div>

        {/* Active Status */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-5 w-5"
          />

          <label
            htmlFor="isActive"
            className="font-medium"
          >
            Active Category
          </label>
        </div>
                {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-4 border-t pt-6">

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex min-w-[160px] items-center justify-center rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
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

                Saving...
              </>
            ) : mode === "edit" ? (
              "Update Category"
            ) : (
              "Create Category"
            )}
          </button>

        </div>

      </form>

    </div>
  );
};

export default CategoryForm;