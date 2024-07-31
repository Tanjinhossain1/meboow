
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

let database: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  try {
    if (!database) {
      const connection = await mysql.createConnection(process.env.DATABASE_URL!);
      database = drizzle(connection, { schema, mode: "default" });
      return database;
    }
  } catch (error) {
    console.log('database connection error ', error)
  }
}