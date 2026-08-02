import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    CalendarDays,
    BadgeCheck,
    Camera,
} from "lucide-react";

const ProfileCard = ({
    user,
    onChangePhoto,
}) => {

    const avatar =
        user?.avatar?.url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.name || "User"
        )}&background=16a34a&color=fff`;

    return (

        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="
                bg-white
                rounded-2xl
                border
                border-gray-200
                shadow-sm
                overflow-hidden
            "
        >

            {/* Main Layout */}

            <div className="grid grid-cols-1 lg:grid-cols-[170px_1fr_320px]">

                {/* =======================================================
                                Avatar Section
                ======================================================= */}

                <div
                    className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        px-5
                        py-6
                        bg-gray-50
                        border-b
                        lg:border-b-0
                    "
                >

                    <div className="relative">

                        <img
                            src={avatar}
                            alt={user?.name}
                            className="
                                w-24
                                h-24
                                rounded-full
                                object-cover
                                border-4
                                border-green-100
                                shadow
                            "
                        />

                        <button
                            onClick={onChangePhoto}
                            className="
                                absolute
                                bottom-0
                                right-0
                                w-8
                                h-8
                                rounded-full
                                bg-green-600
                                text-white
                                flex
                                items-center
                                justify-center
                                hover:bg-green-700
                                transition
                            "
                        >
                            <Camera size={15} />
                        </button>

                    </div>

                    <button
                        onClick={onChangePhoto}
                        className="
                            mt-3
                            text-xs
                            font-semibold
                            text-green-700
                            hover:text-green-800
                        "
                    >
                        Change Photo
                    </button>

                </div>

                {/* =======================================================
                                Center Section
                ======================================================= */}

                <div className="flex flex-col justify-center px-8 py-6">

                    <div className="flex items-center gap-2 flex-wrap">

                        <h2 className="text-2xl font-bold text-gray-900">
                            {user?.name}
                        </h2>

                        {user?.isVerified && (

                            <span
                                className="
                                    inline-flex
                                    items-center
                                    gap-1
                                    rounded-full
                                    bg-green-100
                                    px-3
                                    py-1
                                    text-xs
                                    font-semibold
                                    text-green-700
                                "
                            >

                                <BadgeCheck size={14} />

                                Verified

                            </span>

                        )}

                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                        {user?.role || "Customer"}
                    </p>

                    <div className="mt-7 grid md:grid-cols-2 gap-x-10 gap-y-6">

                        {/* Email */}

                        <div className="flex items-center gap-3">

                            <Mail
                                size={18}
                                className="text-green-600"
                            />

                            <div>

                                <p className="text-xs text-gray-500">
                                    Email Address
                                </p>

                                <p className="text-sm font-medium text-gray-800 break-all">
                                    {user?.email}
                                </p>

                            </div>

                        </div>

                        {/* Phone */}

                        <div className="flex items-center gap-3">

                            <Phone
                                size={18}
                                className="text-green-600"
                            />

                            <div>

                                <p className="text-xs text-gray-500">
                                    Phone Number
                                </p>

                                <p className="text-sm font-medium text-gray-800">
                                    {user?.phone || "-"}
                                </p>

                            </div>

                        </div>

                        {/* Joined */}

                        <div className="flex items-center gap-3">

                            <CalendarDays
                                size={18}
                                className="text-green-600"
                            />

                            <div>

                                <p className="text-xs text-gray-500">
                                    Joined On
                                </p>

                                <p className="text-sm font-medium text-gray-800">
                                    {
                                        user?.createdAt
                                            ? new Date(
                                                user.createdAt
                                            ).toLocaleDateString()
                                            : "-"
                                    }
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* =======================================================
                            Right Section
                    (Continue in Part 2)
                ======================================================= */}
                                {/* <div className="px-8 py-6 flex items-center bg-gray-50">

                    <div className="w-full space-y-5">

                        <Info
                            label="User ID"
                            value={user?._id}
                            breakText
                        />

                        <Info
                            label="Date of Birth"
                            value={
                                user?.dob
                                    ? new Date(user.dob).toLocaleDateString()
                                    : "-"
                            }
                        />

                        <Info
                            label="Gender"
                            value={user?.gender || "-"}
                        />

                        <Info
                            label="Role"
                            value={user?.role || "Customer"}
                            green
                        />

                    </div>

                </div> */}

            </div>

        </motion.div>

    );

};

const Info = ({
    label,
    value,
    green = false,
    breakText = false,
}) => {

    return (

        <div className="grid grid-cols-[120px_1fr] items-center gap-4">

            <span className="text-sm text-gray-500">
                {label}
            </span>

            <span
                className={`
                    text-sm
                    font-semibold
                    text-right
                    ${green ? "text-green-600" : "text-gray-900"}
                    ${breakText ? "break-all" : ""}
                `}
            >
                {value}
            </span>

        </div>

    );

};

export default ProfileCard;