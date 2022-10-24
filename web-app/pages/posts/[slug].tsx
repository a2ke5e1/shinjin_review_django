import type {NextPage} from 'next'
import Head from 'next/head'
import {useEffect, useMemo, useState} from "react";
import Extensions from '../../component/Editor/TipTapExtensions'
import {EditorContent, useEditor} from "@tiptap/react";
import styles from '../../styles/Post.module.css'
import {QueryProp} from "../../props/RoutingProps";
import axios from "axios";
import PostProps, {PostResponse} from "../../props/PostProps";


const Home = ({post}: PostResponse) => {


    const editor = useEditor({
        editable: false,
        extensions: Extensions,
    })
    console.log(post.content)
    editor?.commands.setContent(
        post.content
    )


    return (
        <div>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.description}/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <div className={styles["blog"]}>
                    <EditorContent editor={editor}/>
                </div>
            </main>


        </div>
    )
}

export async function getServerSideProps({query: {slug}}: QueryProp) {
    const {data} = await axios.get(`http://localhost:8000/posts/?slug=${slug}`)
    const post = data.results[0] || null


    if (post == null) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post: post
        }
    }
}

export default Home
