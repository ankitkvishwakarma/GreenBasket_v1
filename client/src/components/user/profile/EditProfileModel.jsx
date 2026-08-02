import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    X,
    Camera,
    User,
    Phone,
    Calendar,
    Users,
    Loader2,
} from "lucide-react";

const EditProfileModal = ({
    open,
    onClose,
    user,
    loading,
    onSubmit,
}) => {

    const [preview, setPreview] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        dob: "",
        gender: "",
        image: null,
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                phone: user.phone || "",
                dob: user.dob ? user.dob.slice(0, 10) : "",
                gender: user.gender || "",
                image: null,
            });

            setPreview(user?.avatar?.url || "");
        }
    }, [user]);

    //---------------------------------------

    const handleChange = (e) => {

        setFormData((prev) => ({

            ...prev,

            [e.target.name]: e.target.value,

        }));

    };

    //---------------------------------------

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setFormData((prev) => ({

            ...prev,

            image: file,

        }));

        setPreview(

            URL.createObjectURL(file)

        );

    };

    //---------------------------------------

    const submitHandler = (e) => {

        e.preventDefault();

        onSubmit(formData);

    };

    //---------------------------------------

    if (!open) return null;

    return (

        <AnimatePresence>

            <motion.div

                initial={{ opacity: 0 }}

                animate={{ opacity: 1 }}

                exit={{ opacity: 0 }}

                className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"

            >

                <motion.div

                    initial={{ scale: .9, opacity: 0 }}

                    animate={{ scale: 1, opacity: 1 }}

                    exit={{ scale: .9, opacity: 0 }}

                    className="w-full max-w-xl bg-white rounded-2xl shadow-2xl"

                >

                    {/* Header */}

                    <div className="flex items-center justify-between border-b px-5 py-4">

                        <h2 className="text-lg font-semibold">

                            Edit Profile

                        </h2>

                        <button onClick={onClose}>

                            <X size={20} />

                        </button>

                    </div>

                    <form

                        onSubmit={submitHandler}

                        className="p-5 space-y-5"

                    >

                        {/* Avatar */}

                        <div className="flex justify-center">

                            <div className="relative">

                                <img

                                    src={
                                        preview ||
                                        "https://ui-avatars.com/api/?name=User"
                                    }

                                    alt=""

                                    className="w-24 h-24 rounded-full object-cover border-4 border-green-100"

                                />

                                <label

                                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center cursor-pointer"

                                >

                                    <Camera size={15} />

                                    <input

                                        hidden

                                        type="file"

                                        accept="image/*"

                                        onChange={handleImage}

                                    />

                                </label>

                            </div>

                        </div>

                        {/* Name */}

                        <div>

                            <label className="text-sm font-medium">

                                Full Name

                            </label>

                            <div className="relative mt-2">

                                <User

                                    size={17}

                                    className="absolute left-3 top-3.5 text-gray-400"

                                />

                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full h-10 rounded-xl border border-gray-300 pl-10 pr-4 text-sm outline-none focus:border-green-600"
                                />
                            </div>

                        </div>

                        {/* Email */}

                        <div>

                            <label className="text-sm font-medium">

                                Email

                            </label>

                            <input

                                disabled

                                value={user?.email || ""}

                                className="mt-2 w-full h-10 rounded-xl bg-gray-100 border border-gray-200 px-4 text-sm"

                            />

                        </div>

                        {/* Phone + DOB */}

                        <div className="grid grid-cols-2 gap-4">

                            <div>

                                <label className="text-sm font-medium">

                                    Phone

                                </label>

                                <div className="relative mt-2">

                                    <Phone

                                        size={17}

                                        className="absolute left-3 top-3.5 text-gray-400"

                                    />

                                    <input

                                        name="phone"

                                        value={formData.phone}

                                        onChange={handleChange}

                                        className="w-full h-10 rounded-xl border border-gray-300 pl-10 pr-4 text-sm"

                                    />

                                </div>

                            </div>

                            <div>

                                <label className="text-sm font-medium">

                                    DOB

                                </label>

                                <div className="relative mt-2">

                                    <Calendar

                                        size={17}

                                        className="absolute left-3 top-3.5 text-gray-400"

                                    />

                                    <input

                                        type="date"

                                        name="dob"

                                        value={formData.dob}

                                        onChange={handleChange}

                                        className="w-full h-10 rounded-xl border border-gray-300 pl-10 pr-4 text-sm"

                                    />

                                </div>

                            </div>

                        </div>

                        {/* Gender */}

                        <div>

                            <label className="text-sm font-medium">

                                Gender

                            </label>

                            <div className="relative mt-2">

                                <Users

                                    size={17}

                                    className="absolute left-3 top-3.5 text-gray-400"

                                />

                                <select

                                    name="gender"

                                    value={formData.gender}

                                    onChange={handleChange}

                                    className="w-full h-10 rounded-xl border border-gray-300 pl-10 pr-4 text-sm"

                                >

                                    <option value="">

                                        Select Gender

                                    </option>

                                    <option value="Male">

                                        Male

                                    </option>

                                    <option value="Female">

                                        Female

                                    </option>

                                    <option value="Other">

                                        Other

                                    </option>

                                </select>

                            </div>

                        </div>

                        {/* Footer */}

                        <div className="flex justify-end gap-3 pt-2">

                            <button

                                type="button"

                                onClick={onClose}

                                className="px-5 h-10 rounded-xl border"

                            >

                                Cancel

                            </button>

                            <button

                                type="submit"

                                disabled={loading}

                                className="px-6 h-10 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700"

                            >

                                {

                                    loading

                                        ?

                                        <Loader2

                                            size={18}

                                            className="animate-spin"

                                        />

                                        :

                                        "Save Changes"

                                }

                            </button>

                        </div>

                    </form>

                </motion.div>

            </motion.div>

        </AnimatePresence>

    );

};

export default EditProfileModal;