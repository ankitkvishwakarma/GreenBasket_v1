import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProductPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">

      {/* Previous */}

      <button
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        disabled={currentPage === 1}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-gray-300
          bg-white
          transition
          hover:bg-gray-100
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronLeft size={18} />
      </button>

      {/* Pages */}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            h-11
            w-11
            rounded-xl
            border
            font-medium
            transition

            ${
              currentPage === page
                ? "border-green-600 bg-green-600 text-white"
                : "border-gray-300 bg-white hover:bg-gray-100"
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Next */}

      <button
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-gray-300
          bg-white
          transition
          hover:bg-gray-100
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronRight size={18} />
      </button>

    </div>
  );
};

export default ProductPagination;