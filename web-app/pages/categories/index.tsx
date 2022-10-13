import {NextPage} from "next";
import axios from "axios";
import CategoriesProps, {CategoriesResponse} from "../../props/CategoryProps";
import Link from "next/link";



function Categories({categories}: CategoriesResponse) {
    return (
        <div>
            {categories.map((element: CategoriesProps) => {
                return (
                    <div key={element.name}>
                        <div>
                            <Link href={`categories/${element.slug}`}>
                                {
                                    element.name
                                }
                            </Link>
                        </div>
                        <div>
                            {
                                element.description
                            }
                        </div>

                        <br/>
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