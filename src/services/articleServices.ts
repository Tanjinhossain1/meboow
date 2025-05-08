"use server";
import { getDb } from "@/drizzle/db";
import { Category } from "@/drizzle/schema";
// services/articleService.ts
import { RecentArticleDataType, VideoListUrlDataType, WithdrawRequestDataType } from "@/types/RecentArticle";
import { BrandTypes, CategoryTypes } from "@/types/category";
import { MobileArticleType, MobileOpinionType, MobileTagsType } from "@/types/mobiles";
import { GlossaryGroup, GlossaryType, NetworkBandsType } from "@/types/network-bands";
import { UsersTypes } from "@/types/users";
import { desc } from "drizzle-orm";
import { revalidatePath, unstable_noStore } from "next/cache";

export const fetchCountryName = async (countryCode: string): Promise<string | null> => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    const data = await response.json();
    return data[0]?.name?.common || null;
  } catch (error) {
    console.error("Error fetching country data:", error);
    return null;
  }
};
export async function fetchArticles({
  page = "1",
  limit = "12",
  category,
  search,
  latestDevice,
  brands,
  showInNews,
  allArticles,
  showInNewsWithAll,
  best_reviews,
  isRelated,sub_categories,main_category_for_sub
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
  isRelated?: string;
  sub_categories?: string;
  main_category_for_sub?: string;
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
    console.log(`here is come  ${url}`)
  } else if (latestDevice) {
    url = `${process.env.NEXT_APP_URL}/api/v1/article/all?latestDevice=${latestDevice}&all=all`;
  } else if (brands) {
    url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}&brands=${brands}`;
  } else if (allArticles) {
    url = `${process.env.NEXT_APP_URL}/api/v1/article/all?all=all`;
  } else if (showInNewsWithAll) {
    url = `${process.env.NEXT_APP_URL}/api/v1/article/all?showInNews=${showInNewsWithAll}`;
  } else if (best_reviews) {
    url = `${process.env.NEXT_APP_URL}/api/v1/article/all?best_reviews=${best_reviews}`;
  } else if (isRelated) {
    url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}&category=${category}&is_related=${isRelated}`;
  }else if (sub_categories) {
    url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}&sub_categories=${sub_categories}&category=${main_category_for_sub}`;
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
  is_all_mobile
}: {
  page?: string;
  limit?: string;
  category?: string;
  search?: string;
  brands?: string;
  is_daily_interest?: string
  is_by_fans?: string
  is_latest_device?: string
  is_all_mobile?: boolean

}): Promise<{
  data: MobileArticleType[];
  page: number;
  limit: number;
  total: number;
}> {
  let url = `${process.env.NEXT_APP_URL}/api/article/mobile?page=${page}&limit=${limit}`;
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
  } else if (is_all_mobile) {
    url = `${process.env.NEXT_APP_URL}/api/article/mobile?all=all`;
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
export async function fetchMobileOpinions({
  page = "1",
  limit = "20",
  mobileId,
  search
}: {
  page?: string;
  limit?: string;
  mobileId?: string
  search?: string
}): Promise<{
  data: MobileOpinionType[];
  page: number;
  limit: number;
  total: number;
}> {
  let url = `${process.env.NEXT_APP_URL}/api/article/mobile/opinion`;
  if (search) {
    url = `${process.env.NEXT_APP_URL}/api/article/mobile/opinion?page=${page}&limit=${limit}&searchTerm=${search}`;
  } else if (mobileId) {
    url = `${process.env.NEXT_APP_URL}/api/article/mobile/opinion?page=${page}&limit=${limit}&mobileId=${mobileId}`;
  }

  console.log("test 1 ", url, mobileId);

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch mobile article Opinion: ${response.status} ${response.statusText}`
    );
    throw new Error("Failed to fetch Opinion");
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
export async function fetchArticleOpinions({
  page = "1",
  limit = "20",
  articleId,
  search
}: {
  page?: string;
  limit?: string;
  articleId?: string
  search?: string
}): Promise<{
  data: MobileOpinionType[];
  page: number;
  limit: number;
  total: number;
}> {
  let url = `${process.env.NEXT_APP_URL}/api/article/opinion`;
  if (search) {
    url = `${process.env.NEXT_APP_URL}/api/article/opinion?page=${page}&limit=${limit}&searchTerm=${search}`;
  } else if (articleId) {
    url = `${process.env.NEXT_APP_URL}/api/article/opinion?page=${page}&limit=${limit}&articleId=${articleId}`;
  }

  console.log("test 1 ", url, articleId);

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch article Opinion: ${response.status} ${response.statusText}`
    );
    throw new Error("Failed to fetch article Opinion");
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
export async function fetchMobileTags({
  page = "1",
  limit = "20",
  search
}: {
  page?: string;
  limit?: string;
  mobileId?: string
  search?: string
}): Promise<{
  data: MobileTagsType[];
  page: number;
  limit: number;
  total: number;
}> {
  let url = `${process.env.NEXT_APP_URL}/api/article/mobile/tags`;
  if (search) {
    url = `${process.env.NEXT_APP_URL}/api/article/mobile/tags?page=${page}&limit=${limit}&searchTerm=${search}`;
  }

  console.log("test 1 ", url);

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch mobile article Tags: ${response.status} ${response.statusText}`
    );
    throw new Error("Failed to fetch Tags");
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

