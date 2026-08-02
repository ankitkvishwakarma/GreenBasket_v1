import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getCategories } from "@/redux/admin/category/AdminCategoryThunk";

import CategoryList from "../categories/CategoryList";
import AddCategory from "../categories/AddCategory";
import EditCategory from "../categories/EditCategory";
import DeleteCategoryModal from "../categories/DeleteCategoryModal";

const Category = () => {
  const dispatch = useDispatch();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedCategory(null);
  };

  return (
    <>
      <CategoryList
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddCategory
        open={showAddModal}
        onClose={closeModal}
      />

      <EditCategory
        open={showEditModal}
        category={selectedCategory}
        onClose={closeModal}
      />

      <DeleteCategoryModal
        open={showDeleteModal}
        category={selectedCategory}
        onClose={closeModal}
      />
    </>
  );
};

export default Category;