import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Plus, Search } from "lucide-react";

import CategoryTable from "./CategoryTable";

const CategoryList = ({
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [search, setSearch] = useState("");

  const {
    categories = [],
    loading,
  } = useSelector((state) => state.category);

  const filteredCategories = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return categories;

    return categories.filter((category) => {
      return (
        category.name?.toLowerCase().includes(keyword) ||
        category.slug?.toLowerCase().includes(keyword) ||
        category.description
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [categories, search]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Categories
          </h1>

          <p className="mt-1 text-slate-500">
            Manage your product categories.
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
        >
          <Plus size={18} />
          Add Category
        </button>

      </div>

      {/* Search */}
      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-green-500"
        />

      </div>

      {/* Table */}
      <CategoryTable
        categories={filteredCategories}
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default CategoryList;