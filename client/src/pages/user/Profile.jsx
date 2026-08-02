import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileHeader from "@/components/user/profile/ProfileHeader";
import ProfileCard from "@/components/user/profile/ProfileCard";
import PersonalInfo from "@/components/user/profile/PersonalInfo";
import ChangePassword from "@/components/user/profile/ChangePassword";
import SecurityCard from "@/components/user/profile/SecurityCard";
import EditProfileModal from "@/components/user/profile/EditProfileModel";

import {
    getProfile,
    updateProfile,
    updateAvatar,
    changePassword,
} from "@/redux/user/userprofile/profileThunk";

import {
    resetProfileState,
} from "@/redux/user/userprofile/profileSlice";

const Profile = () => {

    const dispatch = useDispatch();

    const [openEditModal, setOpenEditModal] = useState(false);

    const {

        profile,
        loading,
        updating,
        success,
        error,

    } = useSelector((state) => state.profile);

    useEffect(() => {

        dispatch(getProfile());

    }, [dispatch]);

    useEffect(() => {

        if (success) {

            setOpenEditModal(false);

            dispatch(resetProfileState());

        }

    }, [success, dispatch]);

    //-----------------------------------
    // Update Profile
    //-----------------------------------

    const handleProfileUpdate = (data) => {

        if (data.image) {

            const formData = new FormData();

            formData.append("avatar", data.image);

            dispatch(updateAvatar(formData));

        }

        dispatch(

            updateProfile({

                name: data.name,

                phone: data.phone,

                dob: data.dob,

                gender: data.gender,

            })

        );

    };

    //-----------------------------------
    // Change Password
    //-----------------------------------

    const handlePassword = (passwordData) => {

        dispatch(changePassword(passwordData));

    };

    //-----------------------------------

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                <div className="text-green-600 font-medium">

                    Loading Profile...

                </div>

            </div>

        );

    }

    if (error) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                <div className="text-red-600">

                    {error}

                </div>

            </div>

        );

    }

    return (

        <div className="space-y-5">

            {/* Header */}

            <ProfileHeader

                onEdit={() =>

                    setOpenEditModal(true)

                }

            />

            {/* Profile Card */}

            <ProfileCard

                user={profile}

            />

            {/* Content */}

            <div className="grid xl:grid-cols-12 gap-5">

                <div className="xl:col-span-7">

                    <PersonalInfo

                        user={profile}

                    />

                </div>

                <div className="xl:col-span-5 space-y-5">

                    <ChangePassword

                        loading={updating}

                        onSubmit={handlePassword}

                    />

                    <SecurityCard

                        user={profile}

                    />

                </div>

            </div>

            {/* Modal */}

            <EditProfileModal

                open={openEditModal}

                onClose={() =>

                    setOpenEditModal(false)

                }

                user={profile}

                loading={updating}

                onSubmit={handleProfileUpdate}

            />

        </div>

    );

};

export default Profile;