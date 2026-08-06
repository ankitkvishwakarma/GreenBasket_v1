import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import {
  Package,
  Tag,
  FileText,
  ImagePlus,
  IndianRupee,
  Boxes,
  Upload,
  X,
} from "lucide-react";

const ProductForm = ({
  initialData = {},
  onSubmit,
  loading = false,
}) => {
  const { categories = [] } = useSelector(
    (state) => state.category
  );

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    Categories: "",
    brand: "",
    mrp: "",
    sellingPrice: "",
    stock: "",
    unit: "piece",
    weight: "",
    isAvailable: true,
    isFeatured: false,
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] =
    useState([]);

  useEffect(() => {
    if (initialData?._id) {
      setFormData({
        name: initialData.name || "",
        slug: initialData.slug || "",
        description:
          initialData.description || "",
        Categories:
          initialData.Categories?._id ||
          initialData.Categories ||
          "",
        brand: initialData.brand || "",
        mrp: initialData.mrp || "",
        sellingPrice:
          initialData.sellingPrice || "",
        stock: initialData.stock || "",
        unit:
          initialData.unit || "piece",
        weight:
          initialData.weight || "",
        isAvailable:
          initialData.isAvailable ??
          true,
        isFeatured:
          initialData.isFeatured ??
          false,
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
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

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

  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
    
    setPreviewImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };
  const handleSubmit = (e) => {
      e.preventDefault();

      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      images.forEach((image) => {
        data.append("images", image);
      });

      onSubmit(data);
    };

  return (
    <motion.form
    onSubmit={handleSubmit}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="space-y-8 rounded-3xl bg-white p-8 shadow-xl"
    >
      {/* ================================================= */}
      {/* Header */}
      {/* ================================================= */}

      <div className="border-b border-gray-200 pb-6">

        <h2 className="text-3xl font-bold text-gray-800">

          {initialData?._id
            ? "Update Product"
            : "Create Product"}

        </h2>

        <p className="mt-2 text-gray-500">

          Fill all product information before saving.

        </p>

      </div>

      {/* ================================================= */}
      {/* Basic Information */}
      {/* ================================================= */}

      <div className="rounded-2xl border border-gray-200 p-6">

        <div className="mb-6 flex items-center gap-3">

          <Package
            size={22}
            className="text-green-600"
          />

          <h3 className="text-xl font-semibold">

            Basic Information

          </h3>

        </div>

        {/* Part-2 Start Here */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Product Name */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">

              <Package size={18} />

              Product Name

            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              className="
        w-full
        rounded-xl
        border
        border-gray-300
        px-4
        py-3
        outline-none
        transition
        focus:border-green-500
        focus:ring-2
        focus:ring-green-100
      "
            />

          </div>

          {/* Product Slug */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">

              <Tag size={18} />

              Product Slug

            </label>

            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="fresh-apple"
              required
              className="
        w-full
        rounded-xl
        border
        border-gray-300
        px-4
        py-3
        outline-none
        transition
        focus:border-green-500
        focus:ring-2
        focus:ring-green-100
      "
            />

          </div>

          {/* Category */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">

              <Boxes size={18} />

              Category

            </label>

            <select
              name="Categories"
              value={formData.Categories}
              onChange={handleChange}
              required
              className="
        w-full
        rounded-xl
        border
        border-gray-300
        bg-white
        px-4
        py-3
        outline-none
        transition
        focus:border-green-500
        focus:ring-2
        focus:ring-green-100
      "
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

          {/* Brand */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">

              <Tag size={18} />

              Brand

            </label>

            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="GreenBasket"
              className="
        w-full
        rounded-xl
        border
        border-gray-300
        px-4
        py-3
        outline-none
        transition
        focus:border-green-500
        focus:ring-2
        focus:ring-green-100
      "
            />

          </div>

        </div>

        {/* Description */}

        <div className="mt-6">

          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">

            <FileText size={18} />

            Product Description

          </label>

          <textarea
            rows={6}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write product description..."
            required
            className="
      w-full
      rounded-xl
      border
      border-gray-300
      px-4
      py-3
      outline-none
      transition
      focus:border-green-500
      focus:ring-2
      focus:ring-green-100
    "
          />

        </div>

        {/* Pricing Section */}

        <div className="mt-10 rounded-2xl border border-gray-200 p-6">

          <div className="mb-6 flex items-center gap-3">

            <IndianRupee
              size={22}
              className="text-green-600"
            />

            <h3 className="text-xl font-semibold">

              Pricing & Inventory

            </h3>

          </div>

          {/* ===== Part-3 Start Here ===== */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* MRP */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">

                <IndianRupee size={18} />

                MRP

              </label>

              <div className="relative">

                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="number"
                  name="mrp"
                  value={formData.mrp}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                  min="0"
                  className="
          w-full
          rounded-xl
          border
          border-gray-300
          py-3
          pl-10
          pr-4
          outline-none
          transition
          focus:border-green-500
          focus:ring-2
          focus:ring-green-100
        "
                />

              </div>

            </div>

            {/* Selling Price */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">

                <IndianRupee size={18} />

                Selling Price

              </label>

              <div className="relative">

                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600"
                />

                <input
                  type="number"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                  min="0"
                  className="
          w-full
          rounded-xl
          border
          border-gray-300
          py-3
          pl-10
          pr-4
          outline-none
          transition
          focus:border-green-500
          focus:ring-2
          focus:ring-green-100
        "
                />

              </div>

            </div>

            {/* Stock */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">

                <Boxes size={18} />

                Stock

              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Available Stock"
                required
                min="0"
                className="
        w-full
        rounded-xl
        border
        border-gray-300
        px-4
        py-3
        outline-none
        transition
        focus:border-green-500
        focus:ring-2
        focus:ring-green-100
      "
              />

            </div>

            {/* Unit */}

            <div>

              <label className="mb-2 text-sm font-semibold text-gray-700">

                Unit

              </label>

              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="
        w-full
        rounded-xl
        border
        border-gray-300
        bg-white
        px-4
        py-3
        outline-none
        transition
        focus:border-green-500
        focus:ring-2
        focus:ring-green-100
      "
              >

                <option value="piece">Piece</option>
                <option value="kg">Kilogram</option>
                <option value="g">Gram</option>
                <option value="ltr">Liter</option>
                <option value="ml">Milliliter</option>
                <option value="packet">Packet</option>
                <option value="box">Box</option>

              </select>

            </div>

            {/* Weight */}

            <div>

              <label className="mb-2 text-sm font-semibold text-gray-700">

                Weight

              </label>

              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="500"
                min="0"
                className="
        w-full
        rounded-xl
        border
        border-gray-300
        px-4
        py-3
        outline-none
        transition
        focus:border-green-500
        focus:ring-2
        focus:ring-green-100
      "
              />

            </div>

            {/* Discount Preview */}

            <div
              className="
      rounded-2xl
      border
      border-green-200
      bg-gradient-to-br
      from-green-50
      to-white
      p-5
    "
            >

              <h4 className="font-semibold text-green-700">

                Price Summary

              </h4>

              <div className="mt-4 space-y-2">

                <div className="flex justify-between">

                  <span className="text-gray-500">

                    MRP

                  </span>

                  <span className="font-semibold">

                    ₹{formData.mrp || 0}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">

                    Selling

                  </span>

                  <span className="font-semibold text-green-600">

                    ₹{formData.sellingPrice || 0}

                  </span>

                </div>

                <hr />

                <div className="flex justify-between">

                  <span className="font-medium">

                    Discount

                  </span>

                  <span className="font-bold text-red-500">

                    ₹
                    {Math.max(
                      0,
                      Number(formData.mrp || 0) -
                      Number(formData.sellingPrice || 0)
                    )}

                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* ============================= */}
          {/* Image Upload Section */}
          {/* ============================= */}

          <div className="mt-10 rounded-2xl border border-gray-200 p-6">

            <div className="mb-6 flex items-center gap-3">

              <ImagePlus
                size={22}
                className="text-green-600"
              />

              <h3 className="text-xl font-semibold">

                Product Images

              </h3>

            </div>

            {/* ===== Part-4 Start Here ===== */}
            <div className="space-y-6">

              <label
                htmlFor="images"
                className="
      flex
      cursor-pointer
      flex-col
      items-center
      justify-center
      rounded-3xl
      border-2
      border-dashed
      border-green-300
      bg-gradient-to-br
      from-green-50
      to-white
      py-14
      transition
      hover:border-green-500
      hover:bg-green-100
    "
              >

                <Upload
                  size={48}
                  className="mb-4 text-green-600"
                />

                <h3 className="text-lg font-semibold">

                  Upload Product Images

                </h3>

                <p className="mt-2 text-center text-sm text-gray-500">

                  PNG, JPG, JPEG, WEBP

                  <br />

                  Maximum 5 Images

                </p>

                <input
                  id="images"
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImages}
                />

              </label>

              {/* Preview */}

              {previewImages.length > 0 && (

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">

                  {previewImages.map(
                    (image, index) => (

                      <div
                        key={index}
                        className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              bg-white
              shadow
            "
                      >

                        <img
                          src={image}
                          alt=""
                          className="
                h-40
                w-full
                object-cover
              "
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(index)
                          }
                          className="
                absolute
                right-2
                top-2
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-red-600
                text-white
                opacity-0
                transition
                group-hover:opacity-100
              "
                        >

                          <X size={18} />

                        </button>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

            {/* ================================= */}

            <div className="mt-10 rounded-2xl border border-gray-200 p-6">

              <h3 className="mb-6 text-xl font-semibold">

                Product Status

              </h3>

              <div className="grid gap-5 md:grid-cols-2">

                <label
                  className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        p-5
      "
                >

                  <div>

                    <h4 className="font-semibold">

                      Product Available

                    </h4>

                    <p className="text-sm text-gray-500">

                      Customers can purchase this product.

                    </p>

                  </div>

                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleChange}
                    className="h-5 w-5"
                  />

                </label>

                <label
                  className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        p-5
      "
                >

                  <div>

                    <h4 className="font-semibold">

                      Featured Product

                    </h4>

                    <p className="text-sm text-gray-500">

                      Show on Home Page.

                    </p>

                  </div>

                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="h-5 w-5"
                  />

                </label>

              </div>

            </div>

            {/* ================================= */}

            <div className="mt-10 border-t pt-8">
              <div className="flex items-center justify-end gap-4">

                <button
                  type="reset"
                  className="
      rounded-xl
      border
      border-gray-300
      px-6
      py-3
      font-medium
      transition
      hover:bg-gray-100
    "
                >
                  Reset
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="
      rounded-xl
      bg-gradient-to-r
      from-green-600
      to-emerald-600
      px-8
      py-3
      font-semibold
      text-white
      shadow-lg
      transition
      hover:from-green-700
      hover:to-emerald-700
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
                >
                  {loading
                    ? "Saving..."
                    : initialData?._id
                      ? "Update Product"
                      : "Create Product"}
                </button>

              </div>

              {/* ===== Part-5 Start Here ===== */}

            </div>
          </div>
        </div>
      </div>

    </motion.form>
  );
};

export default ProductForm;