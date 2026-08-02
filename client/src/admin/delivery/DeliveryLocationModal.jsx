import { useEffect } from "react";
import { X, MapPin } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const DeliveryLocationModal = ({
  open,
  onClose,
  deliveryBoy,
  location,
  onLoadLocation,
}) => {
  useEffect(() => {
    if (open && deliveryBoy?._id) {
      onLoadLocation(deliveryBoy._id);
    }
  }, [open, deliveryBoy, onLoadLocation]);

  if (!open || !deliveryBoy) return null;

  const latitude = location?.latitude ?? 28.6139;
  const longitude = location?.longitude ?? 77.2090;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-4xl rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b px-6 py-4">

          <div className="flex items-center gap-2">
            <MapPin className="text-green-600" />
            <h2 className="text-xl font-semibold">
              Delivery Location
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        <div className="p-6">

          <div className="mb-4">
            <h3 className="font-semibold">
              {deliveryBoy.name}
            </h3>

            <p className="text-sm text-gray-500">
              {deliveryBoy.phone}
            </p>
          </div>

          <div className="overflow-hidden rounded-xl">

            <MapContainer
              center={[latitude, longitude]}
              zoom={15}
              style={{
                height: "450px",
                width: "100%",
              }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[latitude, longitude]}>
                <Popup>
                  {deliveryBoy.name}
                </Popup>
              </Marker>

            </MapContainer>

          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">

            <div className="rounded-lg border p-3">
              <p className="text-xs text-gray-500">
                Latitude
              </p>

              <p>{latitude}</p>
            </div>

            <div className="rounded-lg border p-3">
              <p className="text-xs text-gray-500">
                Longitude
              </p>

              <p>{longitude}</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DeliveryLocationModal;