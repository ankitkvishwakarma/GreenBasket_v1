import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import AddressHeader from "@/components/user/address/AddressHeader";
import AddressStats from "@/components/user/address/AddressStats";
import AddressGrid from "@/components/user/address/AddressGrid";
import AddressBanner from "@/components/user/address/AddressBanner";
import AddressFeatures from "@/components/user/address/AddressFeatures";
import AddressEmpty from "@/components/user/address/AddressEmpty";
import AddressSkeleton from "@/components/user/address/AddressSkeleton";
import AddEditAddressDialog from "@/components/user/address/AddEditAddressDialog";
import DeleteAddressDialog from "@/components/user/address/DeleteAddressDialog";

import { getAddresses } from "@/redux/user/address/addressThunk";

const Address = () => {
  const dispatch = useDispatch();

  const { addresses, loading, error } = useSelector(
    (state) => state.address
  );

  const [openForm, setOpenForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteAddress, setDeleteAddress] = useState(null);

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  const handleAdd = () => {
    setSelectedAddress(null);
    setOpenForm(true);
  };

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setOpenForm(true);
  };

  const handleDelete = (address) => {
    setDeleteAddress(address);
    setDeleteOpen(true);
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <AddressHeader
        onAdd={handleAdd}
        total={addresses?.length || 0}
      />

      {/* Stats */}
      <AddressStats
        addresses={addresses || []}
      />

      {/* Loading */}
      {loading && <AddressSkeleton />}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center text-red-600">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading &&
        !error &&
        addresses?.length === 0 && (
          <AddressEmpty onAdd={handleAdd} />
        )}

      {/* Address List */}
      {!loading &&
        !error &&
        addresses?.length > 0 && (
          <>
            <AddressGrid
              addresses={addresses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <AddressBanner onAdd={handleAdd} />

            <AddressFeatures />
          </>
        )}

      {/* Add / Edit Dialog */}
      <AddEditAddressDialog
        open={openForm}
        onOpenChange={setOpenForm}
        address={selectedAddress}
      />

      {/* Delete Dialog */}
      <DeleteAddressDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        address={deleteAddress}
      />
    </motion.div>
  );
};

export default Address;