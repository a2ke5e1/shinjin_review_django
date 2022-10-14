import {EditorContent, useEditor} from '@tiptap/react'
import styles from "../styles/Editor.module.css"
import {useCallback, useRef, useState} from "react";
import Extensions from "./TipTapExtensions"
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";


export default function Tiptap() {

    const [open, setOpen] = useState(false);
    const [tweetID, setTweetID] = useState<string>("");

    const handleTweetTextChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        e.preventDefault()
        setTweetID(e.target.value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = ()=> {
        setTweetID("");
        handleClose();
    }

    const handleSubmit = () => {
        handleClose();
        if (editor == null) {
            return;
        }
        editor.chain().focus().setUrl({src: tweetID, align: "center"}).run();
    }

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


    const addImage = useCallback(() => {
        const url = window.prompt('URL')

        if (url) {
            editor?.chain().focus().setImage({src: url}).run()
        }
    }, [editor])


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
                    <button onClick={() => {
                        editor?.commands.setYoutubeVideo({
                            src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        })
                    }}>
                        Youtube Video
                    </button>
                    <button onClick={
                       handleClickOpen
                    }>
                        Add Tweet
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


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Tweet</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb : 2 }}>
                        Enter the tweet ID of the tweet that you want to embed.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Tweet ID"
                        type="text"
                        fullWidth
                        onChange={handleTweetTextChange}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="text" color="inherit" onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSubmit}>Insert</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}