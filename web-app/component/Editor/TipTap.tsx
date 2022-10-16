import {EditorContent, useEditor} from '@tiptap/react';
import styles from "../../styles/Editor.module.css";
import {useState} from "react";
import Extensions from "./TipTapExtensions";
import InsertDialogBox from "../DialogBox/InsertDialogBox";
import EditorToolbar from "./Toolbar/EditorToolbar";


export default function TipTap() {
    const editor = useEditor({
        extensions: Extensions,
        onUpdate: ({editor}) => {
            const json = editor.getJSON()


            window.localStorage.setItem("docs", JSON.stringify(json))
            // @ts-ignore
            var t = ""
            try {
                // @ts-ignore
                json.content?.at(0).content.forEach(
                    (e) => {
                        t += e.text
                    }
                )
            } catch (e) {

            }
            window.localStorage.setItem("metadata", JSON.stringify(
                {
                    "title": t
                }
            ))

        }
    })

    const [twitterDialogBoxOpen, setTwitterDialogBoxOpen] = useState(false);
    const [youtubeDialogBoxOpen, setYoutubeDialogBoxOpen] = useState(false);
    const [linkDialogBoxOpen, setLinkDialogBoxOpen] = useState(false);


    if (editor == null) {
        return ""
    }

    return (
        <>
            <div className={styles["main-container"]}>
                <EditorToolbar editor={editor}
                               setLinkDialogBoxOpen={setLinkDialogBoxOpen}
                               setTwitterDialogBoxOpen={setTwitterDialogBoxOpen}
                                setYoutubeDialogBoxOpen={setYoutubeDialogBoxOpen}
                />
                <div className={styles["editor-container"]}>
                    <EditorContent editor={editor}/>
                </div>
                <div className={styles["editor-other-info"]}>
                    {editor?.storage.characterCount.characters()} Characters<br/>
                    {editor?.storage.characterCount.words()} Words
                </div>
            </div>
            <InsertDialogBox
                editor={editor}
                getState={twitterDialogBoxOpen}
                setState={setTwitterDialogBoxOpen}
                title={"Add Tweet"}
                message={"Enter the tweet ID of the tweet that you want to embed."}
                label={"Tweet ID"}
                insertBlock="twitter"
            />
            <InsertDialogBox
                editor={editor}
                getState={youtubeDialogBoxOpen}
                setState={setYoutubeDialogBoxOpen}
                title={"Add Youtube Video"}
                message={"Enter the youtube URL of the youtube video that you want to embed."}
                label={"URL"}
                insertBlock="youtube"
            />
            <InsertDialogBox
                editor={editor}
                getState={linkDialogBoxOpen}
                setState={setLinkDialogBoxOpen}
                title={"Insert Link"}
                message={""}
                label={"URL"}
                insertBlock="link"
            />
        </>
    )
}