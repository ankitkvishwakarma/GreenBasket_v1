import {
  CreditCard,
  Banknote,
  Wallet,
  Smartphone,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";

const paymentMethods = [
  {
    id: "razorpay",
    title: "Online Payment",
    subtitle: "UPI / Cards / Net Banking",
    icon: CreditCard,
  },
  {
    id: "cod",
    title: "Cash on Delivery",
    subtitle: "Pay when your order arrives",
    icon: Banknote,
  },
  {
    id: "wallet",
    title: "Wallet",
    subtitle: "Coming Soon",
    icon: Wallet,
    disabled: true,
  },
  {
    id: "upi",
    title: "UPI",
    subtitle: "Google Pay / PhonePe / Paytm",
    icon: Smartphone,
    disabled: true,
  },
];

const PaymentSection = ({ onBack }) => {
  const [paymentMethod, setPaymentMethod] =
    useState("razorpay");

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      {/* Header */}

      <div className="mb-5 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-gray-900">
            Payment Method
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Select your preferred payment option.
          </p>

        </div>

        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-green-500 hover:text-green-600"
        >
          <ArrowLeft size={16} />
          Change Address
        </button>

      </div>

      {/* Payment Methods */}

      <div className="space-y-3">

        {paymentMethods.map((method) => {
          const Icon = method.icon;

          return (
            <label
              key={method.id}
              className={`
                flex
                cursor-pointer
                items-center
                justify-between
                rounded-xl
                border
                px-4
                py-3
                transition-all
                duration-200

                ${
                  paymentMethod === method.id
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                }

                ${
                  method.disabled
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }
              `}
            >
              <div className="flex items-center gap-3">

                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  disabled={method.disabled}
                  checked={paymentMethod === method.id}
                  onChange={() =>
                    setPaymentMethod(method.id)
                  }
                />

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Icon
                    size={18}
                    className="text-green-600"
                  />
                </div>

                <div>

                  <h3 className="text-sm font-semibold text-gray-900">
                    {method.title}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {method.subtitle}
                  </p>

                </div>

              </div>

            </label>
          );
        })}

      </div>

    </div>
  );
};

export default PaymentSection;