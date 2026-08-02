import { Pencil, Trash2 } from "lucide-react";

const CategoryTable = ({
  categories,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-6 py-4 text-left">Image</th>
            <th className="px-6 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-left">Slug</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-10 text-center text-slate-500"
              >
                No Categories Found
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr
                key={category._id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <img
                    src={category.image?.url || "/images/no-image.png"}
                    alt={category.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                </td>

                <td className="px-6 py-4 font-medium">
                  {category.name}
                </td>

                <td className="px-6 py-4 text-slate-500">
                  {category.slug}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${category.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {category.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(category)}
                      className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(category)}
                      className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;