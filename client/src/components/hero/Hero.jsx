import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroFeatures from "./HeroFeatures";

const Hero = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Hero */}
        <div className="flex min-h-[calc(100vh-140px)] flex-col-reverse items-center justify-center gap-10 lg:flex-row">

          <div className="w-full lg:w-[45%]">
            <HeroContent />
          </div>

          <div className="flex w-full justify-center lg:w-[55%]">
            <HeroImage />
          </div>

        </div>

        {/* Features */}
        <HeroFeatures />

      </div>
    </section>
  );
};

export default Hero;