import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { CategoriesList } from "@/models/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@radix-ui/react-select";
import { format, isValid } from "date-fns";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateExpense } from "./useCreateExpense";
import type { ExpensesList } from "@/models/expenses";
import { useEditExpense } from "./useEditExpense";

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
    oldAmount: z.string(),
    description: z.string()
})

interface Props {
    row?: ExpensesList,
    categories?: CategoriesList[]; // <- ✅ Array
    isCategoriesLoading?: boolean;
    categoriesError?: Error | null;
    dialogOpen: boolean,
    setDialogOpen: (open: boolean) => void
}

export const CreateEditExpenses = ({
    row = {} as ExpensesList,
    categories, 
    isCategoriesLoading, 
    categoriesError, 
    dialogOpen, 
    setDialogOpen}: Props
) => {

    const { id } = row;

    const isEditMode = Boolean(id);

    const safeDate = (value: string) => {
        const date = value ? new Date(value) : undefined;
        return date && isValid(date) ? date : undefined;
    };

    // console.log(row.date)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:  row
    ? {
        id: row.id ?? null,
        date: safeDate(row.date), 
        category_id: String(row.category_id ?? ''),
        amount: String(row.amount ?? ''),
        oldAmount: String(row.amount ?? ''),
        description: row.description ?? '',
      }
    : {
        id: null,
        date: new Date(), 
        category_id: '',
        amount: '',
        oldAmount: '',
        description: '',
      },
    })

    const { createExpenseMutattion, isCreating } = useCreateExpense();

    const { editExpenseMutation, isUpdating } = useEditExpense();

    const isWorking = isCreating || isUpdating;


    function onSubmit(data: z.infer<typeof formSchema>) {

        // console.log(data)

        const formattedDate = format(data.date, 'yyyy-MM-dd');
        const formattedCategory = Number(data.category_id);
        const formattedAmount = Number(data.amount);
        const formattedOldAmount = Number(data.oldAmount);

        const newExpense = {
            ...data, 
            date: formattedDate, 
            category_id: formattedCategory,
            amount: formattedAmount,
            oldAmount: formattedOldAmount
        }


        if (isEditMode) {
            editExpenseMutation(
                newExpense,
                {
                    onSuccess: () => {
                        setDialogOpen(false);
                        form.reset();
                    }
                }
            )
        } 
        
        else {
            createExpenseMutattion(
                newExpense,
                {
                    onSuccess: () => {
                        setDialogOpen(false);
                        form.reset();
                    }
                }
            )
        } 

    }


    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    {!isEditMode && (
                        <Button variant="default">
                            <i className="fi fi-rr-plus-small flex text-xl"></i> Create
                        </Button>
                    )}
                </DialogTrigger>

                <DialogContent 
                    className="sm:max-w-[425px]" 
                    >
                    {/* onOpenAutoFocus={(e) => e.preventDefault()} */}
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
                                                <FormControl tabIndex={-1} >
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
                                            <SelectTrigger className="w-full" disabled={isCategoriesLoading} >
                                                <SelectValue placeholder={isCategoriesLoading ? 'Loading...' : 'Select'}  />
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
                                            <Input type="number" placeholder="" {...field} />
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
                                            <Input placeholder=""{...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
        
                            <DialogFooter>
                                <DialogClose asChild >
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={isWorking || !form.formState.isDirty} >
                                    { isWorking && <Loader2Icon className="animate-spin" /> }
                                    { isEditMode ? 'Apply changes' : 'Create' }
                                </Button>
                            </DialogFooter>

                        </form>
                    </Form>
                
                </DialogContent>
        </Dialog>
    )
}


