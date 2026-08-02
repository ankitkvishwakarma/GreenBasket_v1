import { motion } from "framer-motion";

const BackgroundEffects = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      {/* Top Left Glow */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-green-400/30 blur-[120px]"
      />

      {/* Bottom Right Glow */}
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-300/30 blur-[140px]"
      />

      {/* Center Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-300/20 blur-[120px]"
      />

      {/* Floating Circles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
          }}
          className="absolute rounded-full bg-green-500/20"
          style={{
            width: 10 + i * 6,
            height: 10 + i * 6,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundEffects;