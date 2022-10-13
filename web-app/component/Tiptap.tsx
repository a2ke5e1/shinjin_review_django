import {EditorContent, useEditor} from '@tiptap/react'
import styles from "../styles/Editor.module.css"
import {useCallback} from "react";
import Extensions from "./TipTapExtensions"


export default function Tiptap() {


    const editor = useEditor({
        extensions: Extensions,
        content: '<h1>test</h1><hr><p>test</p><react-component count="0"></react-component>'
        ,
        onUpdate: ({editor}) => {
            const json = editor.getJSON()

            editor.get

            window.localStorage.setItem("docs", JSON.stringify(json))
            // @ts-ignore
            var t = ""
            json.content?.at(0).content.forEach (
                (e) => {
                    t += e.text
                }
            )
            window.localStorage.setItem("metadata", JSON.stringify(
                {
                    "title": t
                }
            ))

        }
    })


    const addImage = useCallback(() => {
        const url = window.prompt('URL')

        if (url) {
            editor?.chain().focus().setImage({src: url}).run()
        }
    }, [editor])




    return (
        <>
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
                    <button onClick={addImage}>Add Image</button>
                    <button onClick={() => {
                        editor?.commands.setHorizontalRule()
                    }}>Add Ruller
                    </button>
                    <button onClick={() => {
                        editor?.commands.setYoutubeVideo({
                            src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        })
                    }}>
                        Youtube Video
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
                    {editor?.storage.characterCount.characters()}
                </div>
            </div>
            <button onClick={
                ()=> {
                    editor?.commands.setUrl()
                }
            }>
                Test
            </button>

            <EditorContent editor={editor}/>


        </>
    )
}