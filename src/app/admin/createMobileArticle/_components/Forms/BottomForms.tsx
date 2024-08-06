
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
    defaultEditorData:any;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ editorRef,holderId ,defaultEditorData}) => {
     
   console.log('this is the dynamic form data  defaultEditorData   ', defaultEditorData)
  return (
        <Box sx={{ mb: 2 }}>
            <Editor isMobileArticle holderId={holderId} editorRef={editorRef} defaultData={defaultEditorData} />  
        </Box>
      
  );
};

export default DynamicForm;
