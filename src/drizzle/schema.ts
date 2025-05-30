import {
  // boolean,
  // integer,
  // json,
  // mysqlTable,
  json,
  primaryKey,
  int,
  text,
  timestamp,
  mysqlTable,
  unique,
} from 'drizzle-orm/mysql-core';

export const Articles = mysqlTable(
  'articles',
  {
    id: int('id').autoincrement().primaryKey(),
    title: text('title').notNull(),
    category: text('category').notNull(),
    description: text('description').notNull(),
    latestDevice: text('latestDevice'),
    brands: text('brands'),
    deviceName: text('deviceName'),
    showInNews: text('showInNews'),
    best_reviews: text('best_reviews'),
    image: text('image').notNull(),
    content: json('content'),
    sub_categories: text('sub_categories'),

    admin_detail: json('admin_detail'),
    admin_detail_edit: json('admin_detail_edit'),

    selected_mobile: json('selected_mobile'),
    pages: json('pages'),

    tags: json('tags'),
    route: text('route'),

    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updateAt: timestamp('updateAt').defaultNow().notNull(),
  },
);

export const Category = mysqlTable(
  'category',
  {

    id: int('id').autoincrement().primaryKey(),
    title: text('title').notNull(),
    sub_categories: json('sub_categories'),

    admin_detail: json('admin_detail'),
    admin_detail_edit: json('admin_detail_edit'),

    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updateAt: timestamp('updateAt').defaultNow().notNull(),
  }
)

export const TechBrands = mysqlTable(
  'techBrands',
  {
    id: int('id').autoincrement().primaryKey(),
    title: text('title').notNull(),
    image: text('image').notNull(),

    admin_detail: json('admin_detail'),
    admin_detail_edit: json('admin_detail_edit'),

    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updateAt: timestamp('updateAt').defaultNow().notNull(),
  }
)
export const EaringVideoUrls = mysqlTable(
  'earningVideoUrls',
  {
    id: int('id').autoincrement().primaryKey(),
    video: text('video').notNull(),
    income: text('income').notNull(),

    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updateAt: timestamp('updateAt').defaultNow().notNull(),
  }
)

export const WatchedVideoInfo = mysqlTable(
  'watchedVideoInfo',
  {
    id: int('id').autoincrement().primaryKey(),
    videoId: text('videoId').notNull(),
    video: text('video').notNull(),
    email: text('email').notNull(),
    income: text('income').notNull(),
    lastVideoIndex: text('lastVideoIndex').notNull(),

    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updateAt: timestamp('updateAt').defaultNow().notNull(),
  }
)

export const WithdrawRequest = mysqlTable(
  'withdrawRequest',
  {
    id: int('id').autoincrement().primaryKey(),
    method: text('method').notNull(),
    phoneNumber: text('phoneNumber').notNull(),
    email: text('email').notNull(),
    amount: text('amount').notNull(),
    status: text('status'),

    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updateAt: timestamp('updateAt').defaultNow().notNull(),
  }
)

// export const Brands = mysqlTable(
//   'brands',
//   {
//     id: int('id').autoincrement().primaryKey(),
//     title: text('title').notNull(),
//     createdAt: timestamp('createdAt').defaultNow().notNull(),
//     updateAt: timestamp('updateAt').defaultNow().notNull(),
//   }
// )

