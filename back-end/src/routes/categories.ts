import { Hono } from "hono";
import { conn } from "../db-conn.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const categories = new Hono();

categories.use('*', authMiddleware);

categories.get('/', async(c) => {
    const [rows] = await conn.execute('SELECT * from categories');
    return c.json(rows);
})

categories.post('/', async (c) => {
  const body = await c.req.json();

  const { id, category_name, category_icon, date_created } = body;

  try {
    const [result] = await conn.execute(
      `INSERT INTO categories (id, category_name, category_icon, date_created)
       VALUES (?, ?, ?, ?)`,
      [id, category_name, category_icon, date_created]
    );

    return c.json({ success: true, result });
  } 
  
  catch (error) {
    console.error(error);
    return c.json({ success: false, error: 'Failed to insert category.' }, 500);
  }

});

categories.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();

  const { category_name, category_icon, date_created } = body;

  try {
    const [result] = await conn.execute(
      `UPDATE categories
       SET category_name = ?, category_icon = ?, date_created = ?
       WHERE id = ?`,
      [category_name, category_icon, date_created, id]
    );

    if ((result as any[]).length === 0) {
      return c.json({ success: false, error: 'Category not found.' }, 404);
    }

    return c.json({ success: true, result });
  } 
  
  catch (error) {
    console.error('Update error:', error);
    return c.json({ success: false, error: 'Failed to update category.' }, 500);
  }
  
});


categories.delete('/:categories_id', async (c) => {
    const id = c.req.param('categories_id');

    try {
        const [result] = await conn.execute(
            `DELETE FROM categories WHERE id = ?`, [id]
        )

         return c.json({ success: true, result });
    }

    catch {
        return c.json({ success: false, error: 'Failed to delete category.' }, 500);
    }

})

export default categories;