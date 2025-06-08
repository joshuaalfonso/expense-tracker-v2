import { createExpense } from "@/services/apiExpenses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";


interface ErrorResponse {
  error: string;
}


export const useCreateExpense = () => {

    const queryClient = useQueryClient();
    
    const { mutate: createExpenseMutattion, isPending: isCreating } = useMutation({
        mutationFn: createExpense,
        onSuccess: () => {
            toast.success('Successfully created!');
            queryClient.invalidateQueries({
                queryKey: ['expenses']
            })
        },
        onError: (err: AxiosError<ErrorResponse>) => {
            console.log(err)
            toast.error(err.response?.data?.error  || 'An error occured while creaint expense.')
        }
    });


    return { createExpenseMutattion, isCreating }

}