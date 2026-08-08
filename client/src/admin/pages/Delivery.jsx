import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getDeliveryBoys,
  getDeliveryBoyById,
  registerDeliveryBoy,
  updateDeliveryBoy,
  verifyDeliveryBoy,
  updateAvailability,
  deleteDeliveryBoy,
  assignDeliveryBoy,
  getDeliveryLocation,
} from "../../redux/admin/delivery/deliveryThunk";

import { fetchOrders } from "../../redux/admin/order/orderThunk";

import DeliveryHeader from "../delivery/DeliveryHeader";
import DeliverySearch from "../delivery/DeliverySearch";
import DeliveryFilters from "../delivery/DeliveryFilters";
import DeliveryTable from "../delivery/DeliveryTable";
import DeliveryForm from "../delivery/DeliveryForm";
import DeliveryDetailsModal from "../delivery/DeliveryDetailsModal";
import DeleteDeliveryModal from "../delivery/DeleteDeliveryModal";
import AssignOrderModal from "../delivery/AssignOrderModal";
import DeliveryLocationModal from "../delivery/DeliveryLocationModal";

const Delivery = () => {
  const dispatch = useDispatch();

  // ==========================================
  // REDUX STATE
  // ==========================================

  const {
    deliveryBoys = [],
    deliveryBoy = null,
    currentLocation = null,
    loading = false,
    error = null,
    message = "",
  } = useSelector((state) => state.delivery);

  const { orders = [] } = useSelector(
    (state) => state.order
  );

  // ==========================================
  // LOCAL STATE
  // ==========================================

  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("All");

  const [selectedDeliveryBoy, setSelectedDeliveryBoy] =
    useState(null);

  const [openForm, setOpenForm] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  // ==========================================
  // INITIAL DATA
  // ==========================================

  useEffect(() => {
    dispatch(getDeliveryBoys());
    dispatch(fetchOrders());
  }, [dispatch]);

  // ==========================================
  // REFRESH DELIVERY DATA
  // ==========================================

  const refreshDeliveryData = () => {
    dispatch(getDeliveryBoys());
  };

  // ==========================================
  // ADD DELIVERY BOY
  // ==========================================

  const handleAdd = () => {
    setSelectedDeliveryBoy(null);
    setOpenForm(true);
  };

  // ==========================================
  // VIEW DELIVERY BOY
  // ==========================================

  const handleView = async (item) => {
    if (!item?._id) return;

    setSelectedDeliveryBoy(item);
    setDetailsOpen(true);

    dispatch(getDeliveryBoyById(item._id));
  };

  // ==========================================
  // EDIT DELIVERY BOY
  // ==========================================

  const handleEdit = async (item) => {
    if (!item?._id) return;

    setSelectedDeliveryBoy(item);
    setOpenForm(true);

    dispatch(getDeliveryBoyById(item._id));
  };

  // ==========================================
  // CLOSE FORM
  // ==========================================

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedDeliveryBoy(null);
  };

  // ==========================================
  // ADD / UPDATE DELIVERY BOY
  // ==========================================

  const handleSubmit = async (data) => {
    let result;

    // UPDATE
    if (selectedDeliveryBoy?._id) {
      result = await dispatch(
        updateDeliveryBoy({
          id: selectedDeliveryBoy._id,
          formData: data,
        })
      );
    }

    // ADD
    else {
      result = await dispatch(
        registerDeliveryBoy(data)
      );
    }

    if (!result.error) {
      handleCloseForm();
      refreshDeliveryData();
    }
  };

  // ==========================================
  // DELETE DELIVERY BOY
  // ==========================================

  const handleDelete = (item) => {
    if (!item?._id) return;

    setSelectedDeliveryBoy(item);
    setDeleteOpen(true);
  };

  const confirmDelete = async (id) => {
    if (!id) return;

    const result = await dispatch(
      deleteDeliveryBoy(id)
    );

    if (!result.error) {
      setDeleteOpen(false);
      setSelectedDeliveryBoy(null);

      refreshDeliveryData();
    }
  };

  // ==========================================
  // CLOSE DELETE MODAL
  // ==========================================

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setSelectedDeliveryBoy(null);
  };

  // ==========================================
  // VERIFY DELIVERY BOY
  // ==========================================

  const handleVerify = async (item) => {
    if (!item?._id) return;

    const result = await dispatch(
      verifyDeliveryBoy(item._id)
    );

    if (!result.error) {
      refreshDeliveryData();
    }
  };

  // ==========================================
  // UPDATE AVAILABILITY
  // ==========================================

  const handleAvailabilityChange = async (item) => {
    if (!item?._id) return;

    const result = await dispatch(
      updateAvailability({
        id: item._id,
        isAvailable: !item.isAvailable,
      })
    );

    if (!result.error) {
      refreshDeliveryData();
    }
  };

  // ==========================================
  // ASSIGN ORDER
  // ==========================================

  const handleAssignOpen = (item) => {
    if (!item?._id) return;

    setSelectedDeliveryBoy(item);
    setAssignOpen(true);
  };

  const handleAssign = async (data) => {
    if (!data?.orderId || !data?.deliveryBoyId) {
      return;
    }

    const result = await dispatch(
      assignDeliveryBoy({
        orderId: data.orderId,
        deliveryBoyId: data.deliveryBoyId,
      })
    );

    if (!result.error) {
      setAssignOpen(false);
      setSelectedDeliveryBoy(null);

      // Refresh delivery boys
      dispatch(getDeliveryBoys());

      // Refresh orders
      dispatch(fetchOrders());
    }
  };

  // ==========================================
  // CLOSE ASSIGN MODAL
  // ==========================================

  const handleCloseAssign = () => {
    setAssignOpen(false);
    setSelectedDeliveryBoy(null);
  };

  // ==========================================
  // DELIVERY LOCATION
  // ==========================================

  const handleLocation = (item) => {
    if (!item?._id) return;

    setSelectedDeliveryBoy(item);
    setLocationOpen(true);

    dispatch(
      getDeliveryLocation(item._id)
    );
  };

  const loadLocation = (id) => {
    if (!id) return;

    dispatch(getDeliveryLocation(id));
  };

  // ==========================================
  // CLOSE LOCATION MODAL
  // ==========================================

  const handleCloseLocation = () => {
    setLocationOpen(false);
    setSelectedDeliveryBoy(null);
  };

  // ==========================================
  // CLOSE DETAILS MODAL
  // ==========================================

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedDeliveryBoy(null);
  };

  // ==========================================
  // SEARCH + FILTER
  // ==========================================

  const filteredDeliveryBoys = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return deliveryBoys.filter((item) => {
      const name = String(
        item.name || ""
      ).toLowerCase();

      const email = String(
        item.email || ""
      ).toLowerCase();

      const phone = String(
        item.phone || ""
      ).toLowerCase();

      const vehicleNumber = String(
        item.vehicleNumber || ""
      ).toLowerCase();

      // SEARCH
      const matchesSearch =
        !keyword ||
        name.includes(keyword) ||
        email.includes(keyword) ||
        phone.includes(keyword) ||
        vehicleNumber.includes(keyword);

      // FILTER
      let matchesAvailability;

switch (availability) {
  case "Available":
    matchesAvailability =
      item.isAvailable === true;
    break;

  case "Unavailable":
    matchesAvailability =
      item.isAvailable === false;
    break;

  case "Verified":
    matchesAvailability =
      item.isVerified === true;
    break;

  case "Unverified":
    matchesAvailability =
      item.isVerified !== true;
    break;

  default:
    matchesAvailability = true;
    break;
}
      return (
        matchesSearch &&
        matchesAvailability
      );
    });
  }, [
    deliveryBoys,
    search,
    availability,
  ]);

  // ==========================================
  // DELIVERY STATISTICS
  // ==========================================

  const stats = useMemo(() => {
    return {
      total: deliveryBoys.length,

      verified: deliveryBoys.filter(
        (item) => item.isVerified === true
      ).length,

      available: deliveryBoys.filter(
        (item) => item.isAvailable === true
      ).length,

      unavailable: deliveryBoys.filter(
        (item) => item.isAvailable !== true
      ).length,
    };
  }, [deliveryBoys]);

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="space-y-6">

      {/* ======================================
          DELIVERY HEADER
      ====================================== */}

      <DeliveryHeader
        stats={stats}
        onAdd={handleAdd}
      />

      {/* ======================================
          ERROR MESSAGE
      ====================================== */}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* ======================================
          SUCCESS MESSAGE
      ====================================== */}

      {message && !error && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
          {message}
        </div>
      )}

      {/* ======================================
          SEARCH + FILTER
      ====================================== */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <DeliverySearch
          value={search}
          onChange={setSearch}
        />

        <DeliveryFilters
          value={availability}
          onChange={setAvailability}
        />

      </div>

      {/* ======================================
          DELIVERY TABLE
      ====================================== */}

      <DeliveryTable
        loading={loading}
        deliveryBoys={filteredDeliveryBoys}

        onView={handleView}

        onEdit={handleEdit}

        onDelete={handleDelete}

        onVerify={handleVerify}

        onAssign={handleAssignOpen}

        onLocation={handleLocation}

        onAvailabilityChange={
          handleAvailabilityChange
        }
      />

      {/* ======================================
          ADD / EDIT FORM
      ====================================== */}

      <DeliveryForm
        open={openForm}
        onClose={handleCloseForm}
        deliveryBoy={selectedDeliveryBoy}
        loading={loading}
        onSubmit={handleSubmit}
      />

      {/* ======================================
          DETAILS MODAL
      ====================================== */}

      <DeliveryDetailsModal
        open={detailsOpen}
        onClose={handleCloseDetails}
        deliveryBoy={
          deliveryBoy || selectedDeliveryBoy
        }
      />

      {/* ======================================
          DELETE MODAL
      ====================================== */}

      <DeleteDeliveryModal
        open={deleteOpen}
        onClose={handleCloseDelete}
        loading={loading}
        deliveryBoy={selectedDeliveryBoy}
        onDelete={confirmDelete}
      />

      {/* ======================================
          ASSIGN ORDER MODAL
      ====================================== */}

      <AssignOrderModal
        open={assignOpen}
        onClose={handleCloseAssign}
        onAssign={handleAssign}
        loading={loading}
        deliveryBoys={deliveryBoys}
        orders={orders}
        deliveryBoy={selectedDeliveryBoy}
      />

      {/* ======================================
          LIVE LOCATION MODAL
      ====================================== */}

      <DeliveryLocationModal
        open={locationOpen}
        onClose={handleCloseLocation}
        deliveryBoy={selectedDeliveryBoy}
        location={currentLocation}
        onLoadLocation={loadLocation}
      />

    </div>
  );
};

export default Delivery;