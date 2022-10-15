import {IconButton, Tooltip} from "@mui/material";
import {FormatAlignCenter, FormatAlignJustify, FormatAlignLeft, FormatAlignRight} from "@mui/icons-material";
import {Editor} from "@tiptap/react";

export interface ToolbarToolsProps {
    editor: Editor | null
}

const TextAlignmentContainer = ({editor}: ToolbarToolsProps) => {
    return (
        <>
            <Tooltip title={"Align Left"}>
                <IconButton onClick={() => editor?.commands.setTextAlign('left')}>
                    <FormatAlignLeft/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Align Center"}>
                <IconButton onClick={() => editor?.commands.setTextAlign('center')}>
                    <FormatAlignCenter/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Align Right"}>
                <IconButton onClick={() => editor?.commands.setTextAlign('right')}>
                    <FormatAlignRight/>
                </IconButton>
            </Tooltip>
            <Tooltip title={"Jutify"}>
                <IconButton onClick={() => editor?.commands.setTextAlign('justify')}>
                    <FormatAlignJustify/>
                </IconButton>
            </Tooltip>
        </>
    )
}

export default TextAlignmentContainer;