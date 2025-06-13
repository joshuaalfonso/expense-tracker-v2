
import type { ErrorResponse } from "@/models/error";
import { deleteCategory } from "@/services/apiCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios";
import { toast } from "sonner";


export const useDeleteCategory = () => {

    const queryCliet = useQueryClient();

    const {mutate: deleteCategoryMutation, isPending: isDeleting} = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryCliet.invalidateQueries({
                queryKey: ['categories']
            });
            toast.info('Successfully deleted!');
        },
        onError: (err: AxiosError<ErrorResponse>) => {
            console.log(err)
            toast.error(err.response?.data.message || 'An error occured while deleting the data')
        }
    });

    return { deleteCategoryMutation, isDeleting }

}
