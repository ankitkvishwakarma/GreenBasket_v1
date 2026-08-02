import { motion } from "framer-motion";
import { PackageSearch, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

import OrderStats from "./OrderStats";

const OrderHeader = ({
    orders = [],
    loading = false,
    onRefresh,
}) => {
    return (
        <div className="space-y-6">

            {/* Header */}

            <motion.div
                initial={{
                    opacity: 0,
                    y: -20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.35,
                }}
                className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
            >

                {/* Left */}

                <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">

                        <PackageSearch
                            size={28}
                            className="text-green-600"
                        />

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">

                            My Orders

                        </h1>

                        <p className="mt-1 text-sm text-slate-500">

                            Track, manage and view all your grocery orders in one place.

                        </p>

                    </div>

                </div>

                {/* Right */}

                <Button
                    variant="outline"
                    disabled={loading}
                    onClick={onRefresh}
                    className="h-11 rounded-xl border-slate-200 px-5 transition-all hover:border-green-300 hover:bg-green-50"
                >

                    <RefreshCcw
                        size={16}
                        className={`mr-2 ${
                            loading
                                ? "animate-spin"
                                : ""
                        }`}
                    />

                    Refresh

                </Button>

            </motion.div>

            {/* Stats */}

            <OrderStats
                orders={orders}
            />

        </div>
    );
};

export default OrderHeader;