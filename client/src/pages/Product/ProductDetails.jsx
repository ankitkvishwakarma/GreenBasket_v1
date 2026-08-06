import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "@/redux/cart/cartThunk.js";

import { useDispatch, useSelector } from "react-redux";

import {
    getProductBySlug,
    getRelatedProducts,
    getTrendingProducts,
} from "@/redux/product/productThunk";

import ProductGallery from "@/components/Product/ProductGallery/ProductGallery";

import ProductInfo from "@/components/Product/ProductInfo/ProductInfo";

import ProductTabs from "@/components/Product/ProductTabs/ProductTabs";

import RelatedProducts from "@/components/Product/Recommendation/RelatedProducts";

import RecommendedProducts from "@/components/Product/Recommendation/RecommendedProducts";

import TrendingProducts from "@/components/Product/Recommendation/TrendingProducts";

import FrequentlyBought from "@/components/Product/Recommendation/FrequentlyBought";

import RecentlyViewed from "@/components/Product/Recommendation/RecentlyViewed";

// import ProductSkeleton from "@/components/Product/ProductSkeleton";

const ProductDetails = () => {


    const { slug } = useParams();

    const dispatch = useDispatch();

    const {

        product,

        relatedProducts,

        trendingProducts,

        loading,

    } = useSelector(
        (state) => state.product
    );
    console.log("Slug:", slug);
    console.log("Loading:", loading);
    console.log("Product:", product);
    console.log("Related Products:", relatedProducts);
    console.log("Trending Products:", trendingProducts);

    const [quantity, setQuantity] =
        useState(1);

    const [
        selectedVariant,
        setSelectedVariant,
    ] = useState(null);

    useEffect(() => {

        if (slug) {

            dispatch(getProductBySlug(slug));

        }

    }, [dispatch, slug]);

    useEffect(() => {

        if (product?._id) {

            dispatch(
                getRelatedProducts(product._id)
            );

            dispatch(getTrendingProducts());

        }

    }, [dispatch, product]);

    useEffect(() => {
    if (
        product?.variants?.length &&
        !selectedVariant
    ) {
        setSelectedVariant(product.variants[0]);
    }
}, [product?.variants, selectedVariant]);

   const handleAddToCart = async () => {
  if (!product?._id) return;

  const cartData = {
    productId: product._id,
    quantity,
  };

  console.log("Sending:", cartData);

  const result = await dispatch(addToCart(cartData));

  console.log(result);
};

    const handleBuyNow = () => {

        console.log("Buy Now");

    };

    return (

        <div className="bg-gray-50">

            <div className="mx-auto max-w-7xl space-y-16 px-4 py-10">

                <div className="grid gap-10 lg:grid-cols-2">

                    <ProductGallery
                        product={product}
                    />

                    <ProductInfo
                        product={product}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        selectedVariant={selectedVariant}
                        setSelectedVariant={
                            setSelectedVariant
                        }
                        onAddToCart={
                            handleAddToCart
                        }
                        onBuyNow={handleBuyNow}
                    />

                </div>

                <ProductTabs
                    product={product}
                />

                <RecommendedProducts
                    products={
                        relatedProducts
                    }
                />

                <RelatedProducts
                    products={
                        relatedProducts
                    }
                />

                <TrendingProducts
                    products={
                        trendingProducts
                    }
                />

                <FrequentlyBought
                    products={
                        relatedProducts.slice(
                            0,
                            3
                        )
                    }
                />

                <RecentlyViewed
                    currentProduct={product}
                />

            </div>

        </div>

    );

};

export default ProductDetails;