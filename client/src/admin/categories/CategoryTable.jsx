import { Pencil, Trash2 } from "lucide-react";

const CategoryTable = ({
  categories = [],
  loading = false,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        <div className="text-center text-gray-500">
          Loading categories...
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                #
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Image
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Slug
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Description
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Created
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-12 text-center text-gray-500"
                >
                  No Categories Found
                </td>
              </tr>
            ) : (
              categories.map((category, index) => (
                <tr
                  key={category._id}
                  className="border-t transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    <img
                      src={
                        category.image?.url ||
                        "/images/no-image.png"
                      }
                      alt={category.name}
                      className="h-14 w-14 rounded-lg border object-cover"
                      onError={(e) => {
                        e.target.src = "/images/no-image.png";
                      }}
                    />
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {category.name}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {category.slug}
                  </td>

                  <td className="max-w-xs px-6 py-4 text-gray-500">
                    <p className="truncate">
                      {category.description || "-"}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        category.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {category.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    {category.createdAt
                      ? new Date(
                          category.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onEdit(category)}
                        className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                        title="Edit Category"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => onDelete(category)}
                        className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                        title="Delete Category"
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
    </div>
  );
};

export default CategoryTable;