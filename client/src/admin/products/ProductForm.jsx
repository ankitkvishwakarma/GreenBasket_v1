import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Upload, X } from "lucide-react";

const ProductForm = ({
  initialData = {},
  onSubmit,
  loading = false,
}) => {
  const { categories } = useSelector(
    (state) => state.category
  );

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    sku: "",
    unit: "",
    weight: "",
    isFeatured: false,
    isBestSeller: false,
    isActive: true,
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] =
    useState([]);

  useEffect(() => {
    if (initialData?._id) {
      setFormData({
        name: initialData.name || "",
        category:
          initialData.category?._id ||
          initialData.category ||
          "",
        brand: initialData.brand || "",
        description:
          initialData.description || "",
        price: initialData.price || "",
        discountPrice:
          initialData.discountPrice || "",
        stock: initialData.stock || "",
        sku: initialData.sku || "",
        unit: initialData.unit || "",
        weight: initialData.weight || "",
        isFeatured:
          initialData.isFeatured || false,
        isBestSeller:
          initialData.isBestSeller || false,
        isActive:
          initialData.isActive ?? true,
      });

      if (initialData.images) {
        setPreviewImages(
          initialData.images.map(
            (img) => img.url
          )
        );
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    setPreviewImages(
      files.map((file) =>
        URL.createObjectURL(file)
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(
      ([key, value]) => {
        data.append(key, value);
      }
    );

    images.forEach((image) => {
      data.append("images", image);
    });

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Product Name
          </label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-xl border p-3"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Brand
          </label>

          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            SKU
          </label>

          <input
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Discount Price
          </label>

          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Unit
          </label>

          <input
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Weight
          </label>

          <input
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full rounded-xl border p-3"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Product Images
        </label>

        <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed p-8">
          <Upload className="mr-2" />
          Upload Images

          <input
            type="file"
            multiple
            hidden
            accept="image/*"
            onChange={handleImages}
          />
        </label>

        {previewImages.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {previewImages.map(
              (image, index) => (
                <div
                  key={index}
                  className="relative"
                >
                  <img
                    src={image}
                    alt=""
                    className="h-24 w-24 rounded-lg border object-cover"
                  />

                  <button
                    type="button"
                    className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-5">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
          Featured
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isBestSeller"
            checked={formData.isBestSeller}
            onChange={handleChange}
          />
          Best Seller
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          Active
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : initialData?._id
          ? "Update Product"
          : "Create Product"}
      </button>
    </form>
  );
};

export default ProductForm;