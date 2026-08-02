const SkeletonCard = () => {

    return (

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm animate-pulse">

            {/* Header */}

            <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-start lg:justify-between">

                <div className="space-y-3">

                    <div className="h-3 w-24 rounded bg-slate-200" />

                    <div className="h-6 w-48 rounded bg-slate-200" />

                    <div className="flex gap-3">

                        <div className="h-4 w-28 rounded bg-slate-200" />

                        <div className="h-4 w-20 rounded bg-slate-200" />

                    </div>

                </div>

                <div className="space-y-3">

                    <div className="h-8 w-28 rounded-full bg-slate-200" />

                    <div className="h-8 w-24 rounded-full bg-slate-200" />

                    <div className="h-7 w-20 rounded bg-slate-200" />

                </div>

            </div>

            {/* Divider */}

            <div className="h-px bg-slate-200" />

            {/* Product */}

            <div className="space-y-5 p-5">

                <div className="flex items-center gap-3">

                    <div className="h-10 w-10 rounded-full bg-slate-200" />

                    <div className="-ml-3 h-10 w-10 rounded-full bg-slate-200" />

                    <div className="-ml-3 h-10 w-10 rounded-full bg-slate-200" />

                    <div className="ml-3 flex-1">

                        <div className="h-4 w-52 rounded bg-slate-200" />

                        <div className="mt-2 h-3 w-24 rounded bg-slate-200" />

                    </div>

                </div>

                <div className="grid gap-4 md:grid-cols-3">

                    {[1, 2, 3].map((item) => (

                        <div key={item}>

                            <div className="h-3 w-20 rounded bg-slate-200" />

                            <div className="mt-2 h-4 w-28 rounded bg-slate-200" />

                        </div>

                    ))}

                </div>

            </div>

            {/* Divider */}

            <div className="h-px bg-slate-200" />

            {/* Footer */}

            <div className="flex flex-wrap gap-3 p-5">

                <div className="h-9 w-32 rounded-xl bg-slate-200" />

                <div className="h-9 w-32 rounded-xl bg-slate-200" />

                <div className="h-9 w-36 rounded-xl bg-slate-200" />

            </div>

        </div>

    );

};

const OrderSkeleton = ({
    count = 5,
}) => {

    return (

        <div className="space-y-5">

            {

                Array.from({
                    length: count,
                }).map((_, index) => (

                    <SkeletonCard
                        key={index}
                    />

                ))

            }

        </div>

    );

};

export default OrderSkeleton;