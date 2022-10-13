import {NextPage} from "next";
import axios from "axios";
import {CategoryResponse} from "../../props/CategoryProps";
import {QueryProp} from "../../props/RoutingProps";


const Category = ({category}: CategoryResponse) => {

    return (
        <div>
            <h1>{category.name}</h1>
            {
                category.post.map(
                    (p) => {
                        return (
                            <div key={p.slug}>
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
                )
            }
        </div>
    )
}

export async function getServerSideProps({query: {slug}}: QueryProp) {
    const {data} = await axios.get(`http://localhost:8000/categories?slug=${slug}`)
    const category = data.results[0] || null

    if (category == null) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            category: category
        }
    }
}

export default Category;