import { createPool } from "mysql2/promise";
import { DB } from "./config.js";

export const pool = createPool(DB);
