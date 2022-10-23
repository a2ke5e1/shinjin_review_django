import {Editor} from "@tiptap/react";
import {Box, Button, Card, CardActions, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import styles from './metadata.module.scss'
import React, {useMemo} from "react";
import CategoriesProps from "../../../props/CategoryProps";
import Link from "next/link";

interface MetadataEditorProps {
  editor: Editor,
  categories: Array<CategoriesProps>
  title: string,
  category: string,
  handleTitleChange: any,
  handleCategoriesChanges: any,

  handlePublishButton: any

}

const MetadataEditor = ({
                          editor,
                          categories,
                          title,
                          handleTitleChange,
                          category,
                          handleCategoriesChanges,
                          handlePublishButton
                        }: MetadataEditorProps) => {


  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 2, mr: 2}}>
      <Box sx={{display: "flex", flexDirection: "row", gap: 2}}>
        <Button onClick={handlePublishButton} variant="contained">Publish</Button>
        <Button variant="outlined" color="secondary">Save as Draft</Button>
      </Box>
      <Card elevation={0} variant="outlined" sx={{backgroundColor: "editor.toolbar", borderColor: 'editor.stroke', borderRadius: 5}}>
        <CardMedia
          component="img"
          height="200"
          image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <TextField fullWidth label="Title" variant="outlined"
                     placeholder={"Write a title"}
                     value={title}
                     onChange={handleTitleChange}
                     InputLabelProps={{shrink: true}}
          />
          <TextField fullWidth label="Description" variant="outlined" multiline
                     InputLabelProps={{shrink: true}}
                     placeholder={"Write a short description."}
                     rows={4} sx={{mt: 2}}/>
        </CardContent>
      </Card>
      <Card elevation={0} variant="outlined" sx={{backgroundColor: "editor.toolbar", borderColor: 'editor.stroke', borderRadius: 5, pt: 1}}>
        <CardContent>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Categories"
              onChange={handleCategoriesChanges}
            >
              {categories.map((element: CategoriesProps) => {
                return (
                  <MenuItem key={element.id} value={element.url}>
                    {element.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      <Card elevation={0} variant="outlined" sx={{backgroundColor: "editor.toolbar", borderColor: 'editor.stroke', borderRadius: 5, pt: 1}}>
        <CardContent>
          <TextField fullWidth label="Post URL" variant="outlined"
                     InputLabelProps={{shrink: true}}
          />
        </CardContent>
      </Card>
    </Box>
  )
}
export default MetadataEditor;