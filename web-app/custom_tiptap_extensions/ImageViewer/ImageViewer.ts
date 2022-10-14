import {mergeAttributes, Node, nodePasteRule} from '@tiptap/core'
import {ReactNodeViewRenderer} from "@tiptap/react";
import imageViewerComponent from "./ImageViewerComponent";

export interface ImageProps {
    url: string
    alt: string
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        imageViewer: {
            /**
             * Add  a Image Viewer
             */
            setImageViewerURLS: (options: { src: Array<ImageProps> }) => ReturnType,
        }
    }
}

export const ImageViewer = Node.create({
    name: 'image-viewer',
    group: 'block',
    draggable: true,

    addAttributes() {
        return {
            src: {
                default: [
                    {
                        url: "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                        alt: "TEST 1"
                    },
                    {
                        url: "https://images.unsplash.com/photo-1665731372479-551841cac2c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                        alt: "TEST 2"
                    }
                ],
            }
        }
    },

    addCommands() {
        return {
            setImageViewerURLS: options => ({commands}) => {
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
                tag: 'image-viewer-embed',
            },
        ]
    },

    renderHTML({HTMLAttributes}) {
        return ['image-viewer-embed', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return ReactNodeViewRenderer(imageViewerComponent)
    },


})