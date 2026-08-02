import { motion } from "framer-motion";
import { MapPinned, Plus, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddressHeader = ({ total = 0, onAdd }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-green-100 p-8 shadow-sm"
    >
      {/* Background Blur */}
      <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-lime-300/20 blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg">
            <MapPinned className="h-8 w-8" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              My Addresses
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
              Manage your delivery locations for faster and hassle-free
              checkout. Keep your home, office and other frequently used
              addresses organized.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                {total} Saved Address{total !== 1 && "es"}
              </div>

              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Secure Delivery
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-start gap-4 lg:items-end">
          <Button
            onClick={onAdd}
            size="lg"
            className="rounded-xl bg-emerald-600 px-7 py-6 text-base font-semibold hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New Address
          </Button>

          <p className="text-sm text-slate-500">
            Add multiple delivery locations and switch anytime.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default AddressHeader;