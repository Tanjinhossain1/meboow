import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  dialect: 'mysql', // Ensure this matches your PostgreSQL database type
  schema: './src/drizzle/schema.ts', // Path to your schema definition files
  out: './drizzle', // Output directory for generated files
  dbCredentials: {
   url: process.env.DATABASE_URL || "",
  //  host: "82.197.82.40",
  //  user: "u561151798_safarilistDev",
  //  database: "u561151798_safarilist_dev",
  //  password:"Workwithmht671@",
  //  port: 3306
  },
});
