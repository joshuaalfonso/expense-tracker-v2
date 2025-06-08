import { deleteExpense } from "@/services/apiExpenses";
import {  useMutation, useQueryClient } from "@tanstack/react-query"
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface ErrorResponse {
    success: boolean,
    message: string
}

export const useDeleteExpense = () => {

    const queryClient = useQueryClient();

    const {mutate: deleteExpenseMutation, isPending: isDeleting} = useMutation({
        mutationFn: deleteExpense,
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ['expenses']
            })
            toast.info(res.message || 'Successfully deleted.')
        },
        onError: (err: AxiosError<ErrorResponse>) => {
            console.error(err.response);
            toast.error(err.response?.data?.message || 'An error occured while deleting the data')
        }
    })

    return { deleteExpenseMutation, isDeleting }

}