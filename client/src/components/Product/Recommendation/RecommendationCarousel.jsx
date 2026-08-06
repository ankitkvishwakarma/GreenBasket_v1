import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const RecommendationCarousel = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Left Arrow */}

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg transition hover:bg-green-600 hover:text-white lg:flex"
      >
        <ChevronLeft size={20} />
      </motion.button>

      {/* Right Arrow */}

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={scrollNext}
        className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg transition hover:bg-green-600 hover:text-white lg:flex"
      >
        <ChevronRight size={20} />
      </motion.button>

      {/* Embla Viewport */}

      <div
        ref={emblaRef}
        className="overflow-hidden"
      >
        {/* Embla Container */}

        <div className="flex gap-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCarousel;