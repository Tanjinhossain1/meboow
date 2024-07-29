import { handlers } from "@/auth";
import { getDb } from "@/drizzle/db";
import { MobileArticles } from "@/drizzle/schema";

export const { GET, POST } = handlers;