export const MobileArticles = mysqlTable(
  'mobile_articles',
  {
    id: int('id').autoincrement().primaryKey(),
    title: text('title').notNull(),
    market_status: text('market_status').notNull(),
    release_date: text('release_date').notNull(),
    key_specifications: json('key_specifications').notNull(),
    brands: text('brands').notNull(),
    image: json('image').notNull(),
    // details_image:json('details_image').notNull(),
    display_image: text('display_image').notNull(),

    physicalSpecification: json("physicalSpecification"),
    network: json("network"),
    display: json("display"),
    processor: json("processor"),
    memory: json("memory"),
    mainCamera: json("mainCamera"),
    selfieCamera: json("selfieCamera"),
    os: json("os"),
    connectivity: json("connectivity"),
    features: json("features"),
    battery: json("battery"),
    details: json("details"),
    prices: json("prices"),
    expert_view: json("expert_view"),
    content: json("content"),

    is_daily_interest: text('is_daily_interest'),
    is_by_fans: text('is_by_fans'),
    is_latest_device: text('is_latest_device'),

    total_fans: int('total_fans'),
    top_background_color: text('top_background_color'),

    admin_detail: json('admin_detail'),
    admin_detail_edit: json('admin_detail_edit'),

    selected_articles: json('selected_articles'),

    tags: json('tags'),

    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  }
);
// opinion about mobile 
export const MobileFanDetail = mysqlTable("mobile_fans_detail", {
  id: int("id").autoincrement().primaryKey(),
  email: text("email").notNull(),
  mobileId: int("mobileId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const Opinion = mysqlTable("opinion", {
  id: int("id").autoincrement().primaryKey(),
  // name: text("name"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  comments: text("comments").notNull(),
  mobileId: int("mobileId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const ArticleOpinion = mysqlTable("articles_opinion", {
  id: int("id").autoincrement().primaryKey(),
  // name: text("name"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  comments: text("comments").notNull(),
  articleId: int("articleId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

// opinion about mobile 
export const Tags = mysqlTable("tags", {
  id: int("id").autoincrement().primaryKey(),

  admin_detail: json('admin_detail'),
  admin_detail_edit: json('admin_detail_edit'),
  // name: text("name"),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const NetworkBands = mysqlTable("network_bands", {
  id: int("id").autoincrement().primaryKey(),
  // name: text("name"),
  country: text("country").notNull(),
  content: json("content"),
  admin_detail: json('admin_detail'),
  admin_detail_edit: json('admin_detail_edit'),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})
export const Glossary = mysqlTable("glossary", {
  id: int("id").autoincrement().primaryKey(),
  // name: text("name"),
  display_name: text("display_name").notNull(),
  route: text("route").notNull(),
  content: json("content"),
  admin_detail: json('admin_detail'),
  admin_detail_edit: json('admin_detail_edit'),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})


// // for login users auth js 

export const FollowerOrders = mysqlTable("follower_orders", {
  id: int("id").autoincrement().primaryKey(),
  email: text("email").notNull(),
  fullName: text("fullName"),
  role: text("role"),

  spend: text('spend'),
  category: text("category"),
  charge: text('charge'),
  link: text('link'),
  quantity: text('quantity'),
  service: text('service'),


  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const AddFunds = mysqlTable("add_funds", {
  id: int("id").autoincrement().primaryKey(),
  email: text("email").notNull(),
  fullName: text("fullName"),
  role: text("role"),

  amount: text('amount'),
  transactionId: text("transactionId"),
  method: text("method"),
  status: text("status"),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  // name: text("name"),
  fullName: text("fullName").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: text("role").notNull(),
  referralId: text("referralId"),
  authProviderId: text("authProviderId"),

  ballance: text('ballance'),
  totalSpend: text('totalSpend'),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})
// export const sessions = mysqlTable("session", {
//   id: int("userId").primaryKey().autoincrement()
//     .notNull(),
//   userId: int("userId")
//     .notNull(),
//     // .references(() => users.id, { onDelete: "cascade" }),
//   sessionToken: text("sessionToken"),
//   // userName: text("userName")
//   //   .notNull()
//   //   .references(() => users, { onDelete: "cascade" }),

//   expires: timestamp("expires", { mode: "date" }).notNull(),
// })

// export const verificationTokens = mysqlTable(
//   "verificationToken",
//   {
//     identifier: text("identifier").notNull(),
//     token: text("token").notNull(),
//     expires: timestamp("expires", { mode: "date" }).notNull(),
//   },
//   (verificationToken) => ({
//     compositePk: primaryKey({
//       columns: [verificationToken.identifier, verificationToken.token],
//     }),
//   })
// )
