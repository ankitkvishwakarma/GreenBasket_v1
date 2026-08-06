import { motion } from "framer-motion";

const ThumbnailGallery = ({
  images = [],
  selectedImage,
  setSelectedImage,
}) => {
  if (!images.length) return null;

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">

      {images.map((image, index) => {
        const active =
          selectedImage?.url === image.url;

        return (
          <motion.button
            key={index}
            whileHover={{
              y: -3,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              setSelectedImage(image)
            }
            className={`
              relative
              h-24
              w-24
              flex-shrink-0
              overflow-hidden
              rounded-2xl
              border-2
              bg-white
              transition-all
              duration-300

              ${
                active
                  ? "border-green-600 shadow-lg"
                  : "border-gray-200 hover:border-green-400"
              }
            `}
          >

            <img
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              loading="lazy"
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-300
                hover:scale-110
              "
            />

            {active && (

              <div
                className="
                  absolute
                  inset-0
                  rounded-2xl
                  ring-2
                  ring-green-500
                "
              />

            )}

          </motion.button>
        );
      })}

    </div>
  );
};

export default ThumbnailGallery;