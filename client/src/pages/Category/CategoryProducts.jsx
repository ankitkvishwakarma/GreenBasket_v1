import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "@/redux/product/productThunk";
import ProductGrid from "@/components/Product/Product/ProductGrid";

const CategoryProducts = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.product);

  useEffect(() => {
    console.log("Category Slug:", slug);

    dispatch(
      getProducts({
        category: slug,
      })
    );
  }, [dispatch, slug]);

  console.log("Products:", products);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl py-16 text-center">
        Loading Products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl py-16 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">

      <h1 className="mb-8 text-3xl font-bold capitalize">
        {slug}
      </h1>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          No products found in this category.
        </div>
      ) : (
        <ProductGrid products={products} />
      )}

    </section>
  );
};

export default CategoryProducts;