import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getProducts } from "@/redux/admin/product/productThunk";

import ProductList from "../products/ProductList";
import AddProduct from "../products/AddProduct";
import EditProduct from "../products/EditProduct";
import DeleteProductModal from "../products/DeleteProductModal";

const Products = () => {
  const dispatch = useDispatch();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <ProductList
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddProduct
        open={showAddModal}
        onClose={closeModal}
      />

      <EditProduct
        open={showEditModal}
        product={selectedProduct}
        onClose={closeModal}
      />

      <DeleteProductModal
        open={showDeleteModal}
        product={selectedProduct}
        onClose={closeModal}
      />
    </>
  );
};

export default Products;