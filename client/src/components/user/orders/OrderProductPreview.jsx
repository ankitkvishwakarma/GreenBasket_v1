import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const OrderProductPreview = ({
    items = [],
    detailed = false,
    maxItems = 3,
}) => {

    if (!items.length) return null;

    //------------------------------------------

    const visibleItems = detailed
        ? items
        : items.slice(0, maxItems);

    const remaining =
        items.length - visibleItems.length;

    //------------------------------------------

    if (detailed) {

        return (

            <div className="space-y-4">

                {
                    visibleItems.map((item, index) => (

                        <div
                            key={item._id || item.product || index}
                            className="flex items-center justify-between rounded-xl border border-slate-200 p-3"
                        >

                            <div className="flex items-center gap-3">

                                <Avatar className="h-14 w-14 rounded-xl">

                                    <AvatarImage
                                        src={
                                            item.image ||
                                            item.product?.images?.[0]?.url ||
                                            item.product?.thumbnail
                                        }
                                    />

                                    <AvatarFallback>
                                        {item.name?.charAt(0)}
                                    </AvatarFallback>

                                </Avatar>

                                <div>

                                    <h4 className="font-semibold text-slate-800">

                                        {item.name}

                                    </h4>

                                    <p className="mt-1 text-sm text-slate-500">

                                        Qty : {item.quantity}

                                    </p>

                                </div>

                            </div>

                            <div className="text-right">

                                <p className="text-lg font-bold text-green-700">

                                    ₹{item.price}

                                </p>

                            </div>

                        </div>

                    ))
                }

            </div>

        );

    }

    //------------------------------------------

    return (

        <div className="flex items-center justify-between">

            {/* Images */}

            <div className="flex items-center">

                {
                    visibleItems.map((item, index) => (

                        <Avatar
                            key={item._id || item.product || index}
                            className={`h-10 w-10 border-2 border-white shadow ${
                                index !== 0 ? "-ml-3" : ""
                            }`}
                        >

                            <AvatarImage
                                src={
                                    item.image ||
                                    item.product?.images?.[0]?.url ||
                                    item.product?.thumbnail
                                }
                            />

                            <AvatarFallback>

                                {item.name?.charAt(0)}

                            </AvatarFallback>

                        </Avatar>

                    ))
                }

                {
                    remaining > 0 && (

                        <div className="-ml-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-xs font-semibold">

                            +{remaining}

                        </div>

                    )
                }

            </div>

            {/* Product Name */}

            <div className="ml-5 flex-1 overflow-hidden">

                <h4 className="truncate text-sm font-semibold text-slate-800">

                    {
                        visibleItems
                            .map((item) => item.name)
                            .join(", ")
                    }

                </h4>

                <p className="mt-1 text-xs text-slate-500">

                    {items.length} Item
                    {items.length > 1 && "s"}

                </p>

            </div>

        </div>

    );

};

export default OrderProductPreview;