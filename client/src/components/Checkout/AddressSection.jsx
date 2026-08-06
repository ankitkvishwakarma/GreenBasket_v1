import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getAddresses,
} from "@/redux/user/address/addressThunk";

import AddressCard from "./AddressCard";

const AddressSection = ({
  onContinue,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    addresses,
    loading,
    error,
  } = useSelector(
    (state) => state.address
  );

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        Loading Addresses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-5 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <section className="space-y-4">

      {/* Header */}

      <div className="rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-white p-5">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-xl font-bold text-gray-900">
              Delivery Address
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Choose where you want your order delivered.
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/user/address")
            }
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            <Plus size={16} />

            Add Address

          </button>

        </div>

      </div>

      {/* Address List */}

      <div className="grid gap-4">

        {addresses.map((address) => (

          <AddressCard
            key={address._id}
            address={address}
            onContinue={onContinue}
          />

        ))}

      </div>

    </section>
  );
};

export default AddressSection;