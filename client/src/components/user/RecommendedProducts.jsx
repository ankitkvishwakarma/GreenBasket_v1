import {
    Heart,
    ShoppingCart,
    Star,
} from "lucide-react";

const products = [
    {
        id: 1,
        name: "Fresh Organic Apple",
        category: "Fruits",
        image: "/images/products/apple.png",
        price: 149,
        oldPrice: 199,
        rating: 4.8,
        discount: "25% OFF",
    },
    {
        id: 2,
        name: "Fresh Broccoli",
        category: "Vegetables",
        image: "/images/products/broccoli.png",
        price: 99,
        oldPrice: 129,
        rating: 4.9,
        discount: "20% OFF",
    },
    {
        id: 3,
        name: "Organic Milk",
        category: "Dairy",
        image: "/images/products/milk.png",
        price: 69,
        oldPrice: 89,
        rating: 4.7,
        discount: "15% OFF",
    },
];

const RecommendedProducts = () => {
    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

            {/* Header */}

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h2 className="text-2xl font-bold">
                        Recommended Products
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Based on your recent shopping
                    </p>

                </div>

                <button className="text-green-600 font-semibold">
                    View All
                </button>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {products.map((product) => (

                    <div
                        key={product.id}
                        className="group rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
                    >

                        {/* Image */}

                        <div className="relative bg-gray-50 h-60 flex items-center justify-center overflow-hidden">

                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-44 h-44 object-contain transition duration-500 group-hover:scale-110"
                            />

                            <span className="absolute left-4 top-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">

                                {product.discount}

                            </span>

                            <button className="absolute right-4 top-4 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-red-50">

                                <Heart
                                    size={18}
                                    className="text-gray-500 hover:text-red-500"
                                />

                            </button>

                        </div>

                        {/* Body */}

                        <div className="p-5">

                            <div className="flex justify-between items-center">

                                <span className="text-sm text-green-600 font-medium">

                                    {product.category}

                                </span>

                                <div className="flex items-center gap-1">

                                    <Star
                                        size={15}
                                        className="fill-yellow-400 text-yellow-400"
                                    />

                                    <span className="text-sm font-semibold">

                                        {product.rating}

                                    </span>

                                </div>

                            </div>

                            <h3 className="font-bold text-lg mt-3">

                                {product.name}

                            </h3>

                            <div className="flex items-center gap-3 mt-4">

                                <span className="text-2xl font-bold text-green-600">

                                    ₹{product.price}

                                </span>

                                <span className="text-gray-400 line-through">

                                    ₹{product.oldPrice}

                                </span>

                            </div>

                            <button className="mt-6 w-full h-12 rounded-2xl bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 transition">

                                <ShoppingCart size={18} />

                                Add to Cart

                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default RecommendedProducts;