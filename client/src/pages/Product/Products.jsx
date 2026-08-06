import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import ProductHeader from "@/components/Product/products/ProductHeader";
import ProductToolbar from "@/components/Product/products/ProductToolbar";
import ProductFilter from "@/components/Product/products/ProductFilter";
import ProductGrid from "@/components/Product/products/ProductGrid";
import ProductPagination from "@/components/Product/products/ProductPagination";
import ProductSkeleton from "@/components/Product/products/ProductSkeleton";
import ProductEmpty from "@/components/Product/products/ProductEmpty";

import { getProducts } from "@/redux/product/productThunk";

const Products = () => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const category =
    searchParams.get("category") || "";

  const keyword =
    searchParams.get("keyword") || "";

  const page =
    Number(searchParams.get("page")) || 1;

  const sort =
    searchParams.get("sort") || "latest";

  const {
    products,
    loading,
    totalPages,
    currentPage,
  } = useSelector((state) => state.product);

  // ================= Debug =================

  console.log("Category =>", category);
  console.log("Keyword =>", keyword);
  console.log("Page =>", page);
  console.log("Sort =>", sort);
  console.log("Redux Products =>", products);

  // ================= API =================

  useEffect(() => {
    dispatch(
      getProducts({
        page,
        category,
        keyword,
        sort,
      })
    );
  }, [
    dispatch,
    page,
    category,
    keyword,
    sort,
  ]);

  // ================= Sort =================

  const handleSortChange = (value) => {
    const params = new URLSearchParams(
      searchParams
    );

    params.set("sort", value);

    params.set("page", "1");

    setSearchParams(params);
  };

  // ================= Pagination =================

  const handlePageChange = (value) => {
    const params = new URLSearchParams(
      searchParams
    );

    params.set("page", value.toString());

    setSearchParams(params);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4">

        <ProductHeader />

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">

          <ProductFilter />

          <div>

            <ProductToolbar
              sort={sort}
              onSortChange={handleSortChange}
            />

            {loading ? (
              <ProductSkeleton />
            ) : products?.length > 0 ? (
              <>
                <ProductGrid
                  products={products}
                />

                <ProductPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={
                    handlePageChange
                  }
                />
              </>
            ) : (
              <ProductEmpty />
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default Products;