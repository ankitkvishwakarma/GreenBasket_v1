import { motion } from "framer-motion";
import {
  Expand,
  ImageOff,
} from "lucide-react";

const MainImage = ({
  image,
  onZoom,
}) => {
  return (
    <div
      className="
        group
        relative
        flex
        aspect-square
        items-center
        justify-center
        overflow-hidden
        rounded-3xl
        bg-gradient-to-br
        from-gray-50
        to-white
        p-8
      "
    >
      {image?.url ? (
        <motion.img
          key={image.url}
          src={image.url}
          alt="Product"
          loading="lazy"
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            h-full
            w-full
            cursor-zoom-in
            object-contain
            transition-transform
            duration-500
            group-hover:scale-110
          "
          onClick={onZoom}
        />
      ) : (
        <div className="flex flex-col items-center gap-3 text-gray-400">

          <ImageOff size={55} />

          <p className="text-sm">

            Image Not Available

          </p>

        </div>
      )}

      {/* Zoom Button */}

      {image?.url && (
        <button
          onClick={onZoom}
          className="
            absolute
            bottom-5
            right-5
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-white/90
            shadow-lg
            backdrop-blur-md
            transition
            hover:bg-green-600
            hover:text-white
          "
        >
          <Expand size={20} />
        </button>
      )}

      {/* Shine Effect */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

    </div>
  );
};

export default MainImage;