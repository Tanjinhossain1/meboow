"use client";
import {
  Container,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

const Editor = dynamic(
  () => import("../../../Component/Editor/EditorForCreateArticle"),
  { ssr: false }
);

export default function CreateArticle() {
  
  const editorRef = useRef<EditorJS | null>(null);

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const fieldData = await editorRef.current?.save();
    const title = (event.target as any)?.title.value;
    const category = (event.target as any)?.category.value
    event.preventDefault();
    console.log(title,category,"submit data  " ,fieldData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} style={{width:'100%'}}>
       <Container sx={{   width: "90%", mx:"auto" }}>
       <FormControl 
          sx={{   my:2,width:"100%" }}
          variant="filled"
        >
          <InputLabel htmlFor="filled-adornment-amount">Title</InputLabel>
          <FilledInput
          name="title"
            id="filled-adornment-amount"
            placeholder="Title"
            startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 350 }}>
        <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={age}
          name="category"
          onChange={handleChange}
        > 
          <MenuItem value={'mobile'}>Mobile</MenuItem> 
        </Select>
      </FormControl>
       </Container>
       <button>submit</button>
      </form>
      <Editor editorRef={editorRef} />
    </div>
  );
}
