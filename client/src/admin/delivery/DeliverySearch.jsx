import {
  Search,
  RefreshCw,
  Download,
} from "lucide-react";

const DeliverySearch = ({
  search,
  setSearch,
  loading,
  onRefresh,
  onExport,
}) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}

        <div className="relative w-full lg:max-w-xl">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search delivery partner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-2xl border border-slate-300 bg-slate-50 pl-12 pr-4 text-sm outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />

        </div>

        <div className="flex items-center gap-3">

          {/* Refresh */}

          <button
            onClick={onRefresh}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-300 bg-white transition hover:bg-emerald-50 hover:text-emerald-600"
          >
            <RefreshCw
              size={18}
              className={loading ? "animate-spin" : ""}
            />
          </button>

          {/* Export */}

          <button
            onClick={onExport}
            className="inline-flex h-12 items-center gap-2 rounded-2xl bg-emerald-600 px-5 font-medium text-white transition hover:bg-emerald-700"
          >
            <Download size={18} />
            Export
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeliverySearch;