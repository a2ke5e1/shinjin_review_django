export interface PostResponse {
    post : PostProps
}

export default interface PostProps {
    url: string,
    title: string,
    description: string,
    slug: string,
    published : number,
    published_on : string,
    last_updated : string,
    content : string,
    user : any
}