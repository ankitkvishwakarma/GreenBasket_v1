import { useEffect, useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Lock,
  Bike,
  CreditCard,
  MapPin,
  Eye,
  EyeOff,
} from "lucide-react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  vehicleType: "Bike",
  vehicleNumber: "",
  aadhaarNumber: "",
  address: "",
};

const DeliveryForm = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  deliveryBoy = null,
}) => {
  const [formData, setFormData] = useState(
    initialState
  );

  const [showPassword, setShowPassword] =
    useState(false);

  // ==========================================
  // LOAD DELIVERY BOY FOR EDIT
  // ==========================================

  useEffect(() => {
    if (deliveryBoy) {
      setFormData({
        name: deliveryBoy.name || "",
        email: deliveryBoy.email || "",
        phone: deliveryBoy.phone || "",
        password: "",
        vehicleType:
          deliveryBoy.vehicleType || "Bike",
        vehicleNumber:
          deliveryBoy.vehicleNumber || "",
        aadhaarNumber:
          deliveryBoy.aadhaarNumber || "",
        address: deliveryBoy.address || "",
      });
    } else {
      setFormData(initialState);
    }

    setShowPassword(false);
  }, [deliveryBoy, open]);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      vehicleType: formData.vehicleType,
      vehicleNumber:
        formData.vehicleNumber
          .trim()
          .toUpperCase(),
      aadhaarNumber:
        formData.aadhaarNumber.trim(),
      address: formData.address.trim(),
    };

    // Password only required while creating
    if (!deliveryBoy) {
      cleanedData.password =
        formData.password;
    }

    onSubmit(cleanedData);
  };

  // ==========================================
  // CLOSE
  // ==========================================

  const handleClose = () => {
    if (loading) return;

    setFormData(initialState);
    setShowPassword(false);

    onClose();
  };

  // ==========================================
  // HIDDEN
  // ==========================================

  if (!open) {
    return null;
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

      <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* ====================================
            HEADER
        ==================================== */}

        <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-emerald-50 via-white to-green-50 px-6 py-5">

          <div>
            <p className="text-sm font-medium text-emerald-600">
              Delivery Management
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-800">
              {deliveryBoy
                ? "Edit Delivery Boy"
                : "Add Delivery Boy"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {deliveryBoy
                ? "Update delivery partner information."
                : "Create a login account for a new delivery partner."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>

        </div>

        {/* ====================================
            FORM
        ==================================== */}

        <form
          onSubmit={handleSubmit}
          className="max-h-[calc(92vh-105px)] overflow-y-auto"
        >

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

            {/* =================================
                PERSONAL INFORMATION
            ================================= */}

            <div className="md:col-span-2">

              <h3 className="text-lg font-bold text-slate-800">
                Personal Information
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Enter the delivery partner's basic
                account information.
              </p>

            </div>

            {/* NAME */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />

              </div>
            </div>

            {/* EMAIL */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="delivery@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />

              </div>
            </div>

            {/* PHONE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Phone Number
              </label>

              <div className="relative">

                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  autoComplete="tel"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />

              </div>
            </div>

            {/* PASSWORD */}

            {!deliveryBoy && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Login Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create login password"
                    autoComplete="new-password"
                    minLength={6}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-11 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (previous) =>
                          !previous
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

                <p className="mt-1 text-xs text-slate-500">
                  This password will be used by the
                  delivery partner to log in.
                </p>

              </div>
            )}

            {/* =================================
                VEHICLE INFORMATION
            ================================= */}

            <div className="md:col-span-2 pt-2">

              <h3 className="text-lg font-bold text-slate-800">
                Vehicle Information
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Enter the vehicle details used for
                delivery.
              </p>

            </div>

            {/* VEHICLE TYPE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Vehicle Type
              </label>

              <div className="relative">

                <Bike
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                >
                  <option value="Bike">
                    Bike
                  </option>

                  <option value="Scooter">
                    Scooter
                  </option>

                  <option value="Cycle">
                    Cycle
                  </option>

                  <option value="Car">
                    Car
                  </option>
                </select>

              </div>
            </div>

            {/* VEHICLE NUMBER */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Vehicle Number
              </label>

              <div className="relative">

                <Bike
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="JH01AB1234"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm uppercase outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />

              </div>
            </div>

            {/* =================================
                IDENTITY
            ================================= */}

            <div className="md:col-span-2 pt-2">

              <h3 className="text-lg font-bold text-slate-800">
                Identity Information
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Aadhaar number is used to identify
                and verify the delivery partner.
              </p>

            </div>

            {/* AADHAAR */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Aadhaar Number
              </label>

              <div className="relative">

                <CreditCard
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleChange}
                  placeholder="Enter Aadhaar number"
                  inputMode="numeric"
                  maxLength={12}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />

              </div>

            </div>

            {/* =================================
                ADDRESS
            ================================= */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Address
              </label>

              <div className="relative">

                <MapPin
                  size={18}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter complete address"
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />

              </div>

            </div>

          </div>

          {/* ====================================
              FOOTER
          ==================================== */}

          <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : deliveryBoy
                  ? "Update Delivery Boy"
                  : "Create Delivery Boy"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default DeliveryForm;