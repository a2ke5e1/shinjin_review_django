import {NextPage} from "next";
import axios from "axios";

const Category = ({category}) => {
    return (
        <div>
            {category.post.map(
                (p) => {
                    return (
                        <div>
                            <div>{p.title}</div>
                            <div>{p.description}</div>
                            <div>{p.published_on}</div>
                            <div>{p.last_updated}</div>
                            <div></div>
                            <br/>
                            <br/>
                        </div>
                    )
                }
            )}
        </div>
    )
}

export async function getServerSideProps({query: {slug}}) {
    const {data} = await axios.get(`http://localhost:8000/categories?slug=${slug}`)
    return {
        props: {
            category: data.results[0] || null
        }
    }
}

export default Category;