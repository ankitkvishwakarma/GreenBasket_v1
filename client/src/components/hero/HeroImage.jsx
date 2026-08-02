import { motion } from "framer-motion";

const HeroImage = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center">

      {/* Background Glow */}
      <div className="absolute h-[280px] w-[280px] rounded-full bg-green-200/60 blur-3xl sm:h-[380px] sm:w-[380px] lg:h-[500px] lg:w-[500px]" />

      {/* Floating Leaf 1 */}
      <motion.img
        src="/images/leaves/leaf-1.png"
        alt=""
        className="absolute left-2 top-6 hidden w-8 opacity-70 lg:block"
        animate={{
          y: [0, -12, 0],
          rotate: [-8, 8, -8],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />

      {/* Floating Leaf 2 */}
      <motion.img
        src="/images/leaves/leaf-2.png"
        alt=""
        className="absolute right-6 top-10 hidden w-10 opacity-70 lg:block"
        animate={{
          y: [0, 14, 0],
          rotate: [8, -8, 8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />

      {/* Floating Leaf 3 */}
      <motion.img
        src="/images/leaves/leaf-3.png"
        alt=""
        className="absolute bottom-12 left-8 hidden w-10 opacity-70 lg:block"
        animate={{
          y: [0, -15, 0],
          rotate: [-10, 10, -10],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
      />

      {/* Basket Image */}
      <motion.img
        src="/hero-basket.png"
        alt="Fresh Grocery Basket"
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: [0, -8, 0],
          scale: 1,
        }}
        transition={{
          duration: 0.8,
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="
          relative z-10
          w-full
          max-w-[280px]
          sm:max-w-[360px]
          md:max-w-[460px]
          lg:max-w-[560px]
          xl:max-w-[620px]
          object-contain
          drop-shadow-[0_25px_40px_rgba(34,197,94,0.18)]
        "
      />
    </div>
  );
};

export default HeroImage;