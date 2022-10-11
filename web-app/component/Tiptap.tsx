import {useEditor, EditorContent, EditorContentState} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Link} from "@tiptap/extension-link"
import styles from "../styles/Editor.module.css"
import {Underline} from "@tiptap/extension-underline";
import {Heading} from "@tiptap/extension-heading";
import {TextAlign} from "@tiptap/extension-text-align";
import {Color} from "@tiptap/extension-color";
import {TextStyle} from "@tiptap/extension-text-style";
import {Highlight} from "@tiptap/extension-highlight";
import {Image} from "@tiptap/extension-image";
import {Paragraph} from "@tiptap/extension-paragraph";
import {Document} from "@tiptap/extension-document";
import {Dropcursor} from "@tiptap/extension-dropcursor";
import {useCallback, useEffect, useState} from "react";
import {HorizontalRule} from "@tiptap/extension-horizontal-rule";
import {Youtube} from "@tiptap/extension-youtube";
import {FontFamily} from "@tiptap/extension-font-family";
import {CharacterCount} from "@tiptap/extension-character-count";
import {Placeholder} from "@tiptap/extension-placeholder";


interface TiptapProps {
    readOnly: boolean
}


export default function Tiptap(
    {
        readOnly
    }: TiptapProps
) {

    const [editable] = useState(!readOnly)




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
            Heading,
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
            Paragraph,
            Dropcursor,
            HorizontalRule,
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


        onUpdate: ({editor}) => {
            const json = editor.getJSON()
            // send the content to an API here
            window.localStorage.setItem("docs", JSON.stringify(json))
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
                                    onInput={event => editor?.chain().focus().setColor(event.target.value).run()}
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

            <EditorContent editor={editor}/>


        </>
    )
}