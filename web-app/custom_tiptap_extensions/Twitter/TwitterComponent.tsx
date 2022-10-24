import {NodeViewWrapper} from '@tiptap/react'
import React from 'react'
import {Tweet} from 'react-twitter-widgets'
import {useTheme} from "@mui/material";

// @ts-ignore
// eslint-disable-next-line react/display-name
export default props => {


    return (
        <NodeViewWrapper draggable="true"  data-drag-handle="" className="twitter-embed">
            <div className="content">
                <Tweet tweetId={props.node.attrs.src}
                    options={{ align: props.node.attrs.align, theme: useTheme().palette.mode }}
                />
            </div>
        </NodeViewWrapper>
    )
}