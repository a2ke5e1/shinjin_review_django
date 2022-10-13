import {mergeAttributes, Node, nodePasteRule} from '@tiptap/core'
import {ReactNodeViewRenderer} from "@tiptap/react";
import twitterComponent from "./TwitterComponent";


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        twitter: {
            /**
             * Add an twitter
             */
            setUrl: (options: { src: string }) => ReturnType,
        }
    }
}

export const Twitter = Node.create({
    name: 'twitter',
    group: 'block',
    atom: true,
    draggable: true,

    addAttributes() {
        return {
            src: {
                default: null,
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
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'react-component',
            },
        ]
    },

    renderHTML({HTMLAttributes}) {
        return ['react-component', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return ReactNodeViewRenderer(twitterComponent)
    },


})