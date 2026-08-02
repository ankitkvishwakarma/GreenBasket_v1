import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const RevenueChart = ({ data = [] }) => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">

      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Monthly Revenue
        </h2>

        <p className="text-gray-500">
          Revenue generated this year
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="colorRevenue"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#22c55e"
                stopOpacity={0.5}
              />

              <stop
                offset="100%"
                stopColor="#22c55e"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#16a34a"
            fill="url(#colorRevenue)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;