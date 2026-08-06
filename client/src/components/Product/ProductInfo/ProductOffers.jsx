import {
  BadgePercent,
  CreditCard,
  Gift,
  Truck,
  Wallet,
  Sparkles,
} from "lucide-react";

const ProductOffers = ({ product }) => {
  const offers = [
    {
      icon: (
        <BadgePercent
          size={18}
          className="text-green-600"
        />
      ),
      title: "Instant Discount",
      description:
        "Get up to 10% instant discount on eligible bank cards.",
    },

    {
      icon: (
        <Wallet
          size={18}
          className="text-blue-600"
        />
      ),
      title: "Cashback Offer",
      description:
        "Earn cashback on every successful purchase.",
    },

    {
      icon: (
        <Gift
          size={18}
          className="text-pink-600"
        />
      ),
      title: "Coupon Offer",
      description:
        "Apply available coupons at checkout and save more.",
    },

    {
      icon: (
        <Truck
          size={18}
          className="text-orange-600"
        />
      ),
      title: "Free Delivery",
      description:
        "Free delivery on orders above ₹499.",
    },

    {
      icon: (
        <CreditCard
          size={18}
          className="text-indigo-600"
        />
      ),
      title: "Secure Payment",
      description:
        "100% secure online payment with trusted gateways.",
    },

    {
      icon: (
        <Sparkles
          size={18}
          className="text-yellow-600"
        />
      ),
      title: "GreenBasket Plus",
      description:
        "Premium members enjoy extra discounts and faster delivery.",
    },
  ];

  return (
    <section className="space-y-5">

      <div>

        <h3 className="text-xl font-semibold text-gray-900">
          Available Offers
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Save more with exclusive GreenBasket
          offers.
        </p>

      </div>

      <div className="space-y-4">

        {offers.map((offer, index) => (

          <div
            key={index}
            className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gradient-to-r from-white to-green-50 p-5 transition-all duration-300 hover:border-green-300 hover:shadow-md"
          >

            <div className="rounded-xl bg-white p-3 shadow-sm">

              {offer.icon}

            </div>

            <div>

              <h4 className="font-semibold text-gray-900">

                {offer.title}

              </h4>

              <p className="mt-1 text-sm leading-6 text-gray-500">

                {offer.description}

              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default ProductOffers;