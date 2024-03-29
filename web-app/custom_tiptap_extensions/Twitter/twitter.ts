import {mergeAttributes, Node, nodePasteRule} from '@tiptap/core'
import {ReactNodeViewRenderer} from "@tiptap/react";
import twitterComponent from "./TwitterComponent";


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        twitter: {
            /**
             * Add an twitter
             */
            setUrl: (options: { src: string, align: string }) => ReturnType,
        }
    }
}

export const Twitter = Node.create({
    name: 'twitter',
    group: 'block',
    draggable: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
            align: {
                default: "center",
            },
        }
    },

    addCommands() {
        return {
            setUrl: options => ({commands}) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: options
                })
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'twitter-embed',
            },
        ]
    },

    renderHTML({HTMLAttributes}) {
        return ['twitter-embed', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return ReactNodeViewRenderer(twitterComponent)
    },


})