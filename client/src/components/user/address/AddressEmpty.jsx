import { motion } from "framer-motion";
import { MapPinned, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddressEmpty = ({ onAdd }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-100 px-10 py-20">

        {/* Background Blur */}
        <div className="absolute -top-24 -left-24 h-60 w-60 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="absolute -bottom-24 -right-24 h-60 w-60 rounded-full bg-lime-200/30 blur-3xl" />

        <div className="relative mx-auto flex max-w-xl flex-col items-center text-center">

          {/* Icon */}

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100"
          >
            <MapPinned className="h-14 w-14 text-emerald-600" />
          </motion.div>

          {/* Heading */}

          <h2 className="text-3xl font-bold text-slate-900">
            No Address Added Yet
          </h2>

          {/* Description */}

          <p className="mt-5 max-w-md text-slate-600 leading-7">
            Add your delivery address to enjoy
            faster checkout, secure deliveries
            and seamless order tracking.
          </p>

          {/* Features */}

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <div className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-medium text-emerald-700">
              Fast Checkout
            </div>

            <div className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-medium text-emerald-700">
              Secure Delivery
            </div>

            <div className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-medium text-emerald-700">
              Saved Locations
            </div>

          </div>

          {/* CTA */}

          <Button
            size="lg"
            onClick={onAdd}
            className="mt-10 rounded-xl bg-emerald-600 px-8 hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Your First Address
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

        </div>

      </div>
    </motion.div>
  );
};

export default AddressEmpty;