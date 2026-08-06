import Hero from "@/components/hero/Hero";
import FlashDeals from "@/components/FlashDeals/FlashDeals";
import CategorySection from "@/components/Category/CategorySection";

const Home = () => {
  return (
    <>
      <Hero />
      <CategorySection />
      <FlashDeals />
    </>
  );
};

export default Home;