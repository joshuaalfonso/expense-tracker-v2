
import { editExpense } from "@/services/apiExpenses";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";


export const useEditExpense = () => {
    
    const queryClient = useQueryClient();

    const {mutate: editExpenseMutation, isPending: isUpdating} = useMutation({
        mutationFn: editExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['expenses']
            });
            toast.success('Successfully updated!')
        },
        onError: (err) => {
            toast.error(err.message || 'An error occured while updating the data.')
        }
    })

    return { editExpenseMutation, isUpdating }

}