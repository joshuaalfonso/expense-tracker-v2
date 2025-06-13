import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter,
} from "@/components/ui/emoji-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react"
import { Loader2Icon } from "lucide-react"
import type { CategoriesList } from "@/models/categories"
import { useEditCategory } from "./useEditCategory"
import { useCreateCategory } from "./useCreateCategory"


const formSchema = z.object({
    id: z.number().nullable(),
    category_name: z.string().min(1, {
        message: "This field is required."
    }),
    category_icon: z.string().min(1, {
        message: "This field is required."
    }),
    date_created: z.string().nullable()
})

interface createEditProps {
    row?: CategoriesList,
    dialogOpen: boolean,
    setDialogOpen: (open: boolean) => void
}

export const CreateEditCategories = ({row = {} as CategoriesList,dialogOpen, setDialogOpen }: createEditProps) => {

    const { id: categoryId } = row;

    const isEditMode = Boolean(categoryId);

    const [emojiOpen, setEmojiOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: isEditMode ? {...row} : {
            id: null,
            category_name: "",
            category_icon: "",
            date_created: null,
        }   
    })

    const { createCategoryMutation, isCreating } = useCreateCategory();

    const { editCategoryMutation, isUpdating } = useEditCategory();

    const isWorking = isCreating || isUpdating;

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        if (isEditMode) {
            editCategoryMutation(
                values,
                {
                    onSuccess: () => {
                        form.reset();
                        setDialogOpen(false);
                    }
                }
            )
        } 
        
        else {
            createCategoryMutation(
                values,
                {
                    onSuccess: () => {
                        form.reset();
                        setDialogOpen(false);
                    }
                }
            )
        } 

    }


    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <form>
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
                    <DialogHeader>
                        <DialogTitle>Create Category</DialogTitle>
                        <DialogDescription>
                    
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <FormField
                                control={form.control}
                                name="category_icon"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Icon</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-2 max-h-[400px] overflow-y-auto">
                                                <Input 
                                                    placeholder="" {...field} 
                                                    disabled={true}
                                                />
                                                <Popover 
                                                    onOpenChange={setEmojiOpen} 
                                                    open={emojiOpen} 
                                                    modal={true}
                                                >
                                                    <PopoverTrigger asChild>
                                                        <Button 
                                                            type="button" 
                                                        >
                                                            Pick
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent 
                                                        className="w-fit p-0 z-50" 
                                                        sideOffset={8} 
                                                        align="end" 
                                                        side="bottom"
                                                    >
                                                        <EmojiPicker
                                                            className="h-[342px]"
                                                            onEmojiSelect={({ emoji }) => {
                                                            setEmojiOpen(false);
                                                            // console.log(emoji);
                                                            form.setValue('category_icon', emoji, {shouldValidate: true})
                                                            }}
                                                        >
                                                            <EmojiPickerSearch />
                                                            <EmojiPickerContent />
                                                            <EmojiPickerFooter />
                                                        </EmojiPicker>
                                                    </PopoverContent>
                                                </Popover>
                                            </div> 
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} autoComplete="off" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
        
                            <DialogFooter>
                                <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={isWorking || !form.formState.isDirty}>
                                    {isWorking && <Loader2Icon className="animate-spin" />}
                                    {isEditMode ? 'Apply changes' : 'Create'}
                                </Button>
                            </DialogFooter>

                        </form>
                    </Form>
                
                </DialogContent>
            </form>
        </Dialog>
    )
}



