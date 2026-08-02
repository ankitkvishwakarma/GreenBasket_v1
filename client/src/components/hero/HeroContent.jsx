import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
// import HeroButtons from "./HeroButtons";
// import HeroFeatures from "./HeroFeatures";

const HeroContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-[560px] text-center lg:text-left"
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-2">
        <Sparkles size={16} className="text-green-600" />

        <span className="text-sm font-medium text-green-700">
          Fresh • Organic • Fast Delivery
        </span>
      </div>

      {/* Heading */}
      <h1 className="mt-6 font-extrabold leading-[1.05] text-gray-900 text-4xl sm:text-5xl lg:text-[40px] xl:text-[62px]">
        Fresh Grocery

        <span className="block text-green-600">
          Delivered
        </span>

        <span className="block">
          To Your Doorstep
        </span>
      </h1>

      {/* Description */}
      <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-gray-500 lg:mx-0 lg:text-lg">
        Get the freshest vegetables, fruits and groceries delivered to your
        home with love and care.
      </p>

      {/* Buttons */}
      {/* <div className="mt-8 flex justify-center lg:justify-start">
        <HeroButtons />
      </div> */}

      {/* Features */}
      {/* <div className="mt-10">
        <HeroFeatures />
      </div> */}
    </motion.div>
  );
};

export default HeroContent;