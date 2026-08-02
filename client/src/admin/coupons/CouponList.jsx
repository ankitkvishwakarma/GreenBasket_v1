import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Plus, Search } from "lucide-react";

import CouponTable from "./CouponTable";

const CouponList = ({
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const {
    coupons = [],
    loading,
  } = useSelector((state) => state.coupon);

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const keyword = search.trim().toLowerCase();

      const matchesSearch =
        coupon.code?.toLowerCase().includes(keyword);

      let status = "ACTIVE";

      if (!coupon.isActive) {
        status = "INACTIVE";
      } else if (
        new Date(coupon.expiresAt) < new Date()
      ) {
        status = "EXPIRED";
      }

      const matchesStatus =
        statusFilter === "ALL" ||
        status === statusFilter;

      const matchesType =
        typeFilter === "ALL" ||
        coupon.discountType === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    coupons,
    search,
    statusFilter,
    typeFilter,
  ]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Coupons
          </h1>

          <p className="text-gray-500">
            Manage discount coupons.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
        >
          <Plus size={18} />
          Add Coupon
        </button>

      </div>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-3">

        {/* Search */}
        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search coupon..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border py-3 pl-10 pr-4"
          />

        </div>

        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="rounded-xl border p-3"
        >
          <option value="ALL">
            All Status
          </option>

          <option value="ACTIVE">
            Active
          </option>

          <option value="INACTIVE">
            Inactive
          </option>

          <option value="EXPIRED">
            Expired
          </option>
        </select>

        {/* Type */}
        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value)
          }
          className="rounded-xl border p-3"
        >
          <option value="ALL">
            All Types
          </option>

          <option value="PERCENTAGE">
            Percentage
          </option>

          <option value="FIXED">
            Fixed
          </option>
        </select>

      </div>

      {/* Summary */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <span className="font-medium">
          Total Coupons :
        </span>{" "}
        {filteredCoupons.length}
      </div>

      {/* Table */}
      <CouponTable
        coupons={filteredCoupons}
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
      />

    </div>
  );
};

export default CouponList;