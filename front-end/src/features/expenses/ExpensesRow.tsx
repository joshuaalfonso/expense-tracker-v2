import type { ExpensesList } from "@/models/expenses"
import { format } from "date-fns"




export const ExpensesRow = ({row}: {row: ExpensesList}) => {
    return (
        <li className="border border-[var(--color-border)] py-2 px-4 flex items-center justify-between gap-2 rounded-[var(--radius-sm)]">
            <div className="flex gap-3">
                <div className="text-3xl flex items-center">{row.category_icon}</div>
                <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-sm">{row.category_name}</span>
                    <span className="text-xs font-medium opacity-70">{row.date ? format(new Date(row.date), "yyyy-MM-dd") : "No date"}</span>
                </div>
            </div>
            <div className="text-[var(--color-destructive)]">- {row.amount}</div>
        </li>
    )
}