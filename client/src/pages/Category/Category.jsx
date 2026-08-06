import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid2X2 } from "lucide-react";

import CategoryGrid from "@/components/Category/CategoryGrid";
import CategorySkeleton from "@/components/Category/CategorySkeleton";
import CategoryEmpty from "@/components/Category/CategoryEmpty";

import { getCategories } from "@/redux/category/categoryThunk";

const Category = () => {
  const dispatch = useDispatch();

  const { categories = [], loading } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-10">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            <Grid2X2 size={18} />
            Shop by Category
          </div>

          <h2 className="text-3xl font-bold">
            Explore Categories
          </h2>

          <p className="mt-2 text-gray-500">
            Fresh groceries selected by our team.
          </p>

        </div>

        {loading ? (
          <CategorySkeleton />
        ) : categories.length > 0 ? (
          <CategoryGrid categories={categories} />
        ) : (
          <CategoryEmpty />
        )}

      </div>
    </section>
  );
};

export default Category;