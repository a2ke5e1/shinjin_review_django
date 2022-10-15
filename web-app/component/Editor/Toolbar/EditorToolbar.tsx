import styles from "./EditorToolbar.module.scss";
import {FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import {
    FormatAlignCenter,
    FormatAlignJustify,
    FormatAlignLeft,
    FormatAlignRight, FormatColorReset, FormatColorText, FormatStrikethrough,
    InsertLink
} from "@mui/icons-material";
import {Level} from "@tiptap/extension-heading";
import {Fragment, useCallback, useEffect, useRef, useState} from "react";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import ImageIcon from "@mui/icons-material/Image";
import CollectionsIcon from "@mui/icons-material/Collections";
import {Editor} from "@tiptap/react";
import FormatH1Icon from "../../CustomIcons/FormatH1Icon";
import FormatH2Icon from "../../CustomIcons/FormatH2Icon";
import FormatH3Icon from "../../CustomIcons/FormatH3Icon";
import FormatH4Icon from "../../CustomIcons/FormatH4Icon";
import FormatH5Icon from "../../CustomIcons/FormatH5Icon";
import FormatH6Icon from "../../CustomIcons/FormatH6Icon";
import BorderColorIcon from '@mui/icons-material/BorderColor';

interface EditorToolbarProps {
    editor: Editor
    setTwitterDialogBoxOpen: any,
    setYoutubeDialogBoxOpen: any,
    setLinkDialogBoxOpen: any,
}


const EditorToolbar = ({
                           editor,
                           setTwitterDialogBoxOpen,
                           setYoutubeDialogBoxOpen,
                           setLinkDialogBoxOpen
                       }: EditorToolbarProps) => {


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

    const Headings = [
        <FormatH1Icon key={1}/>,
        <FormatH2Icon key={2}/>,
        <FormatH3Icon key={3}/>,
        <FormatH4Icon key={4}/>,
        <FormatH5Icon key={5}/>,
        <FormatH6Icon key={6}/>
    ]


    const fontList = [
        {label: "Sans-serif", value: "sans-serif"},
        {label: "Inter", value: "Inter"},
        {label: "Oswald", value: "Oswald"},
        {label: "Quicksand", value: "Quicksand"},
        {label: "Roboto", value: "Roboto"},
        {label: "Roboto Condensed", value: "Roboto Condensed"},
        {label: "Roboto Slab", value: "Roboto Slab"},
        {label: "Ubuntu", value: "Ubuntu"}
    ];

    const [selectedFont, setSelectedFont] = useState(fontList[0].value);


    const handleChange = (event: SelectChangeEvent) => {
        event.preventDefault()
        setSelectedFont(event.target.value as string);
        editor?.commands.setFontFamily(event.target.value as string);
    };

    fontList.map((value) => {
        if (editor?.isActive('textStyle', {fontFamily: value.value}) && value.value != selectedFont) {
            setSelectedFont(value.value)
        }
    })

    useEffect(() => {
        if (editor == null || editor?.commands == null) {
            return;
        }
        editor.commands.setFontFamily('sans-serif');
    }, [editor])

    return (
        <div className={styles["tools-container"]}>

            <div>
                <FormControl sx={{mt: 2}}>
                    <InputLabel id="demo-simple-select-label">Font Family</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedFont}
                        label="Font Family"
                        onChange={handleChange}
                    >
                        {fontList.map((value) => {
                            return <MenuItem key={value.label} value={value.value} sx={{
                                fontFamily: value.value
                            }}>{value.label}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
            </div>
            <div>
                <div>
                    <input
                        type="color"
                        onInput={(event) => {
                            handleChangeTextColor((event.target as HTMLInputElement).value)
                        }}
                        value={editor?.getAttributes('textStyle').color == null ? "l000" : editor?.getAttributes('textStyle').color}
                    />
                    <input
                        type="color"
                        onInput={(event) => {
                            editor.chain().focus().toggleHighlight({color: (event.target as HTMLInputElement).value}).run()
                        }}
                        value={editor?.getAttributes('highlight').color == null ? "#ffff00" : editor?.getAttributes('highlight').color}
                    />
                    <IconButton onClick={() => {
                        editor?.commands.unsetColor()
                    }}>
                        <FormatColorReset/>
                    </IconButton>
                    <IconButton
                        onClick={() => editor?.chain().focus().toggleHighlight().run()}
                        sx={{
                            color: editor?.isActive('highlight') ? editor?.getAttributes('highlight').color == null ? "#ffff00" : editor?.getAttributes('highlight').color : ""
                        }}
                    >
                        <BorderColorIcon/>
                    </IconButton>
                </div>
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
                    <IconButton onClick={() => editor?.chain().focus().toggleStrike().run()} sx={{
                        color: editor?.isActive('strike') ? "black" : ""
                    }} disabled={!editor?.can().chain().focus().toggleUnderline().run()}
                                aria-label="Strike Text">
                        <FormatStrikethrough/>
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
                    {
                        Headings.map((value, index) => {
                            const hLevel = (index + 1) as Level
                            return (
                                <Fragment key={index}>
                                    <IconButton

                                        onClick={
                                            () => editor?.chain().focus().toggleHeading({level: hLevel}).run()
                                        }
                                        disabled={
                                            !editor?.can()
                                                .chain()
                                                .focus()
                                                .toggleHeading({level: hLevel})
                                                .run()
                                        }
                                        sx={{
                                            color: editor?.isActive('heading', {level: hLevel}) ? "black" : ""
                                        }}
                                    >
                                        {value}
                                    </IconButton>
                                </Fragment>
                            )
                        })
                    }
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
        </div>
    )
}

export default EditorToolbar;