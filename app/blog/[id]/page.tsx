"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import LandingHeaderSection from "@/app/components/landing/Header";
// import BlockRendererClient from "@/app/components/BlockRenderClient";
import Loading from "@/app/components/Loading";
import { FaArrowLeft } from "react-icons/fa";

import { getClient } from "@/lib/sanity/client";
import { articleQuery } from "@/lib/sanity/queries";
import SanityContent from "@/app/components/sanity/Base";

interface BlogPost {
  title: string;
  description: string;
  content: Array<any>;
  thumbnail: {
    asset: {
      url: string;
    };
  };
  publishedAt: string;
  readTime: number;
  category: {
    title: string;
    slug: string;
  };
}

const Blog = () => {
  const { id: blogID } = useParams<{ id: string }>();
  const [blogData, setBlogData] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogData = async () => {
      setIsLoading(true);
      try {
        const res = await getClient(false).fetch(articleQuery, {
          slug: blogID,
        });

        console.log("object:::", res);

        setBlogData(res[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching the blog post");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, [blogID]);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!blogData) return <div>No blog post found</div>;

  return (
    <div className="w-full">
      <LandingHeaderSection />
      <div className="max-w-3xl mx-auto px-4 py-32">
        <button onClick={() => router.back()} className="mb-4 text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center">
          <FaArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        <article className="prose lg:prose-xl">
          <h1 className="text-4xl font-bold mb-4">{blogData.title}</h1>
          <p className="text-gray-600 mb-4">{blogData.description}</p>
          <div className="mb-8">
            <Image
              src={blogData.thumbnail.asset.url}
              alt={blogData.title}
              width={1000}
              height={500}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="text-gray-600 mb-4 flex justify-between items-center">
            <span>Published on {new Date(blogData.publishedAt).toLocaleDateString()}</span>
            <span>{blogData.readTime} min read</span>
          </div>
          <div className="mb-8">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{blogData.category.title}</span>
          </div>
          <div className="text-gray-800 leading-relaxed">
            <SanityContent content={blogData.content} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default Blog;
