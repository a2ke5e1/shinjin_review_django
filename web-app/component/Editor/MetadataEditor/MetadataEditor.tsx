import {Editor} from "@tiptap/react";
import {Box, Button, Card, CardActions, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import styles from './metadata.module.scss'
import React, {useMemo} from "react";

interface MetadataEditorProps {
  editor: Editor,
}

const MetadataEditor = ({editor}: MetadataEditorProps) => {

  const [categories, setCategories] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategories(event.target.value as string);
  };

  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 2, mr: 2}}>
      <Box sx={{display: "flex", flexDirection: "row", gap: 2}}>
        <Button variant="contained">Publish</Button>
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
                     InputLabelProps={{shrink: true}}
          />
          <TextField fullWidth label="Description" variant="outlined" multiline
                     InputLabelProps={{shrink: true}}
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
              value={categories}
              label="Categories"
              onChange={handleChange}
            >
              <MenuItem value={4}>Video Games</MenuItem>
              <MenuItem value={5}>Technology</MenuItem>
              <MenuItem value={6}>Game Zone</MenuItem>
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