import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

import type { CategoriesList } from "@/models/categories"
import { useDeleteCategory } from "./useDeleteCategory"
import { CreateEditCategories } from "./CreateEditCategories";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ellipsis } from 'lucide-react';


export const CategoriesRow = ({row}: {row: CategoriesList}) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    
    const { deleteCategoryMutation, isDeleting } = useDeleteCategory();

    const handleCategoryDelete = () => {
        deleteCategoryMutation(row.id)
    }

    return (
        <li 
            className="border border-[var(--color-border)] py-2 px-4 flex items-center gap-2 rounded-[var(--radius-sm)]"
        >
            <span className="text-xl">
                {row.category_icon}
            </span> 
            
            <span 
                className="font-medium flex-1"
            >
                {row.category_name}
            </span> 

            <CreateEditCategories 
                row={row} 
                dialogOpen={dialogOpen} 
                setDialogOpen={setDialogOpen}
            />

            <DropdownMenu 
                open={menuOpen} 
                onOpenChange={setMenuOpen}
            >
                <DropdownMenuTrigger asChild className="focus:outline-none focus:ring-0 focus:ring-transparent">
                    
                    {/* <div className="rounded-[var(--radius-sm)] p-2 cursor-pointer hover:text-[var(--color-primary)] ease-out duration-200">
                        <i className="fi fi-rr-menu-dots flex"></i>
                    </div> */}
                    <Button variant="ghost">
                        <Ellipsis />
                        {/* <Loader2Icon className="animate-spin" /> */}
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



