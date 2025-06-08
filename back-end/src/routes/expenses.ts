import { Hono } from "hono";
import { conn } from "../db-conn.js";
import { authMiddleware } from "../middleware/auth.js";
import { type ResultSetHeader } from 'mysql2';

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


expenses.get('/page/:page', async (c) => {

  const page = parseInt(c.req.param('page') || '1');

  const {user_id} = c.get('jwtPayload');

  const limit = 10;
  const offset = (page - 1) * limit;

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
      WHERE 
        user_id = ? 
        ORDER BY date 
        DESC LIMIT ? OFFSET ?
    `,
    [user_id, limit, offset]
  );

  const [totalResponse] = await conn.execute(
    `SELECT COUNT(*) as total FROM expenses WHERE user_id = ?`,
    [user_id]
  );

  const total = (totalResponse as any[])[0].total;
  console.log(total)

  return c.json({
    data: rows,                
    currentPage: page,         
    perPage: limit, 
    total,
    totalPages: Math.ceil(total / limit)
  });

})


expenses.post('/', async (c) => {

    const body = await c.req.json();

    const {user_id} = c.get('jwtPayload');

    const { id, date, category_id, amount, description } = body;

    try {
        const [result] = await conn.execute(
        `INSERT INTO expenses (id, date, category_id, amount, description, user_id)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [id, date, category_id, amount, description, user_id]
        );

        return c.json({ success: true, result });
    } 
  
    catch (error) {
        console.error(error);
        return c.json({ success: false, error: 'Failed to insert expense.' }, 500);
    }

})


expenses.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();

  const { date, category_id, amount, description } = body;

  try {
    const [result] = await conn.execute(
      `UPDATE expenses
       SET date = ?, category_id = ?, amount = ?, description = ?
       WHERE id = ?`,
      [date, category_id, amount, description, id]
    );

    if ((result as any[]).length === 0) {
      return c.json({ success: false, error: 'Expense not found.' }, 404);
    }

    return c.json({ success: true, result, message: 'Successfully updated!' });
  } 
  
  catch (error) {
    console.error('Update error:', error);
    return c.json({ success: false, error: 'Failed to update expense.' }, 500);
  }
  
});


expenses.delete('/:expense_id', async (c) => {

  const id = c.req.param('expense_id');

  try {
    
    const [result] = await conn.execute<ResultSetHeader>(
      `
        DELETE FROM 
          expenses
        WHERE 
          id = ?
      `,
      [id]
    )

    if (result.affectedRows === 0) {
      return c.json({ success: false, message: 'No expense found with that ID.' }, 404);
    }

    return c.json({ success: true, result, message: 'Successfully deleted!' });
  }

  catch(error) {
    console.error('Delete error: ' + error);
    return c.json({ success: false, message: 'Failed to delete expense.' }, 500);
  }

})