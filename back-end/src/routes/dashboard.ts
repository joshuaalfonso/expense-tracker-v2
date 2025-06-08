import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.js";
import { conn } from "../db-conn.js";

export const dashboard = new Hono();

dashboard.use('*', authMiddleware);

dashboard.get('/summary', async (c) => {

    const {user_id} = c.get('jwtPayload');

    const [totalRows] = await conn.execute(
        `
            SELECT 
                SUM(amount) AS total_expense
            FROM 
                expenses
            WHERE 
                amount > 0 AND user_id = ?
        `,
        [user_id]
    )


    const [monthRows] = await conn.execute(
        `
            SELECT 
                SUM(amount) AS month_expense
            FROM 
                expenses
            WHERE 
                amount > 0 AND MONTH(date) = MONTH(CURRENT_DATE())
                AND YEAR(date) = YEAR(CURRENT_DATE())
                AND user_id = ?
        `,
        [user_id]
    )

    const [categoryRows] = await conn.execute(
        `
            SELECT 
                category_id, categories.category_name, COUNT(*) AS count
            FROM 
                expenses
            LEFT JOIN
                categories
            ON
                expenses.category_id = categories.id
            WHERE 
                user_id = ?
            GROUP BY 
                category_id
            ORDER 
                BY count DESC
            LIMIT 5
        `,
        [user_id]
    )

    const [monthsExpense] = await conn.execute(
        `
            SELECT 
                months.month_number,
                months.month_name,
                IFNULL(SUM(e.amount), 0) AS total
            FROM (
                SELECT 1 AS month_number, 'January' AS month_name UNION
                SELECT 2, 'February' UNION
                SELECT 3, 'March' UNION
                SELECT 4, 'April' UNION
                SELECT 5, 'May' UNION
                SELECT 6, 'June' UNION
                SELECT 7, 'July' UNION
                SELECT 8, 'August' UNION
                SELECT 9, 'September' UNION
                SELECT 10, 'October' UNION
                SELECT 11, 'November' UNION
                SELECT 12, 'December'
            ) AS months
            LEFT JOIN 
                expenses e
                ON MONTH(e.date) = months.month_number
                AND YEAR(e.date) = YEAR(CURDATE())
                AND e.amount > 0
                AND e.user_id = ?
            GROUP BY 
                months.month_number, months.month_name
            ORDER BY 
                months.month_number
        `,
        [user_id]
    ) 


    return c.json({
        totalExpense: (totalRows as any[])[0]?.total_expense ?? 0,
        monthExpense: (monthRows as any[])[0]?.month_expense ?? 0,
        topCategories: categoryRows,
        monthsExpense: monthsExpense
    })

})

