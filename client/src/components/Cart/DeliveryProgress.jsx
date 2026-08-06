import {
  Truck,
  CheckCircle2,
} from "lucide-react";

const FREE_DELIVERY_LIMIT = 500;

const DeliveryProgress = ({
  subtotal = 0,
}) => {
  const remaining = Math.max(
    FREE_DELIVERY_LIMIT - subtotal,
    0
  );

  const progress = Math.min(
    (subtotal / FREE_DELIVERY_LIMIT) * 100,
    100
  );

  const unlocked =
    subtotal >= FREE_DELIVERY_LIMIT;

  return (
    <div className="rounded-xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-3">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">

          {unlocked ? (
            <CheckCircle2
              size={18}
              className="text-green-600"
            />
          ) : (
            <Truck
              size={18}
              className="text-green-600"
            />
          )}

        </div>

        <div className="flex-1">

          <div className="flex items-center justify-between">

            <h3 className="text-sm font-semibold text-gray-800">
              Free Delivery
            </h3>

            <span className="text-xs font-semibold text-green-600">
              ₹{subtotal}/₹{FREE_DELIVERY_LIMIT}
            </span>

          </div>

          <p className="mt-0.5 text-xs text-gray-500">
            {unlocked
              ? "Free delivery unlocked 🎉"
              : `Add ₹${remaining} more`}
          </p>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-green-100">

        <div
          className="h-full rounded-full bg-green-600 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  );
};

export default DeliveryProgress;