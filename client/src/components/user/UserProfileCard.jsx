import {
    Mail,
    Phone,
    Calendar,
    User,
    Edit,
} from "lucide-react";
import { Link } from "react-router-dom";

const UserProfileCard = ({
    user,
    loading,
}) => {

    if (loading) {
        return (
            <div className="rounded-2xl bg-white p-6 shadow-sm border">
                Loading Profile...
            </div>
        );
    }

    return (

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-8">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                {/* Left */}

                <div className="lg:col-span-3 flex flex-col items-center">

                    <img
                        src={
                            user?.avatar?.url ||
                            `https://ui-avatars.com/api/?background=22c55e&color=fff&name=${encodeURIComponent(
                                user?.name || "User"
                            )}`
                        }
                        alt={user?.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-green-100"
                    />

                    <h2 className="mt-4 text-xl font-semibold text-gray-800 text-center">
                        {user?.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {user?.role}
                    </p>

                    <Link
                        to="/user/profile"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition"
                    >
                        <Edit size={16} />
                        Edit Profile
                    </Link>

                </div>

                {/* Middle */}

                <div className="lg:col-span-5">

                    <div className="space-y-5">

                        <div className="flex items-center gap-4">

                            <Mail
                                size={20}
                                className="text-green-600"
                            />

                            <div>

                                <p className="text-xs text-gray-500">
                                    Email Address
                                </p>

                                <p className="font-medium text-gray-800">
                                    {user?.email}
                                </p>

                            </div>

                        </div>

                        <div className="flex items-center gap-4">

                            <Phone
                                size={20}
                                className="text-green-600"
                            />

                            <div>

                                <p className="text-xs text-gray-500">
                                    Phone Number
                                </p>

                                <p className="font-medium text-gray-800">
                                    {user?.phone}
                                </p>

                            </div>

                        </div>

                        <div className="flex items-center gap-4">

                            <Calendar
                                size={20}
                                className="text-green-600"
                            />

                            <div>

                                <p className="text-xs text-gray-500">
                                    Joined On
                                </p>

                                <p className="font-medium text-gray-800">
                                    {user?.createdAt
                                        ? new Date(
                                              user.createdAt
                                          ).toLocaleDateString()
                                        : "-"}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="lg:col-span-4 border-l border-gray-200 pl-8">

                    <div className="grid grid-cols-2 gap-y-5">

                        <span className="text-gray-500 text-sm">
                            User ID
                        </span>

                        <span className="font-medium text-sm break-all text-right">
                            {user?._id}
                        </span>

                        <span className="text-gray-500 text-sm">
                            Date of Birth
                        </span>

                        <span className="font-medium text-right">
                            {user?.dob
                                ? new Date(
                                      user.dob
                                  ).toLocaleDateString()
                                : "-"}
                        </span>

                        <span className="text-gray-500 text-sm">
                            Gender
                        </span>

                        <span className="font-medium text-right">
                            {user?.gender || "-"}
                        </span>

                        <span className="text-gray-500 text-sm">
                            Role
                        </span>

                        <span className="font-medium text-green-600 text-right">
                            {user?.role}
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default UserProfileCard;