export async function fetchMobileArticleDetails({ id, title }: { id?: string, title?: string }): Promise<{
  data: MobileArticleType[];
}> {

  const response = await fetch(
    title ? `${process.env.NEXT_APP_URL}/api/article/mobile/detail/${title}`
      : `${process.env.NEXT_APP_URL}/api/article/mobile/details/${id}`,
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
export async function fetchArticlesDetails({ id, title }: { id?: string, title?: string }): Promise<{
  data: RecentArticleDataType[];
}> {
  const response = await fetch(
    title ? `${process.env.NEXT_APP_URL}/api/article/detail/title/${title}` : `${process.env.NEXT_APP_URL}/api/article/detail/${id}`,
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
    sub_categories: category.sub_categories as any,
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
export async function fetchEarningVideos(): Promise<{
  data: VideoListUrlDataType[];
}> {
  const response = await fetch(`${process.env.NEXT_APP_URL}/api/earning/uploadurl`, {
    cache: "no-store",
  });
  if (!response.ok) {
    console.error(
      `Failed to fetch brands: ${response.status} ${response.statusText}`
    );
    throw new Error("Failed to fetch uploadurl");
  }

  const data = await response.json();
  revalidatePath('/')
  return {
    data: data?.data,
  };
}
export async function fetchEarningWatchedVideos({email}:{email:string}): Promise<{
  data: BrandTypes[];
}> {
  const response = await fetch(`${process.env.NEXT_APP_URL}/api/earning/watchComplete?email=${email}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    console.error(
      `Failed to fetch brands: ${response.status} ${response.statusText}`
    );
    throw new Error("Failed to fetch get watched videos");
  }

  const data = await response.json();
  revalidatePath('/')
  return {
    data: data?.data,
  };
}
export async function withdrawRequest(): Promise<{
  data: WithdrawRequestDataType[];
}> {
  const response = await fetch(`${process.env.NEXT_APP_URL}/api/earning/withdraw`, {
    cache: "no-store",
  });
  if (!response.ok) {
    console.error(
      `Failed to fetch brands: ${response.status} ${response.statusText}`
    );
    throw new Error("Failed to fetch get withdraw");
  }

  const data = await response.json();
  revalidatePath('/')
  return {
    data: data?.data,
  };
}

export async function fetchNetworkBands({ id,country }: { id?: string,country?: string }): Promise<{
  data: NetworkBandsType[];
}> {
  if (id) {
    const response = await fetch(`${process.env.NEXT_APP_URL}/api/network-bands/detail/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(
        `Failed to fetch Network bands: ${response.status} ${response.statusText}`
      );
      throw new Error("Failed to fetch Network bands");
    }

    const data = await response.json();
    revalidatePath('/')
    return {
      data: data?.data,
    };

  }else if(country){
    const response = await fetch(`${process.env.NEXT_APP_URL}/api/network-bands/all?country=${country}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(
        `Failed to fetch Network bands: ${response.status} ${response.statusText}`
      );
      throw new Error("Failed to fetch Network bands");
    }

    const data = await response.json();
    revalidatePath('/')
    return {
      data: data?.data,
    };

  } else {
    const response = await fetch(`${process.env.NEXT_APP_URL}/api/network-bands/all`, {
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(
        `Failed to fetch Network bands: ${response.status} ${response.statusText}`
      );
      throw new Error("Failed to fetch Network bands");
    }

    const data = await response.json();
    revalidatePath('/')
    return {
      data: data?.data,
    };
  }
}

export async function fetchGlossary({ id,route }: { id?: string,route?: string }): Promise<{
  data: GlossaryType[]
}> {
  if (id) {
    const response = await fetch(`${process.env.NEXT_APP_URL}/api/glossary/detail/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(
        `Failed to fetch glossary: ${response.status} ${response.statusText}`
      );
      throw new Error("Failed to fetch glossary");
    }

    const data = await response.json();
    revalidatePath('/')
    return {
      data: data?.data as GlossaryType[],
    };

  }else if(route){
    const response = await fetch(`${process.env.NEXT_APP_URL}/api/glossary/all?route=${route}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(
        `Failed to fetch glossary: ${response.status} ${response.statusText}`
      );
      throw new Error("Failed to fetch glossary");
    }

    const data = await response.json();
    revalidatePath('/')
    return {
      data: data?.data as GlossaryType[],
    };

  } else {
    const response = await fetch(`${process.env.NEXT_APP_URL}/api/glossary/all`, {
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(
        `Failed to fetch glossary: ${response.status} ${response.statusText}`
      );
      throw new Error("Failed to fetch glossary");
    }

    const data = await response.json();
    revalidatePath('/')
    return {
      data: data?.data as GlossaryType[],
    };
  }
}

export async function fetchGlossaryList({isList }: { isList?:boolean }): Promise<{
  data: GlossaryGroup[];
}> {
   
    const response = await fetch(`${process.env.NEXT_APP_URL}/api/glossary/lists`, {
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(
        `Failed to fetch glossary: ${response.status} ${response.statusText}`
      );
      throw new Error("Failed to fetch glossary");
    }

    const data = await response.json();
    revalidatePath('/')
    return {
      data: data?.data ,
    };
}
export async function fetchUsers({userId}:{userId?:string}): Promise<{
  data: UsersTypes[];
}> {
  const response = await fetch(userId ? `${process.env.NEXT_APP_URL}/api/auth/login?userId=${userId}` : `${process.env.NEXT_APP_URL}/api/auth/login`, {
    cache: "no-store",
  });
  if (!response.ok) {
    console.error(
      `Failed to fetch Users: ${response.status} ${response.statusText}`
    );
    throw new Error("Failed to fetch Users");
  }

  const data = await response.json();
  revalidatePath('/')
  return {
    data: data?.data,
  };
}
