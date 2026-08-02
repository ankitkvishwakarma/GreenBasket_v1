import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  // Search,
  // RefreshCw,
  // Filter,
  Users,
  ShieldCheck,
  Truck,
  WifiOff,
} from "lucide-react";
import {
  getDeliveryBoys,
  registerDeliveryBoy,
  updateDeliveryBoy,
} from "../../redux/admin/delivery/deliveryThunk";

import DeliveryTable from "../delivery/DeliveryTable";
import DeliveryForm from "../delivery/DeliveryForm";
import DeliverySearch from "../delivery/DeliverySearch";
import DeliveryFilters from "../delivery/DeliveryFilters";

const Delivery = () => {
  const dispatch = useDispatch();

  const {
    deliveryBoys,
    loading,
  } = useSelector((state) => state.delivery);

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [showForm, setShowForm] = useState(false);

  const [editingDeliveryBoy, setEditingDeliveryBoy] =
    useState(null);

  useEffect(() => {
    dispatch(getDeliveryBoys());
  }, [dispatch]);

  const filteredDeliveryBoys = useMemo(() => {
    return deliveryBoys.filter((deliveryBoy) => {
      const matchesSearch =
        deliveryBoy.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        deliveryBoy.email
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        deliveryBoy.phone?.includes(search);

      const matchesStatus =
        selectedStatus === "all"
          ? true
          : selectedStatus === "verified"
            ? deliveryBoy.isVerified
            : selectedStatus === "available"
              ? deliveryBoy.isAvailable
              : !deliveryBoy.isAvailable;

      return matchesSearch && matchesStatus;
    });
  }, [deliveryBoys, search, selectedStatus]);

  const stats = useMemo(() => {
    return {
      total: deliveryBoys.length,

      verified: deliveryBoys.filter(
        (item) => item.isVerified
      ).length,

      available: deliveryBoys.filter(
        (item) => item.isAvailable
      ).length,

      unavailable: deliveryBoys.filter(
        (item) => !item.isAvailable
      ).length,
    };
  }, [deliveryBoys]);

  const handleRefresh = () => {
    dispatch(getDeliveryBoys());
  };
  const handleExport = () => {
    console.log("Export Delivery Data");
  };
  const handleAdd = () => {
    setEditingDeliveryBoy(null);
    setShowForm(true);
  };

  const handleEdit = (deliveryBoy) => {
    setEditingDeliveryBoy(deliveryBoy);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditingDeliveryBoy(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-8">

      {/* ================= Header ================= */}

      <section className="rounded-3xl border border-slate-200 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 p-8 shadow-lg">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="inline-flex rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur">
              GreenBasket Admin
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">
              Delivery Management
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50">
              Manage delivery partners, monitor verification,
              availability, assignments and live operations
              from one dashboard.
            </p>

          </div>

          <button
            onClick={handleAdd}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-6 font-semibold text-emerald-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Plus size={20} />
            Add Delivery Boy
          </button>

        </div>

      </section>

      {/* ================= Statistics ================= */}

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Total Delivery Boys
              </p>

              <h2 className="mt-3 text-4xl font-bold text-slate-800">
                {stats.total}
              </h2>

            </div>

            <div className="rounded-2xl bg-emerald-100 p-4">
              <Users className="text-emerald-600" />
            </div>

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Verified
              </p>

              <h2 className="mt-3 text-4xl font-bold text-blue-600">
                {stats.verified}
              </h2>

            </div>

            <div className="rounded-2xl bg-blue-100 p-4">
              <ShieldCheck className="text-blue-600" />
            </div>

          </div>

        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Available
              </p>

              <h2 className="mt-3 text-4xl font-bold text-emerald-600">
                {stats.available}
              </h2>

            </div>

            <div className="rounded-2xl bg-emerald-100 p-4">
              <Truck className="text-emerald-600" />
            </div>

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Offline
              </p>

              <h2 className="mt-3 text-4xl font-bold text-red-600">
                {stats.unavailable}
              </h2>

            </div>

            <div className="rounded-2xl bg-red-100 p-4">
              <WifiOff className="text-red-600" />
            </div>

          </div>

        </div>

      </section>

      {/* ================= Search & Filter ================= */}
      {/* 
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}

      {/* <div className="relative w-full lg:max-w-lg">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-300 bg-slate-50 pl-12 pr-4 text-sm outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />

          </div> */}

      {/* Right Controls  */}

      {/* <div className="flex flex-wrap items-center gap-3">

            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value)
              }
              className="h-12 rounded-2xl border border-slate-300 bg-white px-5 text-sm font-medium outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            >
              <option value="all">All Delivery Boys</option>
              <option value="verified">Verified</option>
              <option value="available">Available</option>
              <option value="offline">Offline</option>
            </select>

            <button
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-300 bg-white transition hover:bg-slate-100"
            >
              <Filter size={18} />
            </button>

            <button
              onClick={handleRefresh}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-300 bg-white transition hover:bg-emerald-50 hover:text-emerald-600"
            >
              <RefreshCw
                size={18}
                className={loading ? "animate-spin" : ""}
              />
            </button>

          </div> */}

      {/* </div>

      </section> */}

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">

        <DeliverySearch
          search={search}
          setSearch={setSearch}
          loading={loading}
          onRefresh={handleRefresh}
          onExport={handleExport}
        />

        <DeliveryFilters
          value={selectedStatus}
          onChange={setSelectedStatus}
        />

      </div>
      {/* ================= Delivery Table ================= */}

      <DeliveryTable
        deliveryBoys={filteredDeliveryBoys}
        loading={loading}
        onView={(deliveryBoy) => {
          console.log("View:", deliveryBoy);
          // TODO: Open Details Modal
        }}
        onEdit={handleEdit}
        onDelete={(deliveryBoy) => {
          console.log("Delete:", deliveryBoy);
          // TODO: Open Delete Confirmation Modal
        }}
        onVerify={(deliveryBoy) => {
          console.log("Verify:", deliveryBoy);
          // dispatch(verifyDeliveryBoy(deliveryBoy._id));
        }}
        onAssign={(deliveryBoy) => {
          console.log("Assign:", deliveryBoy);
          // TODO: Open Assign Order Modal
        }}
        onLocation={(deliveryBoy) => {
          console.log("Location:", deliveryBoy);
          // TODO: Open Live Location Modal
        }}
        onAvailabilityChange={(deliveryBoy) => {
          console.log("Availability:", deliveryBoy);
          // dispatch(toggleAvailability(deliveryBoy._id));
        }}
      />

      {/* ================= Delivery Form Modal ================= */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

          <div className="relative w-full max-w-6xl rounded-3xl bg-white shadow-2xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">

              <div>

                <h2 className="text-2xl font-bold text-slate-800">
                  {editingDeliveryBoy
                    ? "Update Delivery Partner"
                    : "Register Delivery Partner"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Fill all required information before saving.
                </p>

              </div>

              <button
                onClick={handleCloseForm}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
              >
                Close
              </button>

            </div>

            {/* Modal Body */}

            <div className="max-h-[85vh] overflow-y-auto p-8">

              <DeliveryForm
                deliveryBoy={editingDeliveryBoy}
                loading={loading}
                onClose={handleCloseForm}
                onSubmit={async (data) => {
                  try {
                    if (editingDeliveryBoy) {
                      await dispatch(
                        updateDeliveryBoy({
                          id: editingDeliveryBoy._id,
                          formData: data,
                        })
                      );
                    } else {
                      await dispatch(registerDeliveryBoy(data));
                    }

                    dispatch(getDeliveryBoys());

                    handleCloseForm();
                  } catch (error) {
                    console.error(error);
                  }
                }}
              />

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Delivery;