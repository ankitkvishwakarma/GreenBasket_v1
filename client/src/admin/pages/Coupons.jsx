import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getCoupons } from "@/redux/admin/coupon/couponThunk";

import CouponList from "../coupons/CouponList";
import AddCoupon from "../coupons/AddCoupon";
import EditCoupon from "../coupons/EditCoupon";
import DeleteCouponModal from "../coupons/DeleteCouponModal";

const Coupons = () => {
  const dispatch = useDispatch();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCoupon, setSelectedCoupon] = useState(null);

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleEdit = (coupon) => {
    setSelectedCoupon(coupon);
    setShowEditModal(true);
  };

  const handleDelete = (coupon) => {
    setSelectedCoupon(coupon);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedCoupon(null);
  };

  return (
    <>
      <CouponList
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddCoupon
        open={showAddModal}
        onClose={closeModal}
      />

      <EditCoupon
        open={showEditModal}
        coupon={selectedCoupon}
        onClose={closeModal}
      />

      <DeleteCouponModal
        open={showDeleteModal}
        coupon={selectedCoupon}
        onClose={closeModal}
      />
    </>
  );
};

export default Coupons;