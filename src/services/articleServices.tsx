// services/articleService.ts

import { RecentArticleDataType } from "@/types/RecentArticle";


export async function fetchArticles({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<{
  data: RecentArticleDataType[]
  page: number;
  limit: number;
  total: number;
}> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/api/v1/article/all?page=${page}&limit=${limit}`, {
          cache: "no-store",
        });
      
        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
        }
      
        const data = await response.json();
        return {
          data: data.data,
          page: data.meta.page,
          limit: data.meta.limit,
          total: data.meta.total,
        };
      } catch (error) {
        console.error("Error fetching articles:", error);
        throw new Error("Failed to fetch articles. Please try again later.");
      }
  // const [page,setPage] = useState<number>(0)
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/api/v1/article/all?page=${page}&limit=${limit}`,
//     {
//       cache: "no-store", // To ensure the data is fetched on every request
//     }
//   );
  
//   if (!response.ok) {
//     throw new Error("Failed to fetch articles");
//     }
    
//     const data = await response.json(); 
//   return {
//     data: data.data,
//     page: data.meta.page,
//     limit: data.meta.limit,
//     total: data.meta.total,
//   }
}
