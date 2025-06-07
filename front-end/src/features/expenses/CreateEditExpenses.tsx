import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { CategoriesList } from "@/models/categories";
import { createExpense } from "@/services/apiExpenses";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@radix-ui/react-select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";



const formSchema = z.object({

    id: z.number().nullable(),
    date: z.date({
        required_error: "A date is required.",
    }),
    category_id: z.string().min(1, {
        message: "This field is required."
    }),
    amount: z.string().min(1, {
        message: "This field is required."
    }),
    description: z.string(),
    date_created: z.string().nullable()
})

interface Props {
  categories: CategoriesList[]; // <- ✅ Array
  isCategoriesLoading: boolean;
  categoriesError: Error | null;
}

interface ErrorResponse {
  error: string;
}


export const CreateEditExpenses = ({categories, isCategoriesLoading, categoriesError}: Props) => {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: null,
            date: undefined,
            category_id: '',
            amount: '',
            description: '',
            date_created: null,
        }  
    })

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

    function onSubmit(data: z.infer<typeof formSchema>) {

        const formattedDate = format(data.date, 'yyyy-MM-dd');
        const formattedCategory = Number(data.category_id);
        const formattedAmount = Number(data.amount);

        createExpenseMutattion({
            ...data, 
            date: formattedDate, 
            category_id: formattedCategory,
            amount: formattedAmount
        })

    }


    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                   <Button variant="default">
                        <i className="fi fi-rr-plus-small flex text-xl"></i> Create
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Expenses</DialogTitle>
                        <DialogDescription>
                    
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>
                                            Expense Date 
                                            <span className="text-[var(--color-destructive)]">*</span>
                                        </FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category <span className="text-[var(--color-destructive)]">*</span></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                            <FormControl>
                                            <SelectTrigger className="w-full" disabled={isCategoriesLoading}>
                                                <SelectValue placeholder={isCategoriesLoading ? 'Loading...' : 'Select'} />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories?.map(category => (
                                                    <SelectItem 
                                                        key={category.id} 
                                                        value={String(category.id)} 
                                                        className="cursor-pointer"
                                                    >
                                                        {category.category_icon} {category.category_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        {categoriesError && (
                                            <FormMessage>
                                                An error occured while fetching category
                                            </FormMessage>
                                        )}
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount <span className="text-[var(--color-destructive)]">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="" {...field} tabIndex={-1}  />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Description 
                                            <span className="opacity-70 text-xs">(Optional)</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} tabIndex={-1}  />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

        
                            <DialogFooter>
                                <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={isCreating}>
                                    Create
                                </Button>
                            </DialogFooter>

                        </form>
                    </Form>
                
                </DialogContent>
        </Dialog>
    )
}


