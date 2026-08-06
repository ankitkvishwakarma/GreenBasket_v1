import {
  Truck,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  PackageCheck,
  Clock3,
} from "lucide-react";

const ShippingReturns = () => {
  const sections = [
    {
      icon: (
        <Truck
          size={22}
          className="text-green-600"
        />
      ),
      title: "Fast Delivery",
      description:
        "Orders are processed quickly and delivered within 24-48 hours in supported locations.",
    },

    {
      icon: (
        <PackageCheck
          size={22}
          className="text-blue-600"
        />
      ),
      title: "Premium Packaging",
      description:
        "Products are securely packed to maintain freshness and avoid damage during transit.",
    },

    {
      icon: (
        <RotateCcw
          size={22}
          className="text-orange-600"
        />
      ),
      title: "Easy Returns",
      description:
        "Eligible products can be returned or replaced according to our return policy.",
    },

    {
      icon: (
        <CreditCard
          size={22}
          className="text-purple-600"
        />
      ),
      title: "Payment Options",
      description:
        "Pay using UPI, Debit/Credit Cards, Net Banking, Wallets or Cash on Delivery.",
    },

    {
      icon: (
        <ShieldCheck
          size={22}
          className="text-emerald-600"
        />
      ),
      title: "Quality Guarantee",
      description:
        "Every product is carefully inspected before dispatch to ensure freshness and quality.",
    },

    {
      icon: (
        <Clock3
          size={22}
          className="text-red-500"
        />
      ),
      title: "Support",
      description:
        "Our customer support team is available to help with orders, delivery and returns.",
    },
  ];

  return (
    <section className="space-y-8">

      {/* Header */}

      <div>

        <h2 className="text-2xl font-bold text-gray-900">

          Shipping & Returns

        </h2>

        <p className="mt-2 text-sm text-gray-500">

          Everything you need to know before placing your order.

        </p>

      </div>

      {/* Cards */}

      <div className="grid gap-5 md:grid-cols-2">

        {sections.map((item, index) => (

          <div
            key={index}
            className="
              group
              rounded-3xl
              border
              border-gray-100
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-green-300
              hover:shadow-lg
            "
          >

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gray-50
                transition
                group-hover:bg-green-50
              "
            >

              {item.icon}

            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-900">

              {item.title}

            </h3>

            <p className="mt-3 leading-7 text-gray-600">

              {item.description}

            </p>

          </div>

        ))}

      </div>

      {/* Bottom Notice */}

      <div
        className="
          rounded-3xl
          border
          border-green-200
          bg-gradient-to-r
          from-green-50
          to-emerald-50
          p-6
        "
      >

        <h4 className="text-lg font-semibold text-green-700">

          Shop With Confidence

        </h4>

        <p className="mt-3 leading-7 text-green-800">

          GreenBasket is committed to providing fresh groceries,
          secure payments, quick delivery, and a hassle-free shopping
          experience. If you face any issue with your order, our support
          team is here to help.

        </p>

      </div>

    </section>
  );
};

export default ShippingReturns;