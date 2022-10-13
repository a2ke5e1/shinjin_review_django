import {mergeAttributes, Node, nodePasteRule} from '@tiptap/core'
import {ReactNodeViewRenderer} from "@tiptap/react";
import twitterComponent from "./TwitterComponent";


declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    twitter: {
      /**
       * Add an twitter
       */
      setUrl: () => ReturnType,
    }
  }
}

export const Twitter = Node.create({
    name: 'twitter',
    group: 'block',
    atom: true,

    addAttributes() {
        return {
            count: {
                default: 0,
            },
        }
    },

    addCommands() {
        return {
            setUrl: ( { commands})=> {
                return commands.insertContent( {
                    type: this.name
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