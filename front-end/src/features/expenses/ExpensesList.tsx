import { fetchPaginatedExpenses } from "@/services/apiExpenses";
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { ExpensesRow } from "./ExpensesRow";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CreateEditExpenses } from "./CreateEditExpenses";
import { useCategories } from "../categories/useCategories";
import { useMemo, useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";


export const ExpensesList = () => {

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const [page, setPage] = useState<number>(1);

    const {data: paginatedData, isPending, error} = useQuery({
        queryKey: ['expenses', page],
        queryFn: () => fetchPaginatedExpenses(page),
        placeholderData: keepPreviousData,
        staleTime: 5000,
    })

    const visiblePages = useMemo(() => {
        if (!paginatedData) return [];

        return Array.from({ length: paginatedData.totalPages }, (_, i) => i + 1)
            .filter(p => p !== 1 && p !== paginatedData.totalPages && Math.abs(p - page) <= 1);
    }, [paginatedData, page]);

    // console.log(paginatedData)

    const { 
        data: categories, 
        isPending: isCategoriesLoading, 
        error: categoriesError 
    } = useCategories();
    

    if (isPending) return (
        <div className="flex justify-center">
            <LoadingSpinner />
        </div>
    );

    if (error) return <p>{error.message || 'An error occured while fetching data.'}</p>;

    console.log('expense list init')

    return (
        <>

            <div className="flex justify-end mb-4">
                <CreateEditExpenses 
                    categories={categories || []}
                    isCategoriesLoading={isCategoriesLoading}
                    categoriesError={categoriesError}
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                />
            </div>

            {paginatedData.data?.length === 0 && (
                 <div className="h-[200px] grid place-items-center bg-[var(--color-input]) rounded-[var(--radius-sm)]">
                    <p className="text-center col-span-full opacity-70">No expenses found.</p>
                </div>
            )}

            <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
                {paginatedData.data?.map(row => (
                    <ExpensesRow 
                        row={row} 
                        key={row.id}
                        categories={categories || []}
                        isCategoriesLoading={isCategoriesLoading}
                        categoriesError={categoriesError} 
                    />
                ))}
            </ul>

            {paginatedData.totalPages > 1 && (
                <Pagination className="mt-8">
                    <PaginationContent>

                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                        </PaginationItem>

                        {/* First Page */}
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => setPage(1)}
                                isActive={page === 1}
                                className={
                                    page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                                }
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>

                        {/* Start Ellipsis */}
                        {page > 3 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {/* Pages around current */}
                        {visiblePages.map(p => (
                                <PaginationItem key={p}>
                                    <PaginationLink 
                                        onClick={() => setPage(p)} 
                                        isActive={p === page}
                                        className={`${p === page ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                        ))}


                        {/* End Ellipsis */}
                            {page < paginatedData.totalPages - 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {/* Last Page */}
                        {paginatedData.totalPages > 1 && (
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => setPage(paginatedData.totalPages)}
                                    isActive={page === paginatedData.totalPages}
                                    className={
                                        page === paginatedData.totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
                                    }
                                >
                                {paginatedData.totalPages}
                                </PaginationLink>
                            </PaginationItem>
                        )}

                        <PaginationItem>
                            <PaginationNext 
                                onClick={() =>
                                    setPage((prev) =>
                                        Math.min(prev + 1)
                                    )
                                }
                                className={
                                    page === paginatedData?.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                                }
                            />
                        </PaginationItem>

                    </PaginationContent>
            </Pagination>
            )}
        </>
    )
}