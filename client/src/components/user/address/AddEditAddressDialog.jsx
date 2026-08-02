import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Home,
    Building2,
    MapPin,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { addressSchema } from "@/validation/addressSchema";

import {
    createAddress,
    updateAddress,
    getAddresses,
} from "@/redux/user/address/addressThunk";
const addressTypes = [
    {
        value: "Home",
        label: "Home",
        icon: Home,
    },
    {
        value: "Office",
        label: "Office",
        icon: Building2,
    },
    {
        value: "Other",
        label: "Other",
        icon: MapPin,
    },
];

const AddEditAddressDialog = ({
    open,
    onOpenChange,
    address,
}) => {
    const isEdit = Boolean(address);
    const dispatch = useDispatch();

    const { loading } = useSelector(
        (state) => state.address
    );

    const {
        register,
        watch,
        reset,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(addressSchema),

        defaultValues: {
            fullName: "",
            phone: "",
            addressType: "Home",
            addressLine1: "",
            addressLine2: "",
            landmark: "",
            city: "",
            state: "",
            pincode: "",
            country: "India",
        },
    });

    const selectedType = watch("addressType");

    useEffect(() => {
        if (address) {
            reset({
                fullName: address.fullName,
                phone: address.phone,
                addressType: address.addressType,
                addressLine1: address.addressLine1,
                addressLine2: address.addressLine2,
                landmark: address.landmark,
                city: address.city,
                state: address.state,
                pincode: address.pincode,
                country: address.country,
            });
        } else {
            reset({
                fullName: "",
                phone: "",
                addressType: "Home",
                addressLine1: "",
                addressLine2: "",
                landmark: "",
                city: "",
                state: "",
                pincode: "",
                country: "India",
            });
        }
    }, [address, reset]);

    const onSubmit = async (data) => {
        try {

            if (isEdit) {

                await dispatch(
                    updateAddress({
                        id: address._id,
                        data,
                    })
                ).unwrap();

                toast.success(
                    "Address updated successfully"
                );

            } else {

                await dispatch(
                    createAddress(data)
                ).unwrap();

                toast.success(
                    "Address added successfully"
                );

            }

            dispatch(getAddresses());

            reset();

            onOpenChange(false);

        } catch (error) {

            toast.error(
                error || "Something went wrong"
            );

        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {

                if (!value) {

                    reset();

                }

                onOpenChange(value);

            }}
        >
            <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-3xl p-0">

                {/* Header */}

                <DialogHeader className="border-b bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-100 px-8 py-6">

                    <DialogTitle className="text-2xl font-bold">
                        {isEdit ? "Edit Address" : "Add New Address"}
                    </DialogTitle>

                    <DialogDescription>
                        Fill your delivery address details below.
                    </DialogDescription>

                </DialogHeader>

                {/* Form */}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8 p-8"
                >

                    {/* Address Type */}

                    <div>

                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-600">
                            Address Type
                        </h3>

                        <div className="grid grid-cols-3 gap-4">

                            {addressTypes.map((item) => {

                                const Icon = item.icon;

                                return (

                                    <motion.button
                                        key={item.value}
                                        type="button"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: .97 }}
                                        onClick={() =>
                                            setValue(
                                                "addressType",
                                                item.value,
                                                {
                                                    shouldValidate: true,
                                                }
                                            )
                                        }
                                        className={`rounded-2xl border p-5 transition-all ${selectedType === item.value
                                            ? "border-emerald-500 bg-emerald-50"
                                            : "border-slate-200"
                                            }`}
                                    >

                                        <Icon className="mx-auto mb-3 h-7 w-7 text-emerald-600" />

                                        <p className="font-semibold">
                                            {item.label}
                                        </p>

                                    </motion.button>

                                );

                            })}

                        </div>

                    </div>

                    {/* Personal Information */}

                    <div className="grid gap-5 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Full Name
                            </label>

                            <Input
                                placeholder="Ankit Kumar"
                                {...register("fullName")}
                            />

                            {errors.fullName && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.fullName.message}
                                </p>
                            )}

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Phone Number
                            </label>

                            <Input
                                placeholder="+91 9876543210"
                                {...register("phone")}
                            />

                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.phone.message}
                                </p>
                            )}

                        </div>

                    </div>

                    {/* Address */}

                    <div className="space-y-5">

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Address Line 1
                            </label>

                            <Textarea
                                rows={3}
                                placeholder="House No., Building, Street..."
                                {...register("addressLine1")}
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Address Line 2
                            </label>

                            <Textarea
                                rows={2}
                                placeholder="Apartment, Floor (Optional)"
                                {...register("addressLine2")}
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Landmark
                            </label>

                            <Input
                                placeholder="Near SBI Bank"
                                {...register("landmark")}
                            />

                        </div>

                    </div>

                    {/* Location */}

                    <div className="grid gap-5 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                City
                            </label>

                            <Input
                                placeholder="Ranchi"
                                {...register("city")}
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                State
                            </label>

                            <Input
                                placeholder="Jharkhand"
                                {...register("state")}
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Pincode
                            </label>

                            <Input
                                placeholder="822101"
                                {...register("pincode")}
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium">
                                Country
                            </label>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="min-w-[170px] bg-emerald-600 hover:bg-emerald-700"
                            >
                                {loading
                                    ? "Saving..."
                                    : isEdit
                                        ? "Update Address"
                                        : "Save Address"}
                            </Button>

                        </div>

                    </div>

                    {/* Footer */}

                    <div className="flex items-center justify-end gap-4 border-t pt-6">

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            {isEdit ? "Update Address" : "Save Address"}
                        </Button>

                    </div>

                </form>

            </DialogContent>
        </Dialog>
    );
};

export default AddEditAddressDialog;