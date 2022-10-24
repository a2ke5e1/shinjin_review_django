import {NextPage} from "next";
import axios from "axios";
import {QueryProp} from "../../props/RoutingProps";
import {PostsResponse} from "../../props/PostProps";
import Link from "next/link";
import {Typography} from "@mui/material";


const Category = ({posts}: PostsResponse) => {

    return (
        <div>
            <Typography variant={"h1"} >{posts[0].category?.[0].name}</Typography>
            {
                posts.map(
                    (p) => {
                        return (
                            <div key={p.slug}>
                                <Link href={`/posts/${p.slug}`}>
                                   <div>
                                       <div>{p.title}</div>
                                       <div>{p.description}</div>
                                       <div>{p.published_on}</div>
                                       <div>{p.last_updated}</div>
                                       <div></div>
                                       <br/>
                                       <br/>
                                   </div>
                                </Link>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

export async function getServerSideProps({query: {slug}}: QueryProp) {
    const {data} = await axios.get(`http://localhost:8000/posts/?&category__slug=${slug}&published=2`)



    const posts = data.results || null

    if (posts == null) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            posts: posts
        }
    }
}

export default Category;