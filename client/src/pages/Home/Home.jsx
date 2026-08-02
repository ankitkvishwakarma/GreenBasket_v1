import Navbar from "@/components/Navbar/Navbar.jsx";
import Hero from "@/components/hero/Hero.jsx";
import FlashDeals from "@/components/FlashDeals/FlashDeals.jsx";
import FeaturedCategories from "@/components/Category/Category.jsx";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts.jsx";
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
