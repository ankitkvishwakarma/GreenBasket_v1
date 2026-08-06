import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import MainImage from "./MainImage";
import ThumbnailGallery from "./ThumbnailGallery";
import ProductBadge from "./ProductBadge";
import ImageZoom from "./ImageZoom";

const ProductGallery = ({ product }) => {
  const [selectedImage, setSelectedImage] =
    useState(null);

  const [zoomOpen, setZoomOpen] =
    useState(false);

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  if (!product) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -40,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="space-y-6"
    >
      {/* Main Gallery */}

      <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

        <ProductBadge
          product={product}
        />

        <MainImage
          image={selectedImage}
          onZoom={() =>
            setZoomOpen(true)
          }
        />

      </div>

      {/* Thumbnail Gallery */}

      <ThumbnailGallery
        images={product.images || []}
        selectedImage={selectedImage}
        setSelectedImage={
          setSelectedImage
        }
      />

      {/* Image Zoom */}

      <ImageZoom
        open={zoomOpen}
        image={selectedImage}
        onClose={() =>
          setZoomOpen(false)
        }
      />

    </motion.div>
  );
};

export default ProductGallery;