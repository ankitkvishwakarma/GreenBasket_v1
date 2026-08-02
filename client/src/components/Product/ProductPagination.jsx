import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  // Hide pagination if only one page
  if (totalPages <= 1) return null;

  // Generate page numbers
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {/* Previous */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
          currentPage === 1
            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
            : "border-gray-300 bg-white hover:border-green-600 hover:text-green-600"
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange?.(page)}
          className={`flex h-11 w-11 items-center justify-center rounded-xl border font-medium transition ${
            currentPage === page
              ? "border-green-600 bg-green-600 text-white"
              : "border-gray-300 bg-white hover:border-green-600 hover:text-green-600"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
          currentPage === totalPages
            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
            : "border-gray-300 bg-white hover:border-green-600 hover:text-green-600"
        }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default ProductPagination;