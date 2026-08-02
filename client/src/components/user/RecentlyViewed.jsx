import {
    ArrowRight,
    Eye,
    Star,
} from "lucide-react";

const viewedProducts = [
    {
        id: 1,
        name: "Fresh Tomatoes",
        image: "/images/products/tomato.png",
        price: "₹89",
        rating: 4.8,
    },
    {
        id: 2,
        name: "Organic Banana",
        image: "/images/products/banana.png",
        price: "₹59",
        rating: 4.7,
    },
    {
        id: 3,
        name: "Fresh Carrot",
        image: "/images/products/carrot.png",
        price: "₹69",
        rating: 4.9,
    },
];

const RecentlyViewed = () => {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">

            {/* Header */}

            <div className="px-6 py-5 border-b flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold text-gray-900">
                        Recently Viewed
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Continue shopping
                    </p>

                </div>

                <button className="text-green-600 hover:text-green-700 transition">

                    <ArrowRight size={20} />

                </button>

            </div>

            {/* Product List */}

            <div className="divide-y divide-gray-100">

                {viewedProducts.map((product) => (

                    <div
                        key={product.id}
                        className="group flex items-center gap-4 p-5 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                    >

                        {/* Product Image */}

                        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden">

                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-contain group-hover:scale-110 transition duration-300"
                            />

                        </div>

                        {/* Details */}

                        <div className="flex-1">

                            <h3 className="font-semibold text-gray-800 line-clamp-1">
                                {product.name}
                            </h3>

                            <div className="flex items-center gap-2 mt-1">

                                <span className="font-bold text-green-600">
                                    {product.price}
                                </span>

                                <div className="flex items-center gap-1 text-yellow-500">

                                    <Star
                                        size={14}
                                        className="fill-yellow-400"
                                    />

                                    <span className="text-xs text-gray-600">
                                        {product.rating}
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* View */}

                        <button className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition">

                            <Eye size={18} />

                        </button>

                    </div>

                ))}

            </div>

            {/* Footer */}

            <div className="p-5 border-t">

                <button className="w-full h-11 rounded-xl bg-gray-100 hover:bg-green-600 hover:text-white transition font-semibold">

                    View More

                </button>

            </div>

        </div>
    );
};

export default RecentlyViewed;