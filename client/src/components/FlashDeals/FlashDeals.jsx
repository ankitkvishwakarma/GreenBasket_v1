import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Countdown from "./Countdown";
import FlashCard from "./FlashCard";
import { flashDeals } from "./flashData";
import FlashCarousel from "./FlashCarousel";

const FlashDeals = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        >

          {/* Left */}
          <div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">

              <Zap className="fill-orange-500 text-orange-500" size={18} />

              Flash Deals

            </div>

            <h2 className="text-4xl font-extrabold text-gray-900">
              Limited Time Offers
            </h2>

            <p className="mt-3 text-gray-500">
              Hurry up! Best prices available only for a short time.
            </p>

          </div>

          {/* Right */}

          <div className="flex flex-col items-start gap-4 lg:items-end">

            <Countdown />

            <button className="group flex items-center gap-2 font-semibold text-green-600 transition hover:text-green-700">

              View All

              <ArrowRight
                className="transition group-hover:translate-x-1"
                size={18}
              />

            </button>

          </div>

        </motion.div>

        {/* Cards */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <FlashCarousel products={flashDeals} />
        </motion.div>
      </div>
    </section>
  );
};

export default FlashDeals;