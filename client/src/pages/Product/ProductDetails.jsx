import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductBreadcrumb from "@/components/Product/ProductBreadcrumb";
import ProductGallery from "@/components/Product/ProductGallery";
import ProductInfo from "@/components/Product/ProductInfo";
import ProductTabs from "@/components/Product/ProductTabs";
import RelatedProducts from "@/components/Product/RelatedProducts";

import productService from "@/services/productService";

const ProductDetails = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      setLoading(true);

      const response = await productService.getProductBySlug(slug);

      setProduct(response.product || response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-20">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center">
        Product not found
      </div>
    );
  }

  return (
    <main className="bg-gray-50">
      <div className="container mx-auto px-4 py-10">

        <ProductBreadcrumb product={product} />

        <div className="mt-8 grid gap-10 lg:grid-cols-2">

          <ProductGallery product={product} />

          <ProductInfo product={product} />

        </div>

        <ProductTabs product={product} />

        <RelatedProducts
          productId={product._id}
          category={product.category?._id}
        />

      </div>
    </main>
  );
};

export default ProductDetails;