import { fetchCategories } from "@/services/apiCategories"
import { useQuery } from "@tanstack/react-query"



export const useCategories = () => {

    const { data, isPending, error } = useQuery({ 
        queryKey: ['categories'], 
        queryFn: fetchCategories 
    })

    return { data, isPending, error }

}
