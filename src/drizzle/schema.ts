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
  mysqlTable
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
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updateAt: timestamp('updateAt').defaultNow().notNull(),
  },
);

export const Category = mysqlTable(
  'category',
  {
    id: int('id').autoincrement().primaryKey(),
    title: text('title').notNull(),
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

    is_daily_interest:text('is_daily_interest'),
    is_by_fans:text('is_by_fans'),
    is_latest_device:text('is_latest_device'),

    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  }
);

// opinion about mobile 
export const Opinion = mysqlTable("opinion", {
  id: int("id").autoincrement().primaryKey(),
  // name: text("name"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  comments: text("comments").notNull(),
  mobileId:int("mobileId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const ArticleOpinion = mysqlTable("articles_opinion", {
  id: int("id").autoincrement().primaryKey(),
  // name: text("name"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  comments: text("comments").notNull(),
  articleId:int("articleId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

// opinion about mobile 
export const Tags = mysqlTable("tags", {
  id: int("id").autoincrement().primaryKey(),
  // name: text("name"),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

// // for login users auth js 

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  // name: text("name"),
  fullName: text("fullName").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: text("role").notNull(),
  authProviderId: text("authProviderId"),
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
