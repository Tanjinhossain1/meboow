// // import '@/drizzle/envConfig';
// import { drizzle } from 'drizzle-orm/mysql2';
// import mysql from 'mysql2/promise';
// import * as schema from './schema';

// // const connection = postgres(process.env.DATABASE_URL!);
// // Create the MySQL connection using mysql2
// const connection =async () =>{

//     const connection = await  mysql.createConnection(process.env.DATABASE_URL!);
//     return connection
// }

// export const db = drizzle(connection(), { schema });
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

let database: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!database) {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    database = drizzle(connection, { schema,mode: "default"  });
  }
  return database;
}