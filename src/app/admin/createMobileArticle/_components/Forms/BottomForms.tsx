
import React from "react";
import {
  Box,
} from "@mui/material";
import dynamic from "next/dynamic";

const Editor = dynamic(
    () => import("@/Component/Editor/EditorForCreateArticle"),
    { ssr: false }
  );
  

type FormValues<T> = {
    [key: string]: T[];
  };

interface DynamicFormProps {
    editorRef:any;
    holderId:string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ editorRef,holderId }) => {
     
   
  return (
        <Box sx={{ mb: 2 }}>
            <Editor holderId={holderId} editorRef={editorRef} />
        </Box>
      
  );
};

export default DynamicForm;
