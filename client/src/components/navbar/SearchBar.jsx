import { useState } from "react";
import { Search, Mic, X } from "lucide-react";
import { motion } from "framer-motion";

const SearchBar = ({ mobile = false }) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`${
        mobile
          ? "flex w-full"
          : "hidden lg:flex flex-1 max-w-[640px]"
      }`}
    >
      <div
        className={`group flex h-12 w-full overflow-hidden rounded-2xl border bg-white/90 backdrop-blur-xl transition-all duration-300 ${
          focused
            ? "border-green-500 shadow-[0_0_0_4px_rgba(34,197,94,.12)]"
            : "border-gray-200 shadow-md hover:border-green-300 hover:shadow-lg"
        }`}
      >
        {/* Left */}
        <div className="flex flex-1 items-center px-4">

          <Search
            size={18}
            className="text-gray-400 transition-colors duration-300 group-focus-within:text-green-600"
          />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            type="text"
            placeholder="Search fresh vegetables, fruits, groceries..."
            className="ml-3 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="rounded-full p-2 transition hover:bg-gray-100"
            >
              <X
                size={16}
                className="text-gray-500"
              />
            </button>
          )}

          <button
            className="ml-1 rounded-full p-2 transition hover:bg-green-50"
          >
            <Mic
              size={18}
              className="text-green-600"
            />
          </button>

        </div>

        {/* Search Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="flex w-14 items-center justify-center bg-gradient-to-r from-green-600 to-emerald-500 text-white transition-all duration-300 hover:from-green-700 hover:to-emerald-600"
        >
          <Search size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SearchBar;