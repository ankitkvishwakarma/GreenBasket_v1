import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO:
    // Backend Newsletter API
    // POST /api/newsletter

    console.log(email);

    setEmail("");
  };

  return (
    <section className="overflow-hidden rounded-[32px] bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 p-8 text-white shadow-2xl lg:p-12">

      <div className="grid items-center gap-10 lg:grid-cols-2">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-5 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
            📩 Newsletter
          </div>

          <h2 className="text-3xl font-extrabold leading-tight lg:text-5xl">
            Stay Updated
            <br />
            With GreenBasket
          </h2>

          <p className="mt-5 max-w-lg text-green-100">
            Subscribe to receive exclusive discounts, fresh arrivals,
            grocery tips and exciting offers directly in your inbox.
          </p>
        </motion.div>

        {/* Right */}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white p-3 shadow-xl"
        >

          <div className="flex flex-col gap-3 sm:flex-row">

            <div className="relative flex-1">

              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-gray-200
                  py-4
                  pl-12
                  pr-4
                  text-gray-700
                  outline-none
                  transition
                  focus:border-green-500
                "
              />

            </div>

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-green-600
                px-8
                py-4
                font-semibold
                text-white
                transition
                hover:bg-green-700
              "
            >
              Subscribe

              <Send size={18} />
            </motion.button>

          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            No spam. Unsubscribe anytime.
          </p>

        </motion.form>

      </div>

    </section>
  );
};

export default Newsletter;