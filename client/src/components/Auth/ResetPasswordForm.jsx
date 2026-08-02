import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Reset Password 🔒
        </h1>

        <p className="mt-2 text-base text-gray-500">
          Create a new secure password for your account.
        </p>
      </motion.div>

      <form className="space-y-5">
        {/* New Password */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            New Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="h-12 w-full rounded-xl border border-gray-300 pl-11 pr-11 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Confirm Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              className="h-12 w-full rounded-xl border border-gray-300 pl-11 pr-11 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirm ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Update Button */}

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-green-600 text-base font-semibold text-white transition hover:bg-green-700"
        >
          Update Password
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-gray-600">
        Back to{" "}
        <Link
          to="/login"
          className="font-semibold text-green-600 hover:text-green-700"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default ResetPasswordForm;