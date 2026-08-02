import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ rotate: 180 }}
      transition={{ duration: 0.3 }}
      onClick={toggleTheme}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-green-200 bg-white/80 shadow-md backdrop-blur-xl transition hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
    >
      {darkMode ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-slate-700" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;