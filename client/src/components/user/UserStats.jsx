import {
    ShoppingBag,
    Heart,
    ShoppingCart,
    TicketPercent,
    ArrowRight,
} from "lucide-react";

const cards = [
    {
        title: "Orders",
        value: 15,
        subtitle: "View all orders",
        icon: ShoppingBag,
        color: "green",
        bg: "bg-green-50",
        iconBg: "bg-green-100",
        text: "text-green-600",
        border: "border-green-200",
    },
    {
        title: "Wishlist",
        value: 12,
        subtitle: "View wishlist",
        icon: Heart,
        color: "pink",
        bg: "bg-pink-50",
        iconBg: "bg-pink-100",
        text: "text-pink-500",
        border: "border-pink-200",
    },
    {
        title: "Cart",
        value: 3,
        subtitle: "Go to cart",
        icon: ShoppingCart,
        color: "blue",
        bg: "bg-blue-50",
        iconBg: "bg-blue-100",
        text: "text-blue-600",
        border: "border-blue-200",
    },
    {
        title: "Coupons",
        value: 5,
        subtitle: "View coupons",
        icon: TicketPercent,
        color: "yellow",
        bg: "bg-yellow-50",
        iconBg: "bg-yellow-100",
        text: "text-yellow-500",
        border: "border-yellow-200",
    },
];

const UserStats = () => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className={`
                            group
                            relative
                            overflow-hidden
                            rounded-xl
                            border
                            ${card.border}
                            bg-white
                            p-3
                            shadow-sm
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-xl
                        `}
                    >
                        {/* Glow */}
                        <div
                            className={`absolute right-0 top-0 h-24 w-24 rounded-full blur-3xl opacity-20 ${card.bg}`}
                        />

                        <div className="flex items-start justify-between">

                            <div
                                className={`
                                    h-10
                                    w-10
                                    rounded-2xl
                                    ${card.iconBg}
                                    flex
                                    items-center
                                    justify-center
                                `}
                            >
                                <Icon
                                    size={30}
                                    className={card.text}
                                />
                            </div>

                            <ArrowRight
                                size={18}
                                className="text-gray-300 transition group-hover:text-green-600 group-hover:translate-x-1"
                            />
                        </div>

                        <div className="mt-6">

                            <h5 className="text-gray-700 font-medium">
                                {card.title}
                            </h5>

                            <h2
                                className={`text-2xl font-bold mt-2 ${card.text}`}
                            >
                                {card.value}
                            </h2>

                            <button className="mt-5 text-gray-500 font-medium flex items-center gap-2 hover:text-green-600 transition">

                                {card.subtitle}

                                <ArrowRight size={16} />

                            </button>

                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default UserStats;