import {EditorContent, useEditor} from '@tiptap/react';
import styles from "../../styles/Editor.module.css";
import {useCallback, useEffect, useState} from "react";
import Extensions from "./TipTapExtensions";
import InsertDialogBox from "../DialogBox/InsertDialogBox";
import {IconButton} from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import CollectionsIcon from '@mui/icons-material/Collections';
import ImageIcon from '@mui/icons-material/Image';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import {
    FormatAlignCenter,
    FormatAlignJustify,
    FormatAlignLeft,
    FormatAlignRight,
    InsertLink
} from "@mui/icons-material";


export default function Tiptap() {
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
    const [textColor, setTextColor] = useState('#000000');


    const handleInsertTwitterButton = () => {
        setTwitterDialogBoxOpen(true);
    }
    const handleInsertLinkButton = () => {
        setLinkDialogBoxOpen(true);
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
    const handleChangeTextColor = (color: string) => {
        editor?.chain().focus().setColor(color).run()
        setTextColor(color)
    }
    const handleKeyPress = useCallback((event: KeyboardEvent) => {

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
    const addImage = useCallback(() => {
        const url = window.prompt('URL')

        if (url) {
            editor?.chain().focus().setImage({src: url}).run()
        }
    }, [editor])

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
                    <IconButton onClick={() => editor?.chain().focus().toggleBold().run()} sx={{
                        color: editor?.isActive('bold') ? "black" : ""
                    }} disabled={!editor?.can().chain().focus().toggleBold().run()} aria-label="Make Text Bold">
                        <FormatBoldIcon/>
                    </IconButton>
                    <IconButton onClick={() => editor?.chain().focus().toggleItalic().run()} sx={{
                        color: editor?.isActive('italic') ? "black" : ""
                    }} disabled={!editor?.can().chain().focus().toggleItalic().run()} aria-label="Make Text Italic">
                        <FormatItalicIcon/>
                    </IconButton>
                    <IconButton onClick={() => editor?.chain().focus().toggleUnderline().run()} sx={{
                        color: editor?.isActive('underline') ? "black" : ""
                    }} disabled={!editor?.can().chain().focus().toggleUnderline().run()}
                                aria-label="Make Text Underline">
                        <FormatUnderlinedIcon/>
                    </IconButton>
                </div>
                <div>
                    <IconButton onClick={() => editor?.commands.setTextAlign('left')}>
                        <FormatAlignLeft/>
                    </IconButton>
                    <IconButton onClick={() => editor?.commands.setTextAlign('center')}>
                        <FormatAlignCenter/>
                    </IconButton>
                    <IconButton onClick={() => editor?.commands.setTextAlign('right')}>
                        <FormatAlignRight/>
                    </IconButton>
                    <IconButton onClick={() => editor?.commands.setTextAlign('justify')}>
                        <FormatAlignJustify/>
                    </IconButton>
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
                        id={"co"}
                        onInput={(event) => {
                            handleChangeTextColor((event.target as HTMLInputElement).value)
                        }}
                        onClick={(event) => {
                            handleChangeTextColor(textColor)
                        }}
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
                    <IconButton onClick={handleInsertLinkButton} sx={{
                        color: editor?.isActive('link') ? "black" : ""
                    }}>
                        <InsertLink/>
                    </IconButton>
                    <IconButton onClick={() => editor?.commands.setHorizontalRule()} aria-label="Add Horizontal Rule">
                        <HorizontalRuleIcon/>
                    </IconButton>
                    <IconButton onClick={handleInsertYoutubeButton} aria-label="Add Youtube Video">
                        <YouTubeIcon/>
                    </IconButton>
                    <IconButton onClick={handleInsertTwitterButton} aria-label="Add Tweets">
                        <TwitterIcon/>
                    </IconButton>
                    <IconButton onClick={addImage} aria-label="Add Image">
                        <ImageIcon/>
                    </IconButton>
                    <IconButton onClick={handleInsertImageViewerButton} aria-label="Add Images">
                        <CollectionsIcon/>
                    </IconButton>


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
            <InsertDialogBox
                editor={editor}
                getState={linkDialogBoxOpen}
                setState={setLinkDialogBoxOpen}
                title={"Insert Link"}
                message={""}
                label={"URL"}
                insertBlock="link"
            />


        </div>
    )
}