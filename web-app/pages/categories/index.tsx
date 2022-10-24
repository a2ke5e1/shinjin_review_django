import {NextPage} from "next";
import axios from "axios";
import CategoriesProps, {CategoriesResponse} from "../../props/CategoryProps";
import Link from "next/link";
import {Typography} from "@mui/material";



function Categories({categories}: CategoriesResponse) {
    return (
        <div>
            {categories.map((element: CategoriesProps) => {
                return (
                    <div key={element.name}>
                        <div>
                            <Link href={`categories/${element.slug}`}>
                                <Typography>
                                    {
                                        element.name
                                    }
                                </Typography>
                            </Link>
                        </div>
                        <div>
                            <Typography>
                                {
                                    element.description
                                }
                            </Typography>
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