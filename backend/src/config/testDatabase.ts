import { pool } from "./database.js";

const result = await pool.query("SELECT NOW()");

console.log("Database connected:", result.rows[0]);

await pool.end();
