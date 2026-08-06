import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const ImageZoom = ({
  open,
  image,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener(
        "keydown",
        handleKeyDown
      );
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={onClose}
          className="
            fixed
            inset-0
            z-[999]
            flex
            items-center
            justify-center
            bg-black/80
            backdrop-blur-md
            p-5
          "
        >

          <motion.div
            initial={{
              scale: 0.92,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.92,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
            className="
              relative
              flex
              max-h-[90vh]
              max-w-6xl
              items-center
              justify-center
            "
          >

            <img
              src={image?.url}
              alt="Zoomed Product"
              className="
                max-h-[90vh]
                max-w-full
                rounded-3xl
                object-contain
                shadow-2xl
              "
            />

            <button
              onClick={onClose}
              className="
                absolute
                right-4
                top-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-white
                text-gray-700
                shadow-xl
                transition
                hover:bg-red-500
                hover:text-white
              "
            >

              <X size={22} />

            </button>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
};

export default ImageZoom;