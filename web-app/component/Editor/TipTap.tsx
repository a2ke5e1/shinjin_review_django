import {EditorContent, useEditor} from '@tiptap/react';
import styles from "../../styles/Editor.module.css";
import React, {useState} from "react";
import Extensions from "./TipTapExtensions";
import InsertDialogBox from "../DialogBox/InsertDialogBox";
import EditorToolbar from "./Toolbar/EditorToolbar";
import {Box, Paper, SelectChangeEvent, useMediaQuery} from "@mui/material";
import MetadataEditor from "./MetadataEditor/MetadataEditor";


export default function TipTap() {

  // All the information about the blog
  const [currentCategory, setCategory] = React.useState('');
  const [title, setTitle] = React.useState('');

  // Handles all the change of the information
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value as string);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };


  const editor = useEditor({
    extensions: Extensions,
    onUpdate: ({editor}) => {
      const json = editor.getJSON()
      window.localStorage.setItem("docs", JSON.stringify(json))
      // @ts-ignore
      var t = ""
      try {
        // @ts-ignore
        editor?.getJSON().content?.at(0).content.forEach(
          (e) => {
            t += e.text
          }
        )
      } catch (e) {

      }
      setTitle(t)
    }
  })

  const [twitterDialogBoxOpen, setTwitterDialogBoxOpen] = useState(false);
  const [youtubeDialogBoxOpen, setYoutubeDialogBoxOpen] = useState(false);
  const [linkDialogBoxOpen, setLinkDialogBoxOpen] = useState(false);


  if (editor == null) {
    return <></>
  }

  return (
    <>
      <Paper elevation={0}
             className={styles["main-container"]}
             sx={{
               backgroundColor: "editor.background"
             }}
      >
        <EditorToolbar editor={editor}
                       setLinkDialogBoxOpen={setLinkDialogBoxOpen}
                       setTwitterDialogBoxOpen={setTwitterDialogBoxOpen}
                       setYoutubeDialogBoxOpen={setYoutubeDialogBoxOpen}
        />
        <Paper elevation={4}
               sx={{
                 width: "55vw",
                 maxWidth: "50%",
                 minWidth: "550px"
               }}
        >

          <Paper elevation={0}
                 sx={{
                   backgroundColor: "editor.main"
                 }}
                 className={styles["editor-container"]}>
            <EditorContent editor={editor}/>
          </Paper>
        </Paper>
        <MetadataEditor editor={editor}
                        title={title}
                        handleTitleChange={handleTitleChange}
                        category={currentCategory}
                        handleCategoriesChanges={handleChange}
        />
      </Paper>
      <InsertDialogBox
        editor={editor}
        getState={twitterDialogBoxOpen}
        setState={setTwitterDialogBoxOpen}
        title={"Add Tweet"}
        message={"Enter the tweet ID of the tweet that you want to embed."}
        label={"Tweet ID"}
        insertBlock="twitter"
      />
      <InsertDialogBox
        editor={editor}
        getState={youtubeDialogBoxOpen}
        setState={setYoutubeDialogBoxOpen}
        title={"Add Youtube Video"}
        message={"Enter the youtube URL of the youtube video that you want to embed."}
        label={"URL"}
        insertBlock="youtube"
      />
      <InsertDialogBox
        editor={editor}
        getState={linkDialogBoxOpen}
        setState={setLinkDialogBoxOpen}
        title={"Insert Link"}
        message={""}
        label={"URL"}
        insertBlock="link"
      />
    </>
  )
}