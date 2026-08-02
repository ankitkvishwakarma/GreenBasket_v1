import { motion } from "framer-motion";
import {
    User,
    Mail,
    Phone,
    Calendar,
    Users,
    Shield,
} from "lucide-react";

const PersonalInfo = ({ user }) => {

    const fields = [

        {
            icon: User,
            label: "Full Name",
            value: user?.name || "-",
        },

        {
            icon: Mail,
            label: "Email Address",
            value: user?.email || "-",
        },

        {
            icon: Phone,
            label: "Phone Number",
            value: user?.phone || "Not Added",
        },

        {
            icon: Calendar,
            label: "Date of Birth",
            value: user?.dob
                ? new Date(user.dob).toLocaleDateString()
                : "Not Added",
        },

        {
            icon: Users,
            label: "Gender",
            value: user?.gender || "Not Added",
        },

        {
            icon: Shield,
            label: "Account Type",
            value: user?.role || "Customer",
        },

    ];

    return (

        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .3 }}
            className="
                bg-white
                rounded-2xl
                border
                border-gray-200
                shadow-sm
                p-5
            "
        >

            {/* Header */}

            <div className="mb-5">

                <h2 className="text-xl font-semibold text-slate-900">

                    Personal Information

                </h2>

                <p className="text-sm text-gray-500 mt-1">

                    Your account details stored in GreenBasket.

                </p>

            </div>

            {/* Information */}

            <div className="space-y-4">

                {

                    fields.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <div
                                key={index}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    border-b
                                    border-gray-100
                                    pb-4
                                    last:border-none
                                    last:pb-0
                                "
                            >

                                <div className="flex items-center gap-3">

                                    <div
                                        className="
                                            w-10
                                            h-10
                                            rounded-xl
                                            bg-green-50
                                            flex
                                            items-center
                                            justify-center
                                        "
                                    >

                                        <Icon
                                            size={18}
                                            className="text-green-700"
                                        />

                                    </div>

                                    <div>

                                        <p className="text-xs text-gray-500">

                                            {item.label}

                                        </p>

                                        <p className="text-sm font-medium text-slate-900">

                                            {item.value}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

        </motion.div>

    );

};

export default PersonalInfo;