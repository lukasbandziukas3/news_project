import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

interface BlogPost {
  _id: string;
  title: string;
  publishedAt: string;
  slug: string;
  thumbnail: {
    asset: {
      _id: string;
      url: string;
    };
    alt: string | null;
  };
  category: {
    title: string;
    _id: string;
    slug: string;
  };
  readTime: number;
}

const LandingNewsSection = ({ blogs }: { blogs: BlogPost[] }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sort blogs by date in descending order
  const sortedBlogs = [...blogs].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return (
    <section id="new" className="py-16 px-4 flex flex-col items-center gap-6 bg-transparent">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center max-w-[60rem] text-primary-600">What's new?</h1>

      <p className="text-gray-800 text-base font-medium drop-shadow">Explore our latest insights</p>

      <div className="w-full max-w-[80rem]">
        {isMobile ? (
          <div className="flex flex-col gap-6">
            {sortedBlogs.slice(0, 1).map((item: BlogPost) => (
              <BlogCard key={item._id} id={item.slug} title={item.title} src={item.thumbnail.asset.url} />
            ))}
          </div>
        ) : (
          <Swiper
            pagination={{ clickable: true }}
            spaceBetween={15}
            slidesPerView={3}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            modules={[Navigation]}
            className="!py-5 !px-7"
          >
            <div className="swiper-button-prev bg-white/90 rounded-full px-5 after:!text-sm after:!font-bold shadow-lg after:!text-black hover:bg-white transition-all"></div>
            <div className="swiper-button-next bg-white/90 rounded-full px-5 after:!text-sm after:!font-bold shadow-lg after:!text-black hover:bg-white transition-all"></div>
            {sortedBlogs.map((item: BlogPost) => (
              <SwiperSlide key={item._id}>
                <BlogCard id={item.slug} title={item.title} src={item.thumbnail.asset.url} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default LandingNewsSection;

const BlogCard: React.FC<{
  id: string;
  title: string;
  src: string;
}> = ({ id, title, src }) => (
  <div className="bg-white/80 border border-gray-200 shadow-lg rounded-lg overflow-hidden w-auto max-w-sm mx-auto transform hover:scale-105 transition-all duration-300">
    <div className="w-full h-48 sm:h-64 bg-primary-100 relative">
      <Image src={src} alt="Blog image" width={480} height={400} className="object-cover w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
    <div className="p-6">
      <p className="font-bold text-xl sm:text-2xl line-clamp-2 mb-4 text-gray-800">{title}</p>
      <span>
        <Link
          href={`/blog/${id}`}
          className="inline-block px-4 py-2 bg-primary-600 text-white rounded-full text-sm sm:text-base hover:bg-primary-700 active:bg-primary-800 transition-all"
        >
          Read more
        </Link>
      </span>
    </div>
  </div>
);
