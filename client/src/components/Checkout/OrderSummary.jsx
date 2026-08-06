import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  CreditCard,
} from "lucide-react";
import { useSelector } from "react-redux";

const OrderSummary = ({
  step,
  onContinue,
  onPlaceOrder,
}) => {
  const {
    summary,
    totalItems,
    totalPrice,
    loading,
  } = useSelector((state) => state.cart);

  const {
    addresses,
    selectedAddress,
  } = useSelector(
    (state) => state.address
  );

  const selected =
    addresses?.find(
      (item) => item._id === selectedAddress
    ) ||
    addresses?.find(
      (item) => item.isDefault
    );

  const {
    subtotal = totalPrice,
    deliveryCharge = 0,
    platformFee = 0,
    discount = 0,
    grandTotal = totalPrice,
  } = summary || {};

  const handleButtonClick = () => {
    if (step === "address") {
      if (!selected) {
        alert("Please select a delivery address.");
        return;
      }

      onContinue();
      return;
    }

    if (onPlaceOrder) {
      onPlaceOrder();
    }
  };

  return (
    <div className="sticky top-20 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      {/* Header */}

      <div className="flex items-end justify-between">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Order Summary
          </h2>

          <p className="text-sm text-gray-500">
            {totalItems} Item{totalItems !== 1 ? "s" : ""}
          </p>
        </div>

        <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
          {totalItems} Items
        </span>

      </div>

      {/* Price */}

      <div className="mt-5 space-y-3 text-sm">

        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-semibold">
            ₹{subtotal}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Delivery</span>
          <span className="font-semibold">
            ₹{deliveryCharge}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Platform Fee
          </span>
          <span className="font-semibold">
            ₹{platformFee}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Discount
          </span>
          <span className="font-semibold text-green-600">
            -₹{discount}
          </span>
        </div>

      </div>

      <div className="my-5 border-t border-dashed" />

      {/* Total */}

      <div className="flex items-center justify-between">

        <span className="text-lg font-bold">
          Grand Total
        </span>

        <span className="text-2xl font-bold text-green-600">
          ₹{grandTotal}
        </span>

      </div>

      {/* Address */}

      {selected && (
        <div className="mt-5 rounded-xl border border-green-100 bg-green-50 p-3">

          <div className="flex items-start gap-3">

            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
              <MapPin
                size={16}
                className="text-green-600"
              />
            </div>

            <div className="flex-1">

              <div className="mb-2 flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                  {selected.addressType}
                </span>

                {selected.isDefault && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                    Default
                  </span>
                )}

              </div>

              <h4 className="text-sm font-semibold">
                {selected.fullName}
              </h4>

              <p className="mt-1 text-xs leading-5 text-gray-600">
                {selected.address}
              </p>

              <p className="text-xs text-gray-600">
                {selected.city}, {selected.state} -{" "}
                {selected.postalCode}
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {selected.phone}
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Security */}

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5">

        <ShieldCheck
          size={16}
          className="text-green-600"
        />

        <span className="text-xs text-green-700">
          100% Secure SSL encrypted payment
        </span>

      </div>

      {/* Button */}

      <button
        disabled={loading}
        onClick={handleButtonClick}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {step === "address" ? (
          <>
            Continue To Payment
            <ArrowRight size={16} />
          </>
        ) : (
          <>
            <CreditCard size={16} />
            Place Order
          </>
        )}
      </button>

    </div>
  );
};

export default OrderSummary;