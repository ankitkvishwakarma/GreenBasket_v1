import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Countdown = () => {
  // Target time sirf ek baar create hoga
  const targetTime = useRef(
    Date.now() + 24 * 60 * 60 * 1000
  );

  const getTimeLeft = () => {
    const difference = targetTime.current - Date.now();

    if (difference <= 0) {
      return {
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    return {
      hours: String(
        Math.floor((difference / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0"),

      minutes: String(
        Math.floor((difference / (1000 * 60)) % 60)
      ).padStart(2, "0"),

      seconds: String(
        Math.floor((difference / 1000) % 60)
      ).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeBox = ({ label, value }) => (
    <motion.div
      whileHover={{ scale: 1.08 }}
      animate={{ y: [0, -2, 0] }}
      transition={{
        duration: 1,
        repeat: Infinity,
      }}
      className="
      flex
      h-14
      w-14
      sm:h-16
      sm:w-16
      flex-col
      items-center
      justify-center
      rounded-2xl
      bg-green-600
      text-white
      shadow-lg
      "
    >
      <span className="text-lg sm:text-xl font-bold">
        {value}
      </span>

      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest opacity-80">
        {label}
      </span>
    </motion.div>
  );

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <TimeBox label="Hours" value={timeLeft.hours} />

      <span className="text-xl sm:text-2xl font-bold text-green-600">
        :
      </span>

      <TimeBox label="Min" value={timeLeft.minutes} />

      <span className="text-xl sm:text-2xl font-bold text-green-600">
        :
      </span>

      <TimeBox label="Sec" value={timeLeft.seconds} />
    </div>
  );
};

export default Countdown;