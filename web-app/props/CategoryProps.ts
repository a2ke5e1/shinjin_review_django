import PostProps from "./PostProps";

export interface CategoryResponse {
    category: CategoriesProps
}

export interface CategoriesResponse {
    categories: Array<CategoriesProps>
}


export default interface CategoriesProps {
    url: string,
    name: string,
    description: string,
    slug: string
    post : Array<PostProps>
}