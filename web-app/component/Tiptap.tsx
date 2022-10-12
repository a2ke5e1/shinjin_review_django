import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Link} from "@tiptap/extension-link"
import styles from "../styles/Editor.module.css"
import {Underline} from "@tiptap/extension-underline";
import {TextAlign} from "@tiptap/extension-text-align";
import {Color} from "@tiptap/extension-color";
import {TextStyle} from "@tiptap/extension-text-style";
import {Highlight} from "@tiptap/extension-highlight";
import {Image} from "@tiptap/extension-image";
import {Document} from "@tiptap/extension-document";
import {useCallback, useState} from "react";
import {Youtube} from "@tiptap/extension-youtube";
import {FontFamily} from "@tiptap/extension-font-family";
import {CharacterCount} from "@tiptap/extension-character-count";
import {Placeholder} from "@tiptap/extension-placeholder";


interface TiptapProps {
    readonly: boolean
    content: any
}


export default function Tiptap({readonly, content}: TiptapProps) {


    const [ editable, setEditable ] = useState(!readonly)




    const CustomDocument = Document.extend({
        content: 'heading horizontalRule paragraph block*',
    })

    const editor = useEditor({
        editable,
        extensions: [
            CustomDocument,
            StarterKit.configure({
                document: false
            }),
            Link,
            Underline,
            TextStyle,
            Highlight.configure(
                {
                    multicolor: true
                }
            ),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Color,
            Image.configure({
                inline: true,
                HTMLAttributes: {
                    class: styles["img"],
                }
            }),
            Youtube.configure({
                inline: false,
                HTMLAttributes: {
                    class: styles["yt-player"],
                }
            }),
            FontFamily.configure({
                types: ['textStyle'],
            }),
            CharacterCount,
            Placeholder.configure({
                placeholder: ({node}) => {
                    if (node.type.name === 'heading') {
                        return 'What’s the title?'
                    }

                    return 'Content?'
                },
            })


        ],
        injectCSS: false,
        content: content,
        onUpdate: ({editor}) => {
            if (!readonly) {
                const json = editor.getJSON()
                window.localStorage.setItem("docs", JSON.stringify(json))
            }
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
            { editable && <div>
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
            </div> }

            <EditorContent  className={editable ? "" : "test" } editor={editor}/>


        </>
    )
}