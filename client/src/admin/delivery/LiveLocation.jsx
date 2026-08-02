import {
  X,
  MapPin,
  Navigation,
  Phone,
  User,
  Clock,
} from "lucide-react";

const LiveLocationModal = ({
  open,
  deliveryBoy,
  onClose,
}) => {
  if (!open || !deliveryBoy) return null;

  const latitude =
    deliveryBoy?.currentLocation?.coordinates?.[1] ?? 0;

  const longitude =
    deliveryBoy?.currentLocation?.coordinates?.[0] ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Live Location
            </h2>

            <p className="mt-2 text-sm text-blue-100">
              Real-time location of delivery partner.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-white/20 p-2 text-white transition hover:bg-white/30"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="grid gap-8 p-8 lg:grid-cols-3">

          {/* Left Panel */}

          <div className="space-y-6">

            <div className="rounded-2xl border border-slate-200 p-6">

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
                  {deliveryBoy.name?.charAt(0)?.toUpperCase()}
                </div>

                <div>

                  <h3 className="text-xl font-bold text-slate-800">
                    {deliveryBoy.name}
                  </h3>

                  <p className="text-slate-500">
                    Delivery Executive
                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-2xl border border-slate-200 p-6">

              <div className="space-y-5">

                <div className="flex items-center gap-3">

                  <User
                    size={18}
                    className="text-blue-600"
                  />

                  <span className="text-slate-700">
                    {deliveryBoy.email}
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <Phone
                    size={18}
                    className="text-green-600"
                  />

                  <span className="text-slate-700">
                    {deliveryBoy.phone}
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <MapPin
                    size={18}
                    className="text-red-600"
                  />

                  <span className="text-slate-700">
                    {deliveryBoy.address ||
                      "Address unavailable"}
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <Clock
                    size={18}
                    className="text-orange-600"
                  />

                  <span className="text-slate-700">
                    Last Updated :
                    {" "}
                    {deliveryBoy.updatedAt
                      ? new Date(
                          deliveryBoy.updatedAt
                        ).toLocaleString()
                      : "-"}
                  </span>

                </div>

              </div>

            </div>
                        {/* Coordinates */}

            <div className="grid gap-4">

              <div className="rounded-2xl bg-slate-50 p-5">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Latitude
                </p>

                <h4 className="mt-2 break-all text-lg font-bold text-slate-800">
                  {latitude}
                </h4>

              </div>

              <div className="rounded-2xl bg-slate-50 p-5">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Longitude
                </p>

                <h4 className="mt-2 break-all text-lg font-bold text-slate-800">
                  {longitude}
                </h4>

              </div>

            </div>

          </div>

          {/* Map Section */}

          <div className="lg:col-span-2">

            <div className="overflow-hidden rounded-3xl border border-slate-200">

              {/* Replace this section with React-Leaflet or Google Maps */}

              <div className="flex h-[500px] flex-col items-center justify-center bg-slate-100">

                <Navigation
                  size={70}
                  className="text-blue-500"
                />

                <h3 className="mt-6 text-2xl font-bold text-slate-700">
                  Live Map Preview
                </h3>

                <p className="mt-3 max-w-md text-center text-slate-500">
                  Integrate React-Leaflet or Google Maps here
                  to display the real-time location of the
                  delivery partner.
                </p>

                <a
                  href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  <Navigation size={18} />
                  Open in Google Maps
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t border-slate-200 px-8 py-5">

          <button
            onClick={onClose}
            className="rounded-2xl bg-slate-800 px-8 py-3 font-semibold text-white transition hover:bg-slate-900"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default LiveLocationModal;