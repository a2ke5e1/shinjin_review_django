import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import React, {Dispatch, SetStateAction, useState} from "react";
import {Editor} from "@tiptap/react";


interface InsertDialogBoxProps {
    editor: Editor | null,
    getState: boolean,
    setState: any,
    title: String
    message: String,
    label: String,
    insertBlock: 'twitter' | 'youtube'
}


export default function InsertDialogBox({editor, getState, setState, title, message, label, insertBlock}: InsertDialogBoxProps) {

    const [tweetID, setTweetID] = useState<string>("");

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setTweetID(e.target.value);
    }

    const handleClose = () => {
        setState(false);
    };

    const handleCancel = () => {
        setTweetID("");
        handleClose();
    }

    const handleSubmit = () => {
        handleClose();
        if (editor == null) {
            return;
        }
        switch (insertBlock) {
            case "twitter":
                editor.chain().focus().setUrl({src: tweetID, align: "center"}).run();
                break;
            case "youtube":
                editor.commands.setYoutubeVideo({
                    src: tweetID
                })
                break;
            default:
        }
    }

    return (
        <Dialog open={getState} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{mb: 2}}>
                    {message}
                </DialogContentText>
                <TextField
                    autoFocus
                    tabIndex={0}
                    margin="dense"
                    id="name"
                    label={label}
                    type="text"
                    fullWidth
                    onChange={handleTextChange}
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button tabIndex={2} variant="text" color="inherit" onClick={handleCancel}>Cancel</Button>
                <Button tabIndex={1} onClick={handleSubmit}>Insert</Button>
            </DialogActions>
        </Dialog>
    )
}