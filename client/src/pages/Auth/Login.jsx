import { motion } from "framer-motion";
import LoginForm from "@/components/Auth/LoginForm";
import AuthBanner from "@/components/Auth/AuthBanner";

const Login = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100 px-4 py-5 lg:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="grid w-full max-w-[1120px] overflow-hidden rounded-2xl border border-green-100 bg-white shadow-xl lg:grid-cols-[1.05fr_0.95fr]"
      >
        {/* Left Banner */}
        <div className="hidden lg:block">
          <AuthBanner />
        </div>

        {/* Right Form */}
        <div className="flex items-center justify-center px-8 py-8 lg:px-10 lg:py-10">
          <LoginForm />
        </div>
      </motion.div>
    </section>
  );
};

export default Login;