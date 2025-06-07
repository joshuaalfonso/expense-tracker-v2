import { fetchExpenses } from "@/services/apiExpenses";
import { useQuery } from "@tanstack/react-query"
import { ExpensesRow } from "./ExpensesRow";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CreateEditExpenses } from "./CreateEditExpenses";
import { useCategories } from "../categories/useCategories";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";

export const ExpensesList = () => {

    // const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    
    const {data, isPending, error} = useQuery({
        queryFn: fetchExpenses,
        queryKey: ['expenses']
    })

    const { 
        data: categories, 
        isPending: isCategoriesLoading, 
        error: categoriesError 
    } = useCategories();

    if (isPending) return (
        <div className="flex justify-center">
            <LoadingSpinner />
        </div>
    );

    if (error) return <p>{error.message || 'An error occured while fetching data.'}</p>

    console.log('expense list init')

    return (
        <>
            {/* <Button onClick={() => setIsDialogOpen(true)}>Open</Button> */}
            <div className="flex justify-end mb-4">
                <CreateEditExpenses 
                    categories={categories || []}
                    isCategoriesLoading={isCategoriesLoading}
                    categoriesError={categoriesError}
                />
            </div>
            <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                {data?.map(row => (
                    <ExpensesRow row={row} key={row.id} />
                ))}
            </ul>

        </>
    )
}