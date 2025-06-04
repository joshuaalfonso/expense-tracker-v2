import { useState } from "react";
import { useCategories } from "./useCategories";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CreateEditCategories } from "./CreateEditCategories";
import { CategoriesRow } from "./CategoriesRow";


export const CategoriesList = () => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const { data, isPending, error } = useCategories();

    if (isPending) return (
        <div className="flex justify-center">
            <LoadingSpinner />
        </div>
    );

    if (error) return <p>{error.message || 'There was an error fetching categories'}</p>


    return (
        <>
            <div className="mb-4 flex justify-end">
                <CreateEditCategories 
                    dialogOpen={dialogOpen} 
                    setDialogOpen={setDialogOpen}
                />
            </div>

            <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                {/* <li 
                    className="py-2 px-4 border rounded-[var(--radius-sm)] bg-[var(--color-primary)] text-white flex items-center justify-center"
                >
                    <i className="fi fi-rr-plus-small flex text-2xl"></i>
                    Create Category
                </li> */}
                {data?.map(row => (
                    <CategoriesRow row={row} key={row.id}/>
                ))}
            </ul>
        </>
    )
}