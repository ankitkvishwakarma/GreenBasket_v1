import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = [
    { label: "All", value: "all" },
    { label: "Pending", value: "Pending" },
    { label: "Packed", value: "Packed" },
    { label: "Out for Delivery", value: "Out for Delivery" },
    { label: "Delivered", value: "Delivered" },
    { label: "Cancelled", value: "Cancelled" },
];

const SORT_OPTIONS = [
    { label: "Latest", value: "-createdAt" },
    { label: "Oldest", value: "createdAt" },
    { label: "Highest Amount", value: "-finalAmount" },
    { label: "Lowest Amount", value: "finalAmount" },
];

const OrderFilters = ({
    filters,
    onChange,
}) => {

    const [keyword, setKeyword] = useState(
        filters.search || ""
    );

    //------------------------------------------

    useEffect(() => {

        const timer = setTimeout(() => {

            onChange({
                ...filters,
                search: keyword,
            });

        }, 400);

        return () => clearTimeout(timer);

    }, [keyword]);

    //------------------------------------------

    const handleStatus = (status) => {

        onChange({
            ...filters,
            status,
        });

    };

    //------------------------------------------

    const handleSort = (sort) => {

        onChange({
            ...filters,
            sort,
        });

    };

    //------------------------------------------

    return (

        <div
            className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-3
                shadow-sm
            "
        >

            <div
                className="
                    flex
                    flex-col
                    gap-3

                    lg:flex-row
                    lg:items-center
                "
            >

                {/* Search */}

                <div
                    className="
                        relative

                        lg:w-[300px]

                        xl:w-[320px]

                        shrink-0
                    "
                >

                    <Search
                        size={16}
                        className="
                            absolute
                            left-3.5
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "
                    />

                    <Input
                        value={keyword}
                        placeholder="Search Orders..."
                        onChange={(e) =>
                            setKeyword(e.target.value)
                        }
                        className="
                            h-9
                            rounded-lg
                            border-slate-200
                            bg-slate-50
                            pl-10
                            text-[13px]
                            shadow-none
                            transition-all
                            duration-300
                            focus:bg-white
                            focus:border-green-500
                            focus-visible:ring-2
                            focus-visible:ring-green-500/20
                        "
                    />

                </div>

                {/* Status Pills */}

                <div
                    className="
                        flex-1
                        flex
                        items-center
                        justify-center
                        gap-2
                        flex-wrap
                    "
                >
                    {
                        STATUS_OPTIONS.map((item) => {

                            const active =
                                filters.status === item.value;

                            return (

                                <button
                                    key={item.value}
                                    onClick={() =>
                                        handleStatus(item.value)
                                    }
                                    className={`
                                        h-9
                                        rounded-lg
                                        border
                                        px-3
                                        text-[13px]
                                        font-medium
                                        whitespace-nowrap
                                        transition-all
                                        duration-200

                                        ${active
                                            ? `
                                                    border-green-600
                                                    bg-green-600
                                                    text-white
                                                    shadow-sm
                                                `
                                            : `
                                                    border-slate-200
                                                    bg-white
                                                    text-slate-600

                                                    hover:border-green-300
                                                    hover:bg-green-50
                                                    hover:text-green-700
                                                `
                                        }
                                    `}
                                >
                                    {item.label}
                                </button>

                            );

                        })
                    }

                </div>

                {/* Sort */}

                <div
                    className="
                        shrink-0

                        lg:w-[150px]
                    "
                >

                    <Select
                        value={filters.sort}
                        onValueChange={handleSort}
                    >

                        <SelectTrigger
                            className="
                                h-9
                                rounded-lg
                                border-slate-200
                                bg-slate-50
                                text-[13px]
                                transition-all
                                hover:bg-white
                                focus:ring-2
                                focus:ring-green-500/20
                            "
                        >

                            <SelectValue />

                        </SelectTrigger>

                        <SelectContent
                            className="rounded-lg"
                        >

                            {
                                SORT_OPTIONS.map((item) => (

                                    <SelectItem
                                        key={item.value}
                                        value={item.value}
                                        className="text-[13px]"
                                    >

                                        {item.label}

                                    </SelectItem>

                                ))
                            }

                        </SelectContent>

                    </Select>

                </div>

            </div>

        </div>

    );

};

export default OrderFilters;