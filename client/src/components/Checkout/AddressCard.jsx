import {
  MapPin,
  Home,
  Building2,
  Briefcase,
  CheckCircle,
  Pencil,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  setSelectedAddress,
} from "@/redux/user/address/addressSlice";

const AddressCard = ({
  address,
  onContinue,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedAddress } = useSelector(
    (state) => state.address
  );

  const selected =
    selectedAddress === address._id;

  const handleSelectAddress = () => {
    dispatch(
      setSelectedAddress(address._id)
    );

    if (onContinue) {
      onContinue();
    }
  };

    const themes = {
    Home: {
      badge:
        "bg-green-100 text-green-700",

      iconBg:
        "bg-green-100",

      iconColor:
        "text-green-600",

      Icon: Home,
    },

    Office: {
      badge:
        "bg-violet-100 text-violet-700",

      iconBg:
        "bg-violet-100",

      iconColor:
        "text-violet-600",

      Icon: Building2,
    },

    Work: {
      badge:
        "bg-blue-100 text-blue-700",

      iconBg:
        "bg-blue-100",

      iconColor:
        "text-blue-600",

      Icon: Briefcase,
    },

    Other: {
      badge:
        "bg-orange-100 text-orange-700",

      iconBg:
        "bg-orange-100",

      iconColor:
        "text-orange-600",

      Icon: MapPin,
    },
  };
    const theme =
    themes[address.addressType] || {
      badge:
        "bg-gray-100 text-gray-700",

      iconBg:
        "bg-gray-100",

      iconColor:
        "text-gray-600",

      Icon: MapPin,
    };

  const AddressIcon = theme.Icon;
  return (
  <div
    onClick={handleSelectAddress}
    className={`
      relative
      cursor-pointer
      overflow-hidden
      rounded-xl
      border
      bg-white
      p-4
      transition-all
      duration-300

      ${
        selected
          ? "border-green-500 shadow-md ring-2 ring-green-100"
          : "border-gray-200 hover:border-green-300 hover:shadow-sm"
      }
    `}
  >

    {/* Selected Border */}

    {selected && (
      <div className="absolute left-0 top-0 h-full w-1 bg-green-600 rounded-l-xl" />
    )}

    {/* Header */}

    <div className="flex items-start justify-between">

      {/* Left */}

      <div className="flex gap-3">

        <div
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl

            ${theme.iconBg}
          `}
        >
          <AddressIcon
            size={18}
            className={theme.iconColor}
          />
        </div>

        <div>

          {/* Badge */}

          <div className="mb-1 flex flex-wrap items-center gap-2">

            <span
              className={`
                rounded-full
                px-2.5
                py-1
                text-[10px]
                font-bold
                uppercase
                tracking-wide

                ${theme.badge}
              `}
            >
              {address.addressType}
            </span>

            {address.isDefault && (
              <span
                className="
                  rounded-full
                  bg-gray-100
                  px-2
                  py-1
                  text-[10px]
                  font-semibold
                  text-gray-600
                "
              >
                Default
              </span>
            )}

          </div>

          {/* Name */}

          <h3 className="text-sm font-semibold text-gray-900">
            {address.fullName}
          </h3>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-2">

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/user/address");
          }}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            border
            border-gray-200
            transition
            hover:border-green-500
            hover:text-green-600
          "
        >
          <Pencil size={14} />
        </button>

        <input
          type="radio"
          checked={selected}
          onChange={handleSelectAddress}
          className="
            h-5
            w-5
            cursor-pointer
            accent-green-600
          "
        />

      </div>

    </div>

    {/* Address */}
    <div className="mt-4 pl-[52px]">

  {/* Address */}

  <div className="space-y-1">

    <p className="text-xs leading-5 text-gray-600">
      {address.address}
    </p>

    <p className="text-xs text-gray-500">
      {address.city}, {address.state} -{" "}
      {address.postalCode}
    </p>

    <p className="flex items-center gap-2 pt-2 text-sm font-medium text-gray-800">

      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">

        📞

      </span>

      {address.phone}

    </p>

  </div>

  {/* Bottom */}

  <div className="mt-4 flex items-center justify-between">

    {/* Left */}

    <div className="flex items-center gap-2">

      {selected ? (

        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold text-green-700">

          <CheckCircle size={13} />

          Selected

        </span>

      ) : (

        <span className="text-xs text-gray-400">
          Tap to select address
        </span>

      )}

    </div>

    {/* Edit */}

    <button
      onClick={(e) => {
        e.stopPropagation();
        navigate("/user/address");
      }}
      className="text-xs font-medium text-green-600 transition hover:text-green-700"
    >
      Edit
    </button>

  </div>

</div>

</div>
);
}
export default AddressCard;