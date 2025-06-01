


export interface CategoriesList {
    id: number,
    category_name: string,
    category_icon: string,
    date_created: string
}


export interface CategoriesPost {
    id: number | null,
    category_name: string,
    category_icon: string,
    date_created: string | null
}