import Image from "next/image";
import Link from "next/link";

const LandingHeroSection = () => {
  return (
    <section id="hero" className="relative">
      <div className="text-center relative">
        <div className="flex justify-center mb-8 max-h-[60rem] overflow-hidden">
          <img
            src="/news-image.jpg"
            alt="News Project"
            className="rounded-lg shadow-lg w-full"
          />
          <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6">
              Stay Informed with Our News Project
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-8 sm:mb-10">
              Get the latest updates and insights from our comprehensive news
              coverage
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/sign-up"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg font-medium text-white bg-primary-500 rounded-full hover:bg-primary-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <p className="text-sm text-gray-300">Free trial available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    // <section
    //   id="hero"
    //   className="relative pt-16 sm:pt-24 md:pt-32 pb-8 sm:pb-12 px-4"
    // >
    //   <div className="max-w-7xl mx-auto">
    //     <div className="text-center">
    //       <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6">
    //         Stay Informed with Our News Project
    //       </h1>
    //       <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-10">
    //         Get the latest updates and insights from our comprehensive news
    //         coverage
    //       </p>
    //       <div className="flex justify-center mb-8">
    //         <Image
    //           src="/news-image.jpg"
    //           alt="News Project"
    //           width={600}
    //           height={400}
    //           className="rounded-lg shadow-lg"
    //         />
    //       </div>
    //       <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
    //         <Link
    //           href="/auth/sign-up"
    //           className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg font-medium text-white bg-primary-500 rounded-full hover:bg-primary-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
    //         >
    //           Get Started
    //         </Link>
    //         <p className="text-sm text-gray-500">Free trial available</p>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default LandingHeroSection;
