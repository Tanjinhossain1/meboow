"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Link from "next/link";
import { formatForUrl } from "@/utils/utils";

interface MobileArticleType {
  // Add properties as needed
}

interface RecentArticleDataType {
  id: string;
  image: string;
  title: string;
  route: string;
  description: string;
  category: string;
  sub_categories: string;
  content: any;
  latestDevice: string;
  best_reviews: string;
  brands: string;
  updateAt: string;
  createdAt: string;
  view?: string;
  deviceName?: string;
  showInNews?: string;
  selected_mobile: MobileArticleType;
  admin_detail: {
    email: string;
    name: string;
  };
  pages: {
    page: number;
    title: string;
    content: any;
  }[];
  tags: {
    name: string;
  }[];
}

interface ApiResponse {
  data: RecentArticleDataType[];
  page: number;
  limit: number;
  total: number;
}

export default function ArticleList() {
  const [articles, setArticles] = useState<RecentArticleDataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `/api/v1/article/all?page=${page}&limit=10`
      );

      const data = response.data;
      console.log("response", data, response.data);
      setArticles(data.data);
      setCurrentPage(+data.meta.page);
      setTotalPages(+Math.ceil(+data.meta.total / +data.meta.limit));
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch articles: ${err.message}`);
      } else {
        setError("An unknown error occurred while fetching articles");
      }
      console.error("Error fetching articles:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d MMMM yyyy");
  };

  const ArticleSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Skeleton className="w-full h-48" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 md:max-w-[1000px] bg-white">
      <h1 className="text-3xl font-bold mb-8">Recent Articles</h1>
      {error && (
        <div className="text-center py-8 text-red-500">
          <p>{error}</p>
          <Button onClick={() => fetchArticles(currentPage)} className="mt-4">
            Retry
          </Button>
        </div>
      )}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <ArticleSkeleton key={index} />
            ))
          : articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link
                  href={
                    article?.category === "Mobiles"
                      ? `/review/${formatForUrl(article?.route)}`
                      : `/article/${formatForUrl(article?.route)}`
                  }
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${article.image}`}
                    alt={article.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <Link
                    href={
                      article?.category === "Mobiles"
                        ? `/review/${formatForUrl(article?.route)}`
                        : `/article/${formatForUrl(article?.route)}`
                    }
                  >
                    {" "}
                    <h2 className="text-xl font-semibold mb-2 hover:text-red-500 transition-colors duration-200">
                      {article.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4">
                    {formatDate(article.createdAt)}
                  </p>
                  <p className="text-gray-700 line-clamp-3">{article.description}</p>
                </div>
              </div>
            ))}
      </div>
      <div className="flex justify-center items-center mt-8 space-x-2 text-white">
        <Button
          variant="outline"
          onClick={handlePreviousPage}
          disabled={currentPage === 1 || isLoading}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <span className="text-sm font-medium text-black">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={currentPage === totalPages || isLoading}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
