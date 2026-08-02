import { useEffect, useState } from "react";
import { Save, X, User, Mail, Phone, Bike } from "lucide-react";

const DeliveryForm = ({
  deliveryBoy,
  loading,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    vehicleType: "",
    vehicleNumber: "",
    licenseNumber: "",
    address: "",
  });

  useEffect(() => {
    if (deliveryBoy) {
      setFormData({
        name: deliveryBoy.name || "",
        email: deliveryBoy.email || "",
        phone: deliveryBoy.phone || "",
        password: "",
        vehicleType: deliveryBoy.vehicleType || "",
        vehicleNumber: deliveryBoy.vehicleNumber || "",
        licenseNumber:
          deliveryBoy.licenseNumber || "",
        address: deliveryBoy.address || "",
      });
    }
  }, [deliveryBoy]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="space-y-8"
    >
      {/* Personal Details */}

      <div>

        <h3 className="mb-5 text-lg font-semibold text-slate-800">
          Personal Information
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
                    {/* Name */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <User size={16} />
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />

          </div>

          {/* Email */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Mail size={16} />
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />

          </div>

          {/* Phone */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Phone size={16} />
              Mobile Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
              className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />

          </div>

          {/* Password */}

          {!deliveryBoy && (
            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                required
                className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />

            </div>
          )}

        </div>

      </div>

      {/* Vehicle Details */}

      <div>

        <h3 className="mb-5 text-lg font-semibold text-slate-800">
          Vehicle Information
        </h3>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Vehicle Type */}

          <div>

            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Bike size={16} />
              Vehicle Type
            </label>

            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            >
              <option value="">Select Vehicle</option>
              <option value="Bike">Bike</option>
              <option value="Scooter">Scooter</option>
              <option value="Cycle">Cycle</option>
              <option value="Electric Bike">
                Electric Bike
              </option>
            </select>

          </div>
                    {/* Vehicle Number */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Vehicle Number
            </label>

            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="e.g. JH01AB1234"
              className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />

          </div>

          {/* License Number */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Driving License Number
            </label>

            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="Enter license number"
              className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />

          </div>

        </div>

      </div>

      {/* Address */}

      <div>

        <h3 className="mb-5 text-lg font-semibold text-slate-800">
          Address Information
        </h3>

        <textarea
          rows={4}
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter complete address"
          className="w-full rounded-2xl border border-slate-300 p-4 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
        />

      </div>

      {/* Footer Buttons */}

      <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-300 px-6 font-medium text-slate-700 transition-all hover:bg-slate-100"
        >
          <X size={18} />
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 font-medium text-white transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={18} />

          {loading
            ? "Saving..."
            : deliveryBoy
            ? "Update Delivery Boy"
            : "Create Delivery Boy"}
        </button>

      </div>

    </form>
  );
};

export default DeliveryForm;