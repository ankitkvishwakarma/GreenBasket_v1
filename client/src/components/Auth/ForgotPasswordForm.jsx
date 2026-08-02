import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPasswordForm = () => {
  return (
    <div className="mx-auto w-full max-w-[420px]">
      {/* Heading */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Forgot Password?
        </h1>

        <p className="mt-2 text-base text-gray-500">
          Enter your registered email address and we'll send you a password
          reset link.
        </p>
      </motion.div>

      {/* Form */}

      <form className="space-y-5">
        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              placeholder="Enter your email"
              className="h-12 w-full rounded-xl border border-gray-300 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />
          </div>
        </div>

        {/* Button */}

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-green-600 text-base font-semibold text-white transition hover:bg-green-700"
        >
          Send Reset Link
        </button>
      </form>

      {/* Back to Login */}

      <Link
        to="/login"
        className="mt-7 flex items-center justify-center gap-2 text-sm font-medium text-green-600 transition hover:text-green-700"
      >
        <ArrowLeft size={18} />
        Back to Login
      </Link>
    </div>
  );
};

export default ForgotPasswordForm;