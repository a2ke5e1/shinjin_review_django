import PostProps from "./PostProps";


export interface CategoriesResponse {
    categories: Array<CategoriesProps>
}


export default interface CategoriesProps {
    id: number
    url: string,
    name: string,
    description: string,
    slug: string
    post : Array<PostProps>
}