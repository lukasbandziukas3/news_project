"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import LandingHeaderSection from "@/app/components/landing/Header";
import BlockRendererClient from "@/app/components/BlockRenderClient";
import Loading from "@/app/components/Loading";

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
}

const Blog = () => {
  const { id: blogID } = useParams<{ id: string }>();
  const [blogData, setBlogData] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      setIsLoading(true);
      try {
        console.log("blogID:::", blogID);
        // Fetch blog data here
        // Replace this with your actual data fetching logic
        const res = await getClient(false).fetch(articleQuery, {
          slug: blogID,
        });

        console.log("object:::", res);

        // const data = await res.json();
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
      <div className="max-w-3xl mx-auto px-4 py-8">
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
          <div className="text-gray-600 mb-8">
            <span>Published on {new Date(blogData.publishedAt).toLocaleDateString()}</span>
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
