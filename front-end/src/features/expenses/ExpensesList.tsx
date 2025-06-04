import { fetchExpenses } from "@/services/apiExpenses";
import { useQuery } from "@tanstack/react-query"
import { ExpensesRow } from "./ExpensesRow";
import { LoadingSpinner } from "@/components/LoadingSpinner";


export const ExpensesList = () => {

    const {data, isPending, error} = useQuery({
        queryFn: fetchExpenses,
        queryKey: ['expenses']
    })

    if (isPending) return (
        <div className="flex justify-center">
            <LoadingSpinner />
        </div>
    );

    if (error) return <p>{error.message || 'An error occured while fetching data.'}</p>


    return (
        <>
            <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                {data?.map(row => (
                    <ExpensesRow row={row} key={row.id}/>
                ))}
            </ul>

        </>
    )
}