
import { deleteCategory } from "@/services/apiCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";


export const useDeleteCategory = () => {

    const queryCliet = useQueryClient();

    const {mutate: deleteCategoryMutation, isPending: isDeleting} = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryCliet.invalidateQueries({
                queryKey: ['categories']
            });
            toast.success('Successfully deleted!');
        },
        onError: (err) => {
            toast.error(err.message || 'An error occured while deleting the data')
        }
    });

    return { deleteCategoryMutation, isDeleting }

}