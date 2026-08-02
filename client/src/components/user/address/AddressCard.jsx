import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Home,
  Building2,
  MapPinned,
  MoreVertical,
  Pencil,
  Trash2,
  CheckCircle2,
  Star,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AddressCard = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  const {
    fullName,
    phone,
    addressLine1,
    addressLine2,
    landmark,
    city,
    state,
    pincode,
    country,
    addressType,
    isDefault,
  } = address;

  const typeIcon =
    addressType === "Office" ? (
      <Building2 className="h-5 w-5" />
    ) : (
      <Home className="h-5 w-5" />
    );

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`group relative overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:shadow-xl ${
        isDefault
          ? "border-emerald-400 ring-2 ring-emerald-100"
          : "border-slate-200"
      }`}
    >
      {/* Top Gradient */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-green-400 to-lime-400" />

      {/* Header */}
      <div className="flex items-start justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            {typeIcon}
          </div>

          <div>
            <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
              {addressType}
            </Badge>

            {isDefault && (
              <div className="mt-2">
                <Badge className="rounded-full bg-green-600 text-white">
                  <Star className="mr-1 h-3 w-3 fill-white" />
                  Default
                </Badge>
              </div>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-xl p-2 transition hover:bg-slate-100">
              <MoreVertical className="h-5 w-5 text-slate-500" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(address)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(address)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Body */}
      <div className="space-y-5 px-6 pb-6">
        {/* Name */}
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {fullName}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
            <Phone className="h-4 w-4 text-emerald-500" />
            {phone}
          </div>
        </div>

        {/* Address */}
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="flex gap-3">
            <MapPinned className="mt-1 h-5 w-5 text-emerald-500" />

            <div className="space-y-1 text-sm leading-6 text-slate-600">
              <p>{addressLine1}</p>

              {addressLine2 && (
                <p>{addressLine2}</p>
              )}

              {landmark && (
                <p>{landmark}</p>
              )}

              <p>
                {city}, {state}
              </p>

              <p>{pincode}</p>

              <p>{country}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap gap-3 pt-2">
          {!isDefault && (
            <Button
              variant="outline"
              className="rounded-xl border-emerald-200 hover:bg-emerald-50"
              onClick={() => onSetDefault(address)}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Set Default
            </Button>
          )}

          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => onEdit(address)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <Button
            variant="destructive"
            onClick={() => onDelete(address)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Hover Decoration */}
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-emerald-100 opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-100" />
    </motion.div>
  );
};

export default AddressCard;