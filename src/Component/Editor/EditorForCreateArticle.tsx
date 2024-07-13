import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Paragraph from '@editorjs/paragraph';
import Header from "@editorjs/header";
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import axios from "axios"; 
import { ResizableImageTool } from "./EditorImage";
import { Container } from "@mui/material";
import Delimiter from '@editorjs/delimiter';
import Marker from "@editorjs/marker";


const EditorForCreateArticle = ({editorRef,holderId}:{editorRef: any,holderId?:string}) => {

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: holderId ? `editorjs-${holderId}` : `editorjs`,
        tools: {
            paragraph: {
              class: Paragraph as any,
              inlineToolbar: true
            },
          header: {
            class: Header as any,
            inlineToolbar: true,
          },

          table: {
            class: Table as any,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
          // Inside your Editor.js initialization
          image: {
            class: ResizableImageTool as any,
            // class: ImageTool as any,
            inlineToolbar: ['link'],
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const formData = new FormData(); 
                  formData.append("file", file); 
                  
                  try {
                    const response = await axios.post(
                      `/api/v1/image/upload`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );

                    if (response.data.success === 1) {
                      return response.data;
                    } else {
                      throw new Error("Upload failed");
                    }
                  } catch (error) {
                    console.error("Error uploading file:", error);
                    throw error;
                  }
                },
                async uploadByUrl(url:any) {
                  const data = {
                    url
                  }
                  const response = await axios.post(
                    `/api/v1/image/upload/byUrl`, 
                    data,
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
  
                  if (response.data.success === 1) {
                    return response.data;
                  }
                },
              },
            },
          }, 
          list: {
            class: List as any,
            inlineToolbar: true,
          },
          // quote: {
          //   class: Quote as any,
          //   inlineToolbar: true,
          // },
          delimiter: {
            class: Delimiter as any,          
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+ENTER',
          },
          marker: {
            class: Marker as any,
            inlineToolbar: true,
          },
        },
        onReady: () => {
          console.log("Editor.js is ready to work!");
        },
        onChange: (api, event) => {
          console.log(api, "Now I know that Editor's content changed!", event);
        },
      });
    }

    // return () => {
    //   if (editorRef.current) {
    //     // (editorRef.current as EditorJS)?.destroy();
    //     editorRef.current = null;
    //   }
    // };
  }, [editorRef]);
  // const handleSave = async () => {
  //   try {
  //     const savedData = await editorRef.current?.save(); // Get the content from Editor.js
  //     console.log("Saved Data:", savedData);
  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //   }
  // };
  return (
    <>
      <Container
        id={holderId ? `editorjs-${holderId}` : `editorjs`}
        sx={{
          padding: "10px",
          border: "5px solid #ccc",
          borderRadius: "4px",
          width:{
            xs: "95%",
            md: "600%",
          }, 
          margin:"auto"
        }}
      /> 
    </>
  );
};

export default EditorForCreateArticle;
