import {
  boolean,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const Articles = pgTable(
  'articles',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    category: text('category').notNull(),
    description: text('description').notNull(),
    latestDevice: text('latestDevice'),
    brands: text('brands'),
    deviceName: text('deviceName'),
    showInNews: text('showInNews'),
    image: text('image').notNull(),
    content: jsonb('content'),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updateAt: timestamp('updateAt').defaultNow().notNull(),
  },
);

export const Category = pgTable(
  'category',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull().unique(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updateAt: timestamp('updateAt').defaultNow().notNull(),
  }
)

export const TechBrands = pgTable(
  'techBrands',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull().unique(),
    image: text('image').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updateAt: timestamp('updateAt').defaultNow().notNull(),
  }
)
export const Brands = pgTable(
  'brands',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull().unique(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updateAt: timestamp('updateAt').defaultNow().notNull(),
  }
)


export const MobileArticles = pgTable(
  'mobile_articles',
  {
    id: serial('id').primaryKey(),

    title: text('title').notNull(),
    market_status: text('market_status').notNull(),
    release_date: text('release_date').notNull(),
    key_specifications: jsonb('key_specifications').notNull(),
    brands: text('brands').notNull(),
    image: jsonb('image').notNull(),

    physicalSpecification: jsonb("physicalSpecification"),
    network: jsonb("network"),
    display: jsonb("display"),
    processor: jsonb("processor"),
    memory: jsonb("memory"),
    mainCamera: jsonb("mainCamera"),
    selfieCamera: jsonb("selfieCamera"),
    os: jsonb("os"),
    connectivity: jsonb("connectivity"),
    features: jsonb("features"),
    battery: jsonb("battery"),
    details: jsonb("details"),
    prices: jsonb("prices"),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  }
);



// for login users auth js 

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  // name: text("name"),
  fullName: text("fullName").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: text("role").notNull(),
  authProviderId: text("authProviderId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
})

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  // userName: text("userName")
  //   .notNull()
  //   .references(() => users, { onDelete: "cascade" }),

  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
