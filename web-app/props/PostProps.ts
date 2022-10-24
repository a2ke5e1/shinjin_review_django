import CategoriesProps from "./CategoryProps";

export interface PostResponse {
    post : PostProps
}

export interface PostsResponse {
    posts : Array<PostProps>
}

export default interface PostProps {
    id: number,
    url: string,
    title: string,
    description: string,
    slug: string,
    category: Array<CategoriesProps>
    published : number,
    published_on : string,
    last_updated : string,
    content : JSON,
    // user : any
}