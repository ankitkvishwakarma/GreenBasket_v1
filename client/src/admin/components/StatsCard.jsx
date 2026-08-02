import { ArrowUpRight } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}) => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">

      <div className="flex justify-between">

        <div>

          <p className="text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {value}
          </h2>

        </div>

        <div
          className={`h-14 w-14 rounded-2xl flex items-center justify-center ${color}`}
        >
          <Icon className="text-white" size={26} />
        </div>

      </div>

      <div className="mt-5 flex items-center text-green-600 font-semibold">

        <ArrowUpRight size={18} />

        <span className="ml-2">
          +12% This Month
        </span>

      </div>

    </div>
  );
};

export default StatCard;