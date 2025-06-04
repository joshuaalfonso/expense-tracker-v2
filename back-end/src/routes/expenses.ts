import { Hono } from "hono";
import { conn } from "../db-conn.js";
// import { authMiddleware } from "../utils/authMiddleware.js";

export const expenses = new Hono();

// expenses.use('*', authMiddleware);

expenses.get('/', async (c) => {
    const [rows] = await conn.execute(
        `
            SELECT 
                e.id,
                e.date,
                c.id AS category_id,
                c.category_name,
                c.category_icon,
                e.amount,
                e.description,
                u.id AS user_id,
                u.name,
                u.email,
                u.picture
            FROM 
                expenses AS e
            LEFT JOIN
                categories AS c
                ON e.category_id = c.id
            LEFT JOIN
                users AS u
                ON e.user_id = u.id;
        `
    );
    return c.json(rows);
})