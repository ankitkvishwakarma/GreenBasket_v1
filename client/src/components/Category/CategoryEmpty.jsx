import { PackageSearch } from "lucide-react";

const CategoryEmpty = () => {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        border-gray-300
        bg-gray-50
        px-6
        py-20
        text-center
      "
    >
      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-green-100
        "
      >
        <PackageSearch
          size={42}
          className="text-green-600"
        />
      </div>

      <h3 className="mt-6 text-2xl font-bold text-gray-900">
        No Categories Available
      </h3>

      <p className="mt-3 max-w-md text-gray-500">
        Categories added by the administrator will automatically
        appear here.
      </p>
    </div>
  );
};

export default CategoryEmpty;