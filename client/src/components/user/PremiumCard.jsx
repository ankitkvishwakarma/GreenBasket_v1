import {
    Crown,
    Gift,
    Wallet,
    TrendingUp,
    ArrowRight,
    Sparkles,
} from "lucide-react";

const PremiumCard = () => {
    const progress = 72;

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-emerald-600 to-green-800 p-8 text-white shadow-xl">

            {/* Decorative Background */}

            <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

            <div className="absolute right-8 top-8">

                <Sparkles className="w-10 h-10 text-white/20" />

            </div>

            {/* Header */}

            <div className="relative z-10 flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">

                        <Crown size={34} />

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold">

                            Premium Member

                        </h2>

                        <p className="text-green-100 mt-1">

                            Gold Membership

                        </p>

                    </div>

                </div>

                <div className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black">

                    ACTIVE

                </div>

            </div>

            {/* Stats */}

            <div className="relative z-10 mt-8 grid grid-cols-2 gap-5">

                <div className="rounded-2xl bg-white/10 backdrop-blur p-5">

                    <Gift className="mb-3" />

                    <p className="text-sm text-green-100">

                        Reward Points

                    </p>

                    <h3 className="mt-2 text-3xl font-bold">

                        2,450

                    </h3>

                </div>

                <div className="rounded-2xl bg-white/10 backdrop-blur p-5">

                    <Wallet className="mb-3" />

                    <p className="text-sm text-green-100">

                        Total Savings

                    </p>

                    <h3 className="mt-2 text-3xl font-bold">

                        ₹4,580

                    </h3>

                </div>

            </div>

            {/* Progress */}

            <div className="relative z-10 mt-8">

                <div className="flex justify-between mb-2">

                    <span className="font-medium">

                        Membership Progress

                    </span>

                    <span className="font-bold">

                        {progress}%

                    </span>

                </div>

                <div className="h-3 rounded-full bg-white/20 overflow-hidden">

                    <div
                        className="h-full rounded-full bg-yellow-300 transition-all duration-700"
                        style={{ width: `${progress}%` }}
                    />

                </div>

                <div className="mt-3 flex justify-between text-sm text-green-100">

                    <span>

                        Gold

                    </span>

                    <span>

                        Platinum

                    </span>

                </div>

            </div>

            {/* Next Reward */}

            <div className="relative z-10 mt-8 rounded-2xl bg-white/10 backdrop-blur p-5 flex items-center justify-between">

                <div>

                    <div className="flex items-center gap-2">

                        <TrendingUp size={18} />

                        <span className="font-semibold">

                            Next Reward

                        </span>

                    </div>

                    <p className="mt-2 text-green-100">

                        Spend <b>₹1,200</b> more to unlock
                        Platinum Benefits.

                    </p>

                </div>

            </div>

            {/* Button */}

            <button className="relative z-10 mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-white font-semibold text-green-700 transition hover:scale-[1.02] hover:bg-gray-100">

                View Premium Benefits

                <ArrowRight size={18} />

            </button>

        </div>
    );
};

export default PremiumCard;