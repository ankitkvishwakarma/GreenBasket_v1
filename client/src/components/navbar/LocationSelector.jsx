import { MapPin, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
  
const LocationSelector = () => {
    
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="flex shrink-0 items-center gap-3 rounded-2xl border border-gray-200 px-4 py-2 shadow-sm transition-all hover:border-green-500 hover:shadow-md"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
        <MapPin className="h-5 w-5 text-green-600" />
      </div>

      <div className="text-left">
        <p className="text-xs text-gray-500">
          Deliver To
        </p>

        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold text-gray-800">
            Ranchi
          </span>

          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </motion.button>
  );
};

export default LocationSelector;