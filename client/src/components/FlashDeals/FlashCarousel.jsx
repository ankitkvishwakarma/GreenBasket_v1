import Autoplay from "embla-carousel-autoplay";
import { useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import FlashCard from "./FlashCard";

const FlashCarousel = ({ products }) => {
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: false,
      skipSnaps: false,
    },
    [autoplay.current]
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">

      {/* Left Arrow */}
      <button
        onClick={scrollPrev}
        className="absolute left-1 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-xl transition hover:scale-110 hover:bg-green-600 hover:text-white lg:flex"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollNext}
        className="absolute right-1 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-xl transition hover:scale-110 hover:bg-green-600 hover:text-white lg:flex"
      >
        <ChevronRight size={20} />
      </button>

      <div
        className="overflow-hidden"
        ref={emblaRef}
        onMouseEnter={() => autoplay.current.stop()}
        onMouseLeave={() => autoplay.current.play()}
      >
        <div className="flex">

          {products.map((product) => (
            <div
              key={product.id}
              className="
                flex-[0_0_90%]
                sm:flex-[0_0_50%]
                md:flex-[0_0_33.333%]
                lg:flex-[0_0_25%]
                xl:flex-[0_0_20%]
                px-2
              "
            >
              <FlashCard product={product} />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default FlashCarousel;