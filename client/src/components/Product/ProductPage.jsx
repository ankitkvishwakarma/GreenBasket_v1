import { useEffect, useState } from "react";

import ProductToolbar from "@/components/Product/ProductToolbar";
import ProductFilters from "@/components/Product/ProductFilters";
import ProductGrid from "@/components/Product/ProductGrid";
import ProductPagination from "@/components/Product/ProductPagination";
import ProductQuickView from "@/components/Product/ProductQuickView";

import productService from "@/services/productService";
import categoryService from "@/services/categoryService";

const ProductPage = () => {
  // API State
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI State
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [view, setView] = useState("grid");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(5000);
  const [availability, setAvailability] = useState("all");
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(1);

  // Quick View
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  // ===============================
  // Fetch Products & Categories
  // ===============================
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);

      const [productRes, categoryRes] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories(),
      ]);

      // Adjust these according to your backend response
      setProducts(productRes.products || productRes || []);
      setCategories(categoryRes.categories || categoryRes || []);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Clear Filters
  // ===============================
  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange(5000);
    setAvailability("all");
    setRating(0);
    setSearch("");
    setSortBy("latest");
    setPage(1);
  };

  // ===============================
  // Quick View
  // ===============================
  const openQuickView = (product) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    setQuickViewOpen(false);
  };

  // ===============================
  // Cart
  // ===============================
  const handleAddToCart = (product) => {
    console.log("Add To Cart:", product);

    // TODO:
    // dispatch(addToCart(product))

    closeQuickView();
  };

  // ===============================
  // Wishlist
  // ===============================
  const handleToggleWishlist = (product) => {
    console.log("Wishlist:", product);

    // TODO:
    // dispatch(toggleWishlist(product))
  };

  return (
    <main className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <ProductToolbar
          totalProducts={products.length}
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          view={view}
          setView={setView}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]">
          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            availability={availability}
            setAvailability={setAvailability}
            rating={rating}
            setRating={setRating}
            clearFilters={clearFilters}
          />

          <div>
            <ProductGrid
              products={products}
              loading={loading}
              view={view}
              onQuickView={openQuickView}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
            />

            <ProductPagination
              currentPage={page}
              totalPages={1}
              onPageChange={setPage}
            />
          </div>
        </div>

        <ProductQuickView
          isOpen={quickViewOpen}
          product={selectedProduct}
          onClose={closeQuickView}
          onAddToCart={handleAddToCart}
        />
      </div>
    </main>
  );
};

export default ProductPage;