import { createCategories } from "@/services/apiCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";


export const useCreateCategory = () => {
    
    const queryClient = useQueryClient();
    
    const {mutate: createCategoryMutation, isPending: isCreating} = useMutation({
        mutationFn: createCategories,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories']
            });
            toast.success('Successfully created!');
        } ,
        onError: (error) => {
            console.error('error : ' + error);
            toast.error(error.message || 'An error occurred while creating data.')
        }
    })

    return { createCategoryMutation, isCreating }

}