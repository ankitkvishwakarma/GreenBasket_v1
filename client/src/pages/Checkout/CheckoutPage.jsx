import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import CheckoutHeader from "@/components/Checkout/CheckoutHeader";
import AddressSection from "@/components/Checkout/AddressSection";
import PaymentSection from "@/components/Checkout/PaymentSection";
import OrderSummary from "@/components/Checkout/OrderSummary";

import {
  getCart,
  getCartSummary,
} from "@/redux/cart/cartThunk.js";

const CheckoutPage = () => {
  const dispatch = useDispatch();

  const [step, setStep] = useState("address");

  useEffect(() => {
    dispatch(getCart());
    dispatch(getCartSummary());
  }, [dispatch]);

  return (
    <section className="min-h-screen bg-gray-50 py-6">
      <div className="mx-auto max-w-6xl px-4">

        <CheckoutHeader step={step} />

        <div className="mt-6 grid gap-6 xl:grid-cols-[2fr_0.9fr]">

          {/* LEFT */}

          <div>
            {step === "address" ? (
              <AddressSection
                onContinue={() => setStep("payment")}
              />
            ) : (
              <PaymentSection
                onBack={() => setStep("address")}
              />
            )}
          </div>

          {/* RIGHT */}

          <OrderSummary />

        </div>

      </div>
    </section>
  );
};

export default CheckoutPage;