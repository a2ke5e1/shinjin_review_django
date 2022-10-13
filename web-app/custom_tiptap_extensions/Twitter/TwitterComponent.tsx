import {NodeViewWrapper} from '@tiptap/react'
import React from 'react'
import {Tweet} from 'react-twitter-widgets'

// @ts-ignore
// eslint-disable-next-line react/display-name
export default props => {
    const increase = () => {
        props.updateAttributes({
            count: props.node.attrs.count + 1,
        })
    }

    return (
        <NodeViewWrapper className="react-component">
            <div className="content">
                <Tweet tweetId={"1580292557145505793"} />
            </div>
        </NodeViewWrapper>
    )
}