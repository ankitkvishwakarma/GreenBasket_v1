import { Home, MapPin, Phone, Plus, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

const AddressCard = ({ address, loading }) => {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-center text-slate-500">
          Loading address...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Default Address
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Delivery address for your orders
          </p>
        </div>

        <Link
          to="/addresses"
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          View All
        </Link>

      </div>

      {!address ? (
        <div className="flex flex-col items-center py-10">

          <Home
            size={55}
            className="text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            No Address Found
          </h3>

          <p className="mt-2 text-center text-sm text-slate-500">
            Add your first delivery address to place orders faster.
          </p>

          <Link
            to="/addresses/add"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white transition hover:bg-green-700"
          >
            <Plus size={18} />
            Add Address
          </Link>

        </div>
      ) : (
        <>

          <div className="space-y-5">

            <div className="flex items-start gap-4">

              <div className="rounded-xl bg-green-100 p-3">
                <Home
                  size={22}
                  className="text-green-600"
                />
              </div>

              <div className="flex-1">

                <div className="flex items-center justify-between">

                  <h3 className="text-lg font-semibold text-slate-800">
                    {address.fullName}
                  </h3>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {address.addressType}
                  </span>

                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                  <Phone size={16} />
                  {address.phone}
                </div>

                <div className="mt-3 flex items-start gap-2 text-sm text-slate-600">

                  <MapPin
                    size={16}
                    className="mt-1"
                  />

                  <div>

                    <p>{address.addressLine1}</p>

                    {address.addressLine2 && (
                      <p>{address.addressLine2}</p>
                    )}

                    {address.landmark && (
                      <p>{address.landmark}</p>
                    )}

                    <p>
                      {address.city}, {address.state}
                    </p>

                    <p>
                      {address.country} - {address.pincode}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="mt-6 flex gap-3">

            <Link
              to={`/addresses/edit/${address._id}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-green-600 py-3 font-medium text-green-600 transition hover:bg-green-600 hover:text-white"
            >
              <Pencil size={18} />
              Edit
            </Link>

            <Link
              to="/addresses/add"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-medium text-white transition hover:bg-green-700"
            >
              <Plus size={18} />
              New
            </Link>

          </div>

        </>
      )}

    </div>
  );
};

export default AddressCard;