import {EditorContent, useEditor} from '@tiptap/react';
import styles from "../../styles/Editor.module.css";
import {useCallback, useEffect, useRef, useState} from "react";
import Extensions from "./TipTapExtensions";
import InsertDialogBox from "../DialogBox/InsertDialogBox";


export default function Tiptap() {

    const [twitterDialogBoxOpen, setTwitterDialogBoxOpen] = useState(false);
    const [youtubeDialogBoxOpen, setYoutubeDialogBoxOpen] = useState(false);

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


    const handleInsertTwitterButton = () => {
        setTwitterDialogBoxOpen(true);
    }
    const handleInsertYoutubeButton = () => {
        setYoutubeDialogBoxOpen(true)
    }
    const handleInsertImageViewerButton = () => {

        editor?.chain().focus().setImageViewerURLS(
            {
                src: [
                    {
                        url: "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                        alt: "TEST 1"
                    },
                    {
                        url: "https://images.unsplash.com/photo-1665731372479-551841cac2c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                        alt: "TEST 2"
                    },
                    {
                        url: "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                        alt: "TEST 3"
                    },
                ]
            }
        ).run()

        editor?.commands.createParagraphNear()

    }


    const addImage = useCallback(() => {
        const url = window.prompt('URL')

        if (url) {
            editor?.chain().focus().setImage({src: url}).run()
        }
    }, [editor])


    const handleKeyPress = useCallback((event: KeyboardEvent) => {

            console.log(event.key)

         if (event.ctrlKey && event.shiftKey && event.key == "X") {
            event.preventDefault()
            handleInsertTwitterButton();
        }

        if (event.ctrlKey && event.shiftKey && event.key == "G") {
            event.preventDefault()
            handleInsertImageViewerButton();
        }

        if (event.ctrlKey && event.shiftKey && event.key == "Y") {
            event.preventDefault()
            handleInsertYoutubeButton();
        }

    }, [editor]);

    useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress);

        // remove the event listener
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);


    return (
        <div className={styles["main-container"]}>
            <div className={styles["tools-container"]}>
                <div>
                    <button
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        disabled={
                            !editor?.can()
                                .chain()
                                .focus()
                                .toggleBold()
                                .run()
                        }
                        className={editor?.isActive('bold') ? styles["is-active"] : '' + " " + styles["btn-style"]}
                    >
                        B
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        disabled={
                            !editor?.can()
                                .chain()
                                .focus()
                                .toggleItalic()
                                .run()
                        }
                        className={editor?.isActive('italic') ? styles["is-active"] : '' + " " + styles["btn-style"]}
                    >
                        I
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleUnderline().run()}
                        disabled={
                            !editor?.can()
                                .chain()
                                .focus()
                                .toggleUnderline()
                                .run()
                        }
                        className={editor?.isActive('underline') ? styles["is-active"] : '' + " " + styles["btn-style"]}
                    >
                        <u>U</u>
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => editor?.chain().focus().toggleHeading({level: 1}).run()}
                        disabled={
                            !editor?.can()
                                .chain()
                                .focus()
                                .toggleHeading({level: 1})
                                .run()
                        }
                        className={editor?.isActive('heading', {level: 1}) ? styles["is-active"] : '' + " " + styles["btn-style"]}
                    >
                        H1
                    </button>
                </div>
                <div>
                    <input
                        type="color"
                        onInput={event => editor?.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
                        value={editor?.getAttributes('textStyle').color}
                    />
                    <button
                        onClick={() => editor?.chain().focus().toggleHighlight().run()}
                        className={editor?.isActive('highlight') ? styles["is-active"] : '' + " " + styles["btn-style"]}
                    >
                        <mark>A</mark>
                    </button>
                    <button onClick={
                        () => {
                            editor?.commands.setFontFamily('Inter')
                        }
                    }>
                        Font Test
                    </button>
                </div>
                <div>
                    <button onClick={addImage}>Add Image</button>
                    <button onClick={() => {
                        editor?.commands.setHorizontalRule()
                    }}>Add Ruller
                    </button>
                    <button onClick={handleInsertYoutubeButton}>
                        Youtube Video
                    </button>
                    <button onClick={handleInsertTwitterButton}>
                        Add Tweet
                    </button>

                    <button onClick={handleInsertImageViewerButton}>
                        Add Image Viewer
                    </button>
                </div>
            </div>

            <div className={styles["editor-container"]}>
                <EditorContent editor={editor}/>
            </div>
            <div className={styles["editor-other-info"]}>
                {editor?.storage.characterCount.characters()} Characters<br/>
                {editor?.storage.characterCount.words()} Words
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


        </div>
    )
}