import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Leaf,
  BadgeCheck,
  CreditCard,
} from "lucide-react";

const ProductTrust = () => {
  const trustItems = [
    {
      icon: (
        <Leaf
          size={20}
          className="text-green-600"
        />
      ),
      title: "100% Fresh",
      description:
        "Farm-fresh groceries sourced daily.",
    },

    {
      icon: (
        <ShieldCheck
          size={20}
          className="text-blue-600"
        />
      ),
      title: "Quality Checked",
      description:
        "Every product passes strict quality inspection.",
    },

    {
      icon: (
        <Truck
          size={20}
          className="text-orange-600"
        />
      ),
      title: "Fast Delivery",
      description:
        "Quick doorstep delivery across your city.",
    },

    {
      icon: (
        <RefreshCcw
          size={20}
          className="text-purple-600"
        />
      ),
      title: "Easy Returns",
      description:
        "Simple return & refund process for eligible products.",
    },

    {
      icon: (
        <CreditCard
          size={20}
          className="text-indigo-600"
        />
      ),
      title: "Secure Payments",
      description:
        "UPI, Cards, Wallets & Cash on Delivery supported.",
    },

    {
      icon: (
        <BadgeCheck
          size={20}
          className="text-emerald-600"
        />
      ),
      title: "Trusted Store",
      description:
        "Thousands of happy customers shop with us every day.",
    },
  ];

  return (
    <section className="space-y-5">

      <div>

        <h3 className="text-xl font-semibold text-gray-900">
          Why Shop With GreenBasket?
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Premium shopping experience with trusted
          quality and reliable service.
        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {trustItems.map((item, index) => (

          <div
            key={index}
            className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 transition group-hover:bg-green-50">

              {item.icon}

            </div>

            <div>

              <h4 className="font-semibold text-gray-900">

                {item.title}

              </h4>

              <p className="mt-1 text-sm leading-6 text-gray-500">

                {item.description}

              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default ProductTrust;