
import React, { useEffect, useRef } from "react";
import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Box,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { FieldType, PerformanceDefaultData } from "./DefaultRhfData";
import dynamic from "next/dynamic";
// import EditorForCreateArticle from "@/Component/Editor/EditorForCreateArticle";

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
          {/* <Typography sx={{fontSize:25,fontWeight:600}}>Performance</Typography> */}
          {/* <Grid gap={1} container>
            {fields.map((field, index) => (
              <Grid
                xs={3.8}
                key={field.id}
                sx={{ mb: 2, border: "1px solid gray", p: 1 }}
              >
               <Box sx={{display:"flex",alignItems:"center"}}>
               <TextField
                  {...register(`${rhfArrayName}.${index}.key` as const)}
                  label="Key"
                  sx={{bgcolor:"#fff5f7"}}
                  variant="outlined"
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  fullWidth
                  size="small"
                />
                {index === 0 ? null : (
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveField(index)}
                    sx={{ mt: 1 }}
                  >
                    <RemoveCircle />
                  </IconButton>
                )}
               </Box>
                {field.value.map((value, valueIndex) => (
                  <Box
                    key={`${index}-${valueIndex}`}
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      mt: 1,
                    }}
                  >
                    <TextField
                    sx={{bgcolor:"#eafce8"}}
                      {...register(
                        `${rhfArrayName}.${index}.value.${valueIndex}` as const
                      )}
                      label={`Value ${valueIndex + 1}`}
                      variant="outlined"
                      fullWidth
                      size="small"
                    />

                    <Box sx={{ display: "flex" }}>
                      {valueIndex === field.value.length - 1 && (
                        <IconButton
                          color="primary"
                          onClick={() => handleAddValue(index)}
                        >
                          <AddCircle />
                        </IconButton>
                      )}
                      {valueIndex !== 0 && (
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveValue(index, valueIndex)}
                        >
                          <RemoveCircle />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                ))}
                
              </Grid>
            ))}
          </Grid>
          <IconButton color="primary" onClick={handleAddField}>
            <AddCircle />
          </IconButton> */}
        </Box>
      
  );
};

export default DynamicForm;
