import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Neon requires SSL
const client = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
});

export const db = drizzle(client);
