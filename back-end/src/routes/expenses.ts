import { Hono } from "hono";
import { conn } from "../db-conn.js";
import { authMiddleware } from "../middleware/auth.js";

export const expenses = new Hono();

expenses.use('*', authMiddleware);

expenses.get('/', async (c) => {

    const {user_id} = c.get('jwtPayload');

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
                ON e.user_id = u.id
             WHERE e.user_id = ?
        `,
        [user_id]
    );
    return c.json(rows);
})


expenses.post('', async (c) => {

    const body = await c.req.json();

    const {user_id} = c.get('jwtPayload');

    const { id, date, category_id, amount, description, date_created } = body;

    try {
        const [result] = await conn.execute(
        `INSERT INTO expenses (id, date, category_id, amount, description, date_created, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, date, category_id, amount, description, date_created, user_id]
        );

        return c.json({ success: true, result });
    } 
  
    catch (error) {
        console.error(error);
        return c.json({ success: false, error: 'Failed to insert expense.' }, 500);
    }

})