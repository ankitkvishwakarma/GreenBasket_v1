import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center justify-between gap-5 border-t border-gray-200 pt-8 text-sm text-gray-500 md:flex-row">
      {/* Left */}
      <p className="text-center md:text-left">
        © {currentYear} GreenBasket. All rights reserved.
      </p>

      {/* Center */}
      <div className="flex flex-wrap items-center justify-center gap-5">
        <Link
          to="/privacy"
          className="transition-colors duration-300 hover:text-green-600"
        >
          Privacy Policy
        </Link>

        <Link
          to="/terms"
          className="transition-colors duration-300 hover:text-green-600"
        >
          Terms & Conditions
        </Link>

        <Link
          to="/cookies"
          className="transition-colors duration-300 hover:text-green-600"
        >
          Cookie Policy
        </Link>
      </div>

      {/* Right */}
      <p className="flex items-center gap-2 text-center">
        Made with
        <Heart
          size={16}
          className="fill-red-500 text-red-500"
        />
        by GreenBasket
      </p>
    </div>
  );
};

export default Copyright;