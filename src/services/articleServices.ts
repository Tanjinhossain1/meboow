"use server";
import { getDb } from "@/drizzle/db";
import { Category } from "@/drizzle/schema";
// services/articleService.ts
import { RecentArticleDataType } from "@/types/RecentArticle";
import { BrandTypes, CategoryTypes } from "@/types/category";
import { MobileArticleType } from "@/types/mobiles";
import axios from "axios";
import { desc } from "drizzle-orm";
import { revalidatePath, unstable_noStore } from "next/cache";




export async function fetchArticles({
  page = "1",
  limit = "6",
  category,
  search,
  latestDevice,
  brands,
  showInNews,
  allArticles,
  showInNewsWithAll,
  best_reviews,
}: {
  page?: string;
  limit?: string;
  category?: string;
  search?: string;
  latestDevice?: string;
  brands?: string;
  showInNews?: string;
  allArticles?: boolean;
  showInNewsWithAll?: string;
  best_reviews?: string;
}): Promise<{
  data: RecentArticleDataType[];
  page: number;
  limit: number;
  total: number;
}> {

  let url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}`;
  if (category) {
    url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}&category=${category}`;
  } else if (search) {
    url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}&searchTerm=${search}`;
  } else if (showInNews) {
    url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}&showInNews=${showInNews}`;
  } else if (latestDevice) {
    url = `${process.env.NEXT_APP_URL}/api/v1/article/all?latestDevice=${latestDevice}&all=all`;
  } else if (brands) {
    url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}&brands=${brands}`;
  } else if (allArticles) {
    url = `${process.env.NEXT_APP_URL}/api/v1/article/all`;
  } else if (showInNewsWithAll) {
    url = `${process.env.NEXT_APP_URL}/api/v1/article/all?showInNews=${showInNewsWithAll}`;
  }else if (best_reviews) {
    url = `${process.env.NEXT_APP_URL}/api/v1/article/all?best_reviews=${best_reviews}`;
  }

  // const response = await axios.get(url);
  console.log("test 1 ", url);
  const response = await fetch(url, {
    // cache: "force-cache",
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch articles: ${response.status} ${response.statusText}`
    );
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  revalidatePath("/");
  return {
    data: data.data,
    page: data.meta?.page,
    limit: data.meta?.limit,
    total: data.meta?.total,
  };
}
export async function fetchMobileArticles({
  page = "1",
  limit = "6",
  category,
  search,
  brands,
  is_daily_interest,
  is_by_fans,
  is_latest_device,

}: {
  page?: string;
  limit?: string;
  category?: string;
  search?: string;
  brands?: string;
  is_daily_interest?: string
  is_by_fans?: string
  is_latest_device?: string

}): Promise<{
  data: MobileArticleType[];
  page: number;
  limit: number;
  total: number;
}> {
  let url = `${process.env.NEXT_APP_URL}/api/article/mobile`;
  if (search) {
    url = `${process.env.NEXT_APP_URL}/api/article/mobile?page=${page}&limit=${limit}&searchTerm=${search}`;
  } else if (brands) {
    url = `${process.env.NEXT_APP_URL}/api/article/mobile?page=${page}&limit=${limit}&brands=${brands}`;
  } else if (is_daily_interest) {
    url = `${process.env.NEXT_APP_URL}/api/article/mobile?page=${page}&limit=${limit}&is_daily_interest=${is_daily_interest}`;
  } else if (is_by_fans) {
    url = `${process.env.NEXT_APP_URL}/api/article/mobile?page=${page}&limit=${limit}&is_by_fans=${is_by_fans}`;
  } else if (is_latest_device) {
    url = `${process.env.NEXT_APP_URL}/api/article/mobile?page=${page}&limit=${limit}&is_latest_device=${is_latest_device}`;
  }

  console.log("test 1 ", url, category);

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch mobile articles: ${response.status} ${response.statusText}`
    );
    throw new Error("Failed to fetch articles");
  }

  const data = await response.json();
  revalidatePath("/");
  return {
    data: data.data,
    page: data.meta?.page,
    limit: data.meta?.limit,
    total: data.meta?.total,
  };

}

export async function fetchMobileArticleDetails({ id }: { id: string }): Promise<{
  data: MobileArticleType[];
}> {
  const response = await fetch(
    `${process.env.NEXT_APP_URL}/api/article/mobile/details/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.error(
      `Failed to fetch articles: ${response.status} ${response.statusText}`
    );
    throw new Error("Failed to fetch mobile details articles");
  }

  const data = await response.json();
  // revalidatePath('/')
  return {
    data: data?.data,
  };


}
export async function fetchArticlesDetails({ id }: { id: string }): Promise<{
  data: RecentArticleDataType[];
}> {
  const response = await fetch(
    `${process.env.NEXT_APP_URL}/api/article/detail/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.error(
      `Failed to fetch articles: ${response.status} ${response.statusText}`
    );
    throw new Error("Failed to fetch articles details");
  }

  const data = await response.json();
  // revalidatePath('/')
  return {
    data: data?.data,
  };
}

export async function fetchCategories()
  : Promise<{
    data: CategoryTypes[];
  }> {
  unstable_noStore()
  // const response = await fetch(`${process.env.NEXT_APP_URL}/api/category/all`, {
  //   cache: "no-store",
  // });
  const db = await getDb();
  // Perform the database insertion using Drizzle ORM
  const result = await db.select().from(Category).orderBy(desc(Category.createdAt))
  const categories = result.map(category => ({
    id: category.id,
    title: category.title,
    updateAt: category.updateAt.toDateString(),
    createdAt: category.createdAt.toDateString(),
  }))
  // if (!response.ok) {
  //   console.error(
  //     `Failed to fetch Category: ${response.status} ${response.statusText}`
  //   );
  //   throw new Error("Failed to fetch Category");
  // }
  // const data = await response.json();
  console.log('category  ', result)
  // revalidatePath('/')
  return { data: categories }


}

export async function fetchBrands(): Promise<{
  data: BrandTypes[];
}> {
  const response = await fetch(`${process.env.NEXT_APP_URL}/api/brands/all`, {
    cache: "no-store",
  });
  if (!response.ok) {
    console.error(
      `Failed to fetch brands: ${response.status} ${response.statusText}`
    );
    throw new Error("Failed to fetch Brands");
  }

  const data = await response.json();
  revalidatePath('/')
  return {
    data: data?.data,
  };
}
