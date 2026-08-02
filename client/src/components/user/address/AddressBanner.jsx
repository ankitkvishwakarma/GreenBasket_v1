import { motion } from "framer-motion";
import {
  Plus,
  MapPinned,
  Truck,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const AddressBanner = ({ onAdd }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-lime-600 p-8 text-white shadow-xl"
    >
      {/* Decorative Circles */}

      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-lime-300/10 blur-3xl" />

      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="max-w-2xl">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">

            <MapPinned className="h-8 w-8" />

          </div>

          <h2 className="text-3xl font-bold leading-tight">

            Deliver Anywhere,

            <br />

            Anytime.

          </h2>

          <p className="mt-5 text-white/90 leading-7">

            Save multiple delivery addresses for your
            Home, Office and Family.

            Easily switch addresses during checkout
            without entering the details again.

          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            <div className="rounded-full bg-white/15 px-5 py-2 backdrop-blur">

              🚚 Fast Delivery

            </div>

            <div className="rounded-full bg-white/15 px-5 py-2 backdrop-blur">

              🔒 Secure Checkout

            </div>

            <div className="rounded-full bg-white/15 px-5 py-2 backdrop-blur">

              📍 Unlimited Addresses

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col items-start lg:items-end">

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="mb-6 hidden rounded-full bg-white/15 p-6 backdrop-blur lg:flex"
          >
            <Truck className="h-14 w-14" />
          </motion.div>

          <Button
            size="lg"
            onClick={onAdd}
            className="rounded-xl bg-white px-8 text-emerald-700 hover:bg-slate-100"
          >
            <Plus className="mr-2 h-5 w-5" />

            Add New Address

            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="mt-4 text-sm text-white/80">

            Save your favourite locations for faster ordering.

          </p>

        </div>

      </div>
    </motion.section>
  );
};

export default AddressBanner;