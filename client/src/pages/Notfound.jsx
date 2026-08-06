import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Sparkles,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();

  // ================= Audio =================

  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 1;
          audioRef.current.currentTime = 0;

          await audioRef.current.play();
        }
      } catch (error) {
        console.log("Autoplay blocked:", error);
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">

      {/* ================= Background ================= */}

      {/* Left Glow */}

      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-green-300/20 blur-3xl" />

      {/* Right Glow */}

      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />

      {/* Floating Circle 1 */}

      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute left-20 top-24 h-16 w-16 rounded-full bg-green-200/40 blur-xl"
      />

      {/* Floating Circle 2 */}

      <motion.div
        animate={{
          y: [0, 25, 0],
          x: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
        }}
        className="absolute bottom-20 right-24 h-20 w-20 rounded-full bg-emerald-200/40 blur-xl"
      />

      {/* Floating Circle 3 */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute right-1/4 top-1/4 h-10 w-10 rounded-full bg-green-300/40 blur-lg"
      />

      {/* ================= Main Card ================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          relative
          z-10
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/70
          bg-white/80
          p-6
          shadow-2xl
          backdrop-blur-xl
        "
      >
                {/* Badge */}

        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-green-700">
            <Sparkles size={13} />
            Coming Soon
          </span>
        </div>

        {/* Rocket */}

        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="mx-auto mt-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg"
        >
          <Rocket
            size={30}
            className="text-white"
          />
        </motion.div>

        {/* Heading */}

        <h1 className="mt-6 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-center text-3xl font-extrabold text-transparent">
          Coming Soon
        </h1>

        <h2 className="mt-2 text-center text-xl font-bold text-gray-800">
          We're Building Something Amazing 🚀
        </h2>

        {/* Description */}

        <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-6 text-gray-500">
          This feature is currently under development.
          <br />
          Our team is working hard to deliver a faster,
          <br />
          smarter and more premium shopping experience.
        </p>

        {/* Divider */}

        <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Action Buttons */}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <button
            onClick={() => navigate(-1)}
            className="
              flex
              h-11
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-gray-200
              bg-white
              text-sm
              font-semibold
              text-gray-700
              transition-all
              duration-300
              hover:border-green-400
              hover:bg-green-50
              hover:text-green-600
            "
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

          <Link
            to="/"
            className="
              flex
              h-11
              flex-1
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-green-600
              to-emerald-500
              text-sm
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-xl
            "
          >
            <ShoppingBag size={17} />
            Continue Shopping
          </Link>

        </div>

        {/* Footer */}

        <div className="mt-6 border-t border-gray-100 pt-4">
          <p className="text-center text-[11px] uppercase tracking-[0.25em] text-gray-400">
            GreenBasket • Launching Soon
          </p>
        </div>

      </motion.div>

      {/* ================= Audio ================= */}

      <audio
        ref={audioRef}
        autoPlay
        preload="auto"
      >
        <source
          src="/audio/Ek_Glass_Kadak.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>

    </section>
  );
};

export default ComingSoon;