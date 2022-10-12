import {NextPage} from "next";
import axios from "axios";

interface test{
    results : Array<CategoriesElement>
}

interface CategoriesElement {
    url: string,
    name: string,
    description: string,
    post : Array<any>
}



function Categories({categories} : test) {
    return (
        <div>
            {categories.map((element: CategoriesElement) => {
                return (
                    <div key={element.name}>
                        <div>
                            {
                                element.name
                            }
                        </div>
                        <div>
                            {
                                element.description
                            }
                        </div>
                        <br />
                    </div>
                )
            })}
        </div>
    )
}

export default Categories;


export async function getServerSideProps() {
    const {data} = await axios.get('http://localhost:8000/categories/')
    return {
        props: {
            categories: data.results
        }
    }
}