import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  dialect: 'mysql', // Ensure this matches your PostgreSQL database type
  schema: './src/drizzle/schema.ts', // Path to your schema definition files
  out: './drizzle', // Output directory for generated files
  dbCredentials: {
   url: process.env.DATABASE_URL || "",
  },
});
