import { useState } from "react";
import { motion } from "framer-motion";
import {
    Lock,
    Eye,
    EyeOff,
    Loader2,
} from "lucide-react";

const ChangePassword = ({
    loading = false,
    onSubmit,
}) => {

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {

            return alert(
                "New Password and Confirm Password do not match."
            );

        }

        onSubmit({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
        });

        setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });

    };

    const PasswordField = ({
        label,
        name,
        value,
        show,
        setShow,
    }) => (

        <div>

            <label className="text-sm font-medium">
                {label}
            </label>

            <div className="relative mt-2">

                <Lock
                    size={17}
                    className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                    type={show ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    required
                    className="w-full h-10 rounded-xl border border-gray-300 pl-10 pr-10 text-sm outline-none focus:border-green-600"
                />

                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-3 text-gray-500"
                >
                    {show ? (
                        <EyeOff size={18} />
                    ) : (
                        <Eye size={18} />
                    )}
                </button>

            </div>

        </div>

    );

    return (

        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
        >

            <h2 className="text-xl font-semibold">
                Change Password
            </h2>

            <p className="text-sm text-gray-500 mt-1">
                Keep your account secure by updating your password.
            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 mt-5"
            >

                <PasswordField
                    label="Current Password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    show={showCurrent}
                    setShow={setShowCurrent}
                />

                <PasswordField
                    label="New Password"
                    name="newPassword"
                    value={formData.newPassword}
                    show={showNew}
                    setShow={setShowNew}
                />

                <PasswordField
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    show={showConfirm}
                    setShow={setShowConfirm}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-60 flex items-center justify-center"
                >

                    {loading ? (
                        <Loader2
                            size={18}
                            className="animate-spin"
                        />
                    ) : (
                        "Update Password"
                    )}

                </button>

            </form>

        </motion.div>

    );

};

export default ChangePassword;