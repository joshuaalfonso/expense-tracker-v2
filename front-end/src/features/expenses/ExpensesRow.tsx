import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ExpensesList } from "@/models/expenses"
import { format, isToday } from "date-fns"
import { EllipsisVertical } from "lucide-react"
import React, { useState } from "react"
import { CreateEditExpenses } from "./CreateEditExpenses"
import type { CategoriesList } from "@/models/categories"
import { formatNumber } from "@/utils/formatNumber"
import { useDeleteExpense } from "./useDeleteExpense"


interface Props {
    row?: ExpensesList,
    categories?: CategoriesList[]; 
    isCategoriesLoading?: boolean;
    categoriesError?: Error | null;
}


const ExpensesRowComponent = ({row = {} as ExpensesList, categories, isCategoriesLoading, categoriesError}: Props) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    
    const {
        deleteExpenseMutation,
        isDeleting
    } = useDeleteExpense();

    const handleCategoryDelete = () => {
        deleteExpenseMutation(row)
    }

    const isItToday = isToday(new Date(row.date));
    // console.log('Expense row :' + row.id)

    return (
        <li className="border border-[var(--color-border)] py-2 px-4 flex items-center justify-between gap-2 rounded-[var(--radius-sm)]">
            <div className="flex gap-3 flex-1">
                <div className="text-3xl flex items-center">{row.category_icon}</div>
                <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-sm w-30 truncate ">{row.category_name}</span>
                    <span className="text-xs opacity-70">
                        {(isItToday ? 'Today' : format(new Date(row.date), "MMM d, yyyy")) || "No date"}
                    </span>
                </div>
            </div>
            <div className="text-[var(--color-destructive)] ">- {formatNumber(row.amount)}</div>

            <CreateEditExpenses
                row={row} 
                dialogOpen={dialogOpen} 
                setDialogOpen={setDialogOpen}
                categories={categories || []}
                isCategoriesLoading={isCategoriesLoading}
                categoriesError={categoriesError}
            />

            <DropdownMenu 
                open={menuOpen} 
                onOpenChange={setMenuOpen}
            >
                <DropdownMenuTrigger asChild className="focus:outline-none focus:ring-0 focus:ring-transparent">
                    
                    <Button variant="ghost" size="sm">
                        <EllipsisVertical  />
                    </Button>
                     
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer" onSelect={(e) => {
                            e.preventDefault();
                            setMenuOpen(false);
                            setDialogOpen(true);
                        }} >
                            <i className="fi fi-rr-pencil flex"></i>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={handleCategoryDelete} disabled={isDeleting}>
                            <i className="fi fi-rr-trash flex"></i>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </li>
    )
}

export const ExpensesRow = React.memo(ExpensesRowComponent);