import { Search } from "lucide-react";

const OrderSearch = ({ value, onChange }) => {
  return (
    <div className="relative">

      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search by Order ID, Customer Name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
      />

    </div>
  );
};

export default OrderSearch;