import { Filter } from "lucide-react";

const DeliveryFilters = ({ value, onChange }) => {
  return (
    <div className="w-full md:w-72">

      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Filter size={16} className="text-emerald-600" />
        Filter Delivery Partners
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-12
          w-full
          rounded-2xl
          border
          border-slate-300
          bg-white
          px-4
          text-sm
          font-medium
          text-slate-700
          outline-none
          transition-all
          duration-300
          focus:border-emerald-500
          focus:ring-4
          focus:ring-emerald-100
        "
      >
        <option value="All">All Delivery Boys</option>
        <option value="Available">Available</option>
        <option value="Unavailable">Unavailable</option>
        <option value="Verified">Verified</option>
        <option value="Unverified">Unverified</option>
      </select>

    </div>
  );
};

export default DeliveryFilters;