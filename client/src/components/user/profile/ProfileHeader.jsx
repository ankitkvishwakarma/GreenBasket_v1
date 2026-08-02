import { motion } from "framer-motion";
import { Pencil } from "lucide-react";

const ProfileHeader = ({
    user,
    onEdit,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
            {/* Left */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">
                    My Profile
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage your personal information and account details.
                </p>

                {user?.updatedAt && (
                    <p className="mt-1 text-xs text-gray-400">
                        Last updated{" "}
                        {new Date(user.updatedAt).toLocaleDateString()}
                    </p>
                )}
            </div>

            {/* Right */}
            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onEdit}
                className="
                    inline-flex
                    items-center
                    gap-2
                    h-10
                    px-5
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    text-sm
                    font-medium
                    shadow-sm
                    hover:border-green-600
                    hover:text-green-700
                    transition-all
                "
            >
                <Pencil size={16} />

                Edit Profile
            </motion.button>
        </motion.div>
    );
};

export default ProfileHeader;