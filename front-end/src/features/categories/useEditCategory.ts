import { editCategories } from "@/services/apiCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";


export const useEditCategory = () => {
    
    const queryClient = useQueryClient();

    const {mutate: editCategoryMutation, isPending: isUpdating} = useMutation({
        mutationFn: editCategories,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories']
            });
            toast.success('Successfully updated.')
        },
        onError: (err) => {
            toast.error(err.message || 'An error occured while updating the data.')
        }
    })

    return { editCategoryMutation, isUpdating }

}