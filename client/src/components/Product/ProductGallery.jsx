import { useState } from "react";
import { motion } from "framer-motion";

const ProductGallery = ({ product }) => {
  const images =
    product?.images?.length > 0
      ? product.images
      : [{ url: "/images/product-placeholder.png" }];

  const [selectedImage, setSelectedImage] = useState(images[0]?.url);

  return (
    <div className="space-y-5">
      {/* Main Image */}
      <motion.div
        layout
        className="overflow-hidden rounded-3xl border border-gray-200 bg-white"
      >
        <motion.img
          key={selectedImage}
          src={selectedImage}
          alt={product?.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-[500px] w-full object-cover"
        />
      </motion.div>

      {/* Thumbnail Images */}
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedImage(image.url)}
            className={`overflow-hidden rounded-2xl border-2 transition ${
              selectedImage === image.url
                ? "border-green-600"
                : "border-gray-200"
            }`}
          >
            <img
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className="h-24 w-24 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;