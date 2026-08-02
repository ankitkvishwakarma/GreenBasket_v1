import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/hero/Hero";
import FlashDeals from "@/components/FlashDeals/FlashDeals";
import FeaturedCategories from "@/components/Category/Category";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import Footer from "@/components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCategories />
      <FlashDeals />
      <FeaturedProducts />
      <Footer />
    </>
  );
};

export default Home;
