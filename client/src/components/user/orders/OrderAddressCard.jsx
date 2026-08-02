import {
    MapPin,
    Phone,
    User,
    Home,
    Building2,
    MapPinned,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const OrderAddressCard = ({ address }) => {

    if (!address) return null;

    //------------------------------------------

    const getAddressType = () => {

        switch (address.addressType) {

            case "Office":
                return {
                    label: "Office",
                    icon: Building2,
                    color:
                        "bg-blue-50 text-blue-700 border-blue-200",
                };

            case "Other":
                return {
                    label: "Other",
                    icon: MapPinned,
                    color:
                        "bg-purple-50 text-purple-700 border-purple-200",
                };

            default:
                return {
                    label: "Home",
                    icon: Home,
                    color:
                        "bg-green-50 text-green-700 border-green-200",
                };

        }

    };

    //------------------------------------------

    const type = getAddressType();

    const TypeIcon = type.icon;

    //------------------------------------------

    return (

        <Card className="rounded-2xl border border-slate-200 shadow-sm">

            <div className="p-5">

                {/* Header */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        <MapPin
                            size={18}
                            className="text-green-600"
                        />

                        <h3 className="font-semibold text-slate-900">

                            Delivery Address

                        </h3>

                    </div>

                    <Badge
                        variant="outline"
                        className={type.color}
                    >

                        <TypeIcon
                            size={13}
                            className="mr-1"
                        />

                        {type.label}

                    </Badge>

                </div>

                {/* Customer */}

                <div className="mt-5 space-y-4">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">

                            <User
                                size={18}
                                className="text-green-600"
                            />

                        </div>

                        <div>

                            <p className="text-sm font-semibold text-slate-900">

                                {address.fullName}

                            </p>

                            <p className="text-xs text-slate-500">

                                Recipient

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">

                            <Phone
                                size={18}
                                className="text-blue-600"
                            />

                        </div>

                        <div>

                            <p className="text-sm font-semibold text-slate-900">

                                {address.phone}

                            </p>

                            <p className="text-xs text-slate-500">

                                Contact Number

                            </p>

                        </div>

                    </div>

                </div>

                {/* Address */}

                <div className="mt-6 rounded-xl bg-slate-50 p-4">

                    <p className="text-sm leading-7 text-slate-700">

                        {address.addressLine1}

                        {address.addressLine2 &&
                            `, ${address.addressLine2}`}

                        {address.landmark &&
                            `, ${address.landmark}`}

                        <br />

                        {address.city},{" "}
                        {address.state}

                        {" - "}

                        {address.pincode}

                        <br />

                        {address.country}

                    </p>

                </div>

            </div>

        </Card>

    );

};

export default OrderAddressCard;