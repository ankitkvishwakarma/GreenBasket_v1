import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid2X2 } from "lucide-react";

import CategoryGrid from "./CategoryGrid";
import CategorySkeleton from "./CategorySkeleton";
import CategoryEmpty from "./CategoryEmpty";

import { getCategories } from "@/redux/category/categoryThunk";

const CategorySection = () => {
  const dispatch = useDispatch();

  const {
    categories = [],
    loading,
  } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-10">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            <Grid2X2 size={18} />
            Shop by Category
          </div>

          <h2 className="text-4xl font-bold text-slate-900">
            Explore Categories
          </h2>

          <p className="mt-3 text-slate-500">
            Fresh groceries selected by our team.
          </p>

        </div>

        {loading ? (
          <CategorySkeleton />
        ) : categories.length ? (
          <CategoryGrid categories={categories} />
        ) : (
          <CategoryEmpty />
        )}

      </div>
    </section>
  );
};

export default CategorySection;