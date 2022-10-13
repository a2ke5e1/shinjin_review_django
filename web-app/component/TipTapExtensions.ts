import {Document} from "@tiptap/extension-document";
import StarterKit from "@tiptap/starter-kit";
import {Link} from "@tiptap/extension-link";
import {Underline} from "@tiptap/extension-underline";
import {TextStyle} from "@tiptap/extension-text-style";
import {Highlight} from "@tiptap/extension-highlight";
import {TextAlign} from "@tiptap/extension-text-align";
import {Color} from "@tiptap/extension-color";
import {Image} from "@tiptap/extension-image";
import styles from "../styles/Editor.module.css";
import {Youtube} from "@tiptap/extension-youtube";
import {FontFamily} from "@tiptap/extension-font-family";
import {CharacterCount} from "@tiptap/extension-character-count";
import {Placeholder} from "@tiptap/extension-placeholder";
import {Twitter} from "../custom_tiptap_extensions/Twitter/twitter";

const CustomDocument = Document.extend({
    content: 'heading horizontalRule paragraph  block*',
})


export default [
    CustomDocument,
    StarterKit.configure({
        document: false
    }),
    Link,
    Underline,
    TextStyle,
    Highlight.configure(
        {
            multicolor: true
        }
    ),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    Color,
    Image.configure({
        inline: true,
        HTMLAttributes: {
            class: styles["img"],
        }
    }),
    Youtube.configure({
        inline: false,
        HTMLAttributes: {
            class: styles["yt-player"],
        }
    }),
    FontFamily.configure({
        types: ['textStyle'],
    }),
    CharacterCount,
    Placeholder.configure({
        placeholder: ({node}) => {
            if (node.type.name === 'heading') {
                return 'What’s the title?'
            }

            return 'Content?'
        },
    }),
    Twitter


]