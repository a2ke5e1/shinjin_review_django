import React, {useState, useRef, useMemo} from 'react'
import JoditEditor from 'jodit-react'
import parse from 'html-react-parser';
import parser from "html-react-parser";


// @ts-ignore
export default function TestEditor({content, setContent}) {


    const editor = useRef(null)
    const test = parse(content)


    return (
        <>
            <JoditEditor ref={editor} value={content} onChange={newContent => {
                setContent(newContent)
            }}/>

            {
                parser(content)
            }
        </>
    )

}