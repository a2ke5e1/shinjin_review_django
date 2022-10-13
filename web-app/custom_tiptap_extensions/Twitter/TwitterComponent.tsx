import {NodeViewWrapper} from '@tiptap/react'
import React from 'react'
import {Tweet} from 'react-twitter-widgets'

// @ts-ignore
// eslint-disable-next-line react/display-name
export default props => {


    return (
        <NodeViewWrapper className="react-component">
            <div className="content">
                <Tweet tweetId={props.node.attrs.src}
                    options={{ align: props.node.attrs.align }}
                />
            </div>
        </NodeViewWrapper>
    )
}