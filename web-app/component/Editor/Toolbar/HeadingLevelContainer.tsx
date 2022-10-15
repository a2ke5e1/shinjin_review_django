import {IconButton, Tooltip} from "@mui/material";
import {ToolbarToolsProps} from "./TextAlignmentContainer";
import {Level} from "@tiptap/extension-heading";
import {Fragment} from "react";
import FormatH1Icon from "../../CustomIcons/FormatH1Icon";
import FormatH2Icon from "../../CustomIcons/FormatH2Icon";
import FormatH3Icon from "../../CustomIcons/FormatH3Icon";
import FormatH4Icon from "../../CustomIcons/FormatH4Icon";
import FormatH5Icon from "../../CustomIcons/FormatH5Icon";
import FormatH6Icon from "../../CustomIcons/FormatH6Icon";


const HeadingLevelContainer = ({editor}: ToolbarToolsProps) => {

    const Headings = [
        <FormatH1Icon key={1}/>,
        <FormatH2Icon key={2}/>,
        <FormatH3Icon key={3}/>,
        <FormatH4Icon key={4}/>,
        <FormatH5Icon key={5}/>,
        <FormatH6Icon key={6}/>
    ]

    return (
        <>
            {
                Headings.map((value, index) => {
                    const hLevel = (index + 1) as Level
                    return (
                        <Fragment key={index}>
                            <Tooltip title={`Heading ${hLevel}`}>
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
                            </Tooltip>
                        </Fragment>
                    )
                })
            }
        </>
    )

}


export default HeadingLevelContainer;