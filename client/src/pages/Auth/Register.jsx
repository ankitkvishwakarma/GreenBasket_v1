import { motion } from "framer-motion";
import AuthBanner from "@/components/Auth/AuthBanner";
import RegisterForm from "@/components/Auth/RegisterForm";

const Register = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl grid grid-cols-1 lg:grid-cols-2"
      >
        {/* Left Banner */}
        <div className="hidden lg:block">
          <AuthBanner />
        </div>

        {/* Right Form */}
        <div className="flex items-center justify-center p-8 md:p-12">
          <RegisterForm />
        </div>
      </motion.div>
    </section>
  );
};

export default Register;