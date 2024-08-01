"use server";
// services/articleService.ts
import { RecentArticleDataType } from "@/types/RecentArticle";
import { BrandTypes, CategoryTypes } from "@/types/category";
import { MobileArticleType } from "@/types/mobiles";
import axios from "axios";
import { revalidatePath } from "next/cache";




export async function fetchArticles({
  page = "1",
  limit = "6",
  category,
  search,
  latestDevice,
  brands,
  showInNews
}: {
  page?: string;
  limit?: string;
  category?: string;
  search?: string;
  latestDevice?: string;
  brands?: string;
  showInNews?: string;
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
    }

    // const response = await axios.get(url);
    console.log("test 1 ", url);
    const response = await fetch(url, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      console.error(
        `Failed to fetch articles: ${response.status} ${response.statusText}`
      );
       throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data =  await response.json();
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
  latestDevice,
  brands,
  showInNews
}: {
  page?: string;
  limit?: string;
  category?: string;
  search?: string;
  latestDevice?: string;
  brands?: string;
  showInNews?: string;
}): Promise<{
  data: MobileArticleType[];
  page: number;
  limit: number;
  total: number;
}> {
  let url = `${process.env.NEXT_APP_URL}/api/article/mobile`;
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

export async function fetchCategories(): Promise<{
  data: CategoryTypes[];
}> {

  const response = await fetch(`${process.env.NEXT_APP_URL}/api/category/all`, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch Category: ${response.status} ${response.statusText}`
    );
    throw new Error("Failed to fetch Category");
  }

  const data = await response.json();
  // revalidatePath('/')
  return {
    data: data?.data,
  };

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
  // revalidatePath('/')
  return {
    data: data?.data,
  };
}

// "use server";
// // services/articleService.ts
// import { RecentArticleDataType } from "@/types/RecentArticle";
// import { BrandTypes, CategoryTypes } from "@/types/category";
// import { MobileArticleType } from "@/types/mobiles";
// import { revalidatePath } from "next/cache";

// export async function fetchArticles({
//   page = "1",
//   limit = "6",
//   category,
//   search,
//   latestDevice,
//   brands,
//   showInNews
// }: {
//   page?: string;
//   limit?: string;
//   category?: string;
//   search?: string;
//   latestDevice?: string;
//   brands?: string;
//   showInNews?: string;
// }): Promise<{
//   data: RecentArticleDataType[];
//   page: number;
//   limit: number;
//   total: number;
// }> {
//   try {
//     let url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}`;
//     if (category) {
//       url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}&category=${category}`;
//     } else if (search) {
//       url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}&searchTerm=${search}`;
//     } else if (showInNews) {
//       url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}&showInNews=${showInNews}`;
//     } else if (latestDevice) {
//       url = `${process.env.NEXT_APP_URL}/api/v1/article/all?latestDevice=${latestDevice}&all=all`;
//     } else if (brands) {
//       url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}&brands=${brands}`;
//     }

//     console.log("test 1 ", url, category);

//     const response = await fetch(url, {
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       console.error(
//         `Failed to fetch articles: ${response.status} ${response.statusText}`
//       );
//       throw new Error("Failed to fetch articles");
//     }

//     const data = await response.json();
//     revalidatePath("/");
//     return {
//       data: data.data,
//       page: data.meta?.page,
//       limit: data.meta?.limit,
//       total: data.meta?.total,
//     };

//   } catch (error) {
//     console.log('Get All Articles Failed:- src/services/articleServices', error);
//     throw new Error(`Get All Articles Failed ${error}`);
//   }

// }
// export async function fetchMobileArticles({
//   page = "1",
//   limit = "6",
//   category,
//   search,
//   latestDevice,
//   brands,
//   showInNews
// }: {
//   page?: string;
//   limit?: string;
//   category?: string;
//   search?: string;
//   latestDevice?: string;
//   brands?: string;
//   showInNews?: string;
// }): Promise<{
//   data: MobileArticleType[];
//   page: number;
//   limit: number;
//   total: number;
// }> {
//   try {
//     let url = `${process.env.NEXT_APP_URL}/api/article/mobile`;
//     if (category) {
//       url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}&category=${category}`;
//     } else if (search) {
//       url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}&searchTerm=${search}`;
//     } else if (showInNews) {
//       url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}&showInNews=${showInNews}`;
//     } else if (latestDevice) {
//       url = `${process.env.NEXT_APP_URL}/api/v1/article/all?latestDevice=${latestDevice}&all=all`;
//     } else if (brands) {
//       url = `${process.env.NEXT_APP_URL}/api/v1/article/all?page=${page}&limit=${limit}&brands=${brands}`;
//     }

//     console.log("test 1 ", url, category);

//     const response = await fetch(url, {
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       console.error(
//         `Failed to fetch mobile articles: ${response.status} ${response.statusText}`
//       );
//       throw new Error("Failed to fetch articles");
//     }

//     const data = await response.json();
//     revalidatePath("/");
//     return {
//       data: data.data,
//       page: data.meta?.page,
//       limit: data.meta?.limit,
//       total: data.meta?.total,
//     };
//   } catch (error) {
//     console.log('Get All Mobile Articles Failed:- src/services/articleServices', error);
//     throw new Error(`Get All Mobile Articles Failed ${error}`);
//   }
// }

// export async function fetchMobileArticleDetails({ id }: { id: string }): Promise<{
//   data: MobileArticleType[];
// }> {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_APP_URL}/api/article/mobile/details/${id}`,
//       {
//         cache: "no-store",
//       }
//     );

//     if (!response.ok) {
//       console.error(
//         `Failed to fetch articles: ${response.status} ${response.statusText}`
//       );
//       throw new Error("Failed to fetch mobile details articles");
//     }

//     const data = await response.json();
//     // revalidatePath('/')
//     return {
//       data: data?.data,
//     };

//   } catch (error) {
//     console.log('Get mobile details Articles Failed:- src/services/articleServices', error);
//     throw new Error(`Get mobile details Articles Failed ${error}`);
//   }
// }
// export async function fetchArticlesDetails({ id }: { id: string }): Promise<{
//   data: RecentArticleDataType[];
// }> {
//   try {


//     const response = await fetch(
//       `${process.env.NEXT_APP_URL}/api/article/detail/${id}`,
//       {
//         cache: "no-store",
//       }
//     );

//     if (!response.ok) {
//       console.error(
//         `Failed to fetch articles: ${response.status} ${response.statusText}`
//       );
//       throw new Error("Failed to fetch articles details");
//     }

//     const data = await response.json();
//     // revalidatePath('/')
//     return {
//       data: data?.data,
//     };
//   } catch (error) {
//     console.log('Get details  Articles Failed:- src/services/articleServices', error);
//     throw new Error(`Get details  Articles Failed ${error}`);
//   }
// }

// export async function fetchCategories(): Promise<{
//   data: CategoryTypes[];
// }> {
//   try {
//     const response = await fetch(`${process.env.NEXT_APP_URL}/api/category/all`, {
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       console.error(
//         `Failed to fetch Category: ${response.status} ${response.statusText}`
//       );
//       throw new Error("Failed to fetch Category");
//     }

//     const data = await response.json();
//     // revalidatePath('/')
//     return {
//       data: data?.data,
//     };
//   } catch (error) {
//     console.log('Get All category Failed:- src/services/articleServices', error);
//     throw new Error(`Get All category Failed ${error}`);
//   }
// }

// export async function fetchBrands(): Promise<{
//   data: BrandTypes[];
// }> {
//   try {
//     const response = await fetch(`${process.env.NEXT_APP_URL}/api/brands/all`, {
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       console.error(
//         `Failed to fetch brands: ${response.status} ${response.statusText}`
//       );
//       throw new Error("Failed to fetch Brands");
//     }

//     const data = await response.json();
//     // revalidatePath('/')
//     return {
//       data: data?.data,
//     };
//   } catch (error) {
//     console.log('Get All brands Failed:- src/services/articleServices', error);
//     throw new Error(`Get All brands Failed ${error}`);
//   }
// }
