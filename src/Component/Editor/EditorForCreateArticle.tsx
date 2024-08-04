import React, { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import axios from "axios";
import { ResizableImageTool } from "./EditorImage";
import { Container } from "@mui/material";
import Delimiter from "@editorjs/delimiter";
import Marker from "@editorjs/marker"; 

const EditorForCreateArticle = ({
  editorRef,
  holderId,
  defaultData,
}: {
  editorRef: any;
  holderId?: string;
  defaultData?: any;
}) => {
  useEffect(() => {
    const initializeEditor = async () => {
      if (!editorRef.current) {
        const editorInstance = new EditorJS({
          // defaultBlock: defaultData?.blocks,
          data: defaultData,
          holder: holderId ? `editorjs-${holderId}` : `editorjs`,
          tools: {
            paragraph: {
              class: Paragraph as any,
              inlineToolbar: true,
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
            image: {
              class: ResizableImageTool as any,
              inlineToolbar: ["link"],
              config: {
                uploader: {
                  async uploadByFile(file: File) {
                    const formData = new FormData();
                    formData.append("file", file);

                    try {
                      const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/upload`,
                        formData,
                        {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        }
                      );

                      console.log("first upload successful ", response);
                      if (response.data.success === 1) {
                        return {
                          success: 1,
                          file: {
                            url: `${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${response.data.file?.url}`,
                          },
                        };
                      } else {
                        throw new Error("Upload failed");
                      }
                    } catch (error) {
                      console.error("Error uploading file:", error);
                      throw error;
                    }
                  },
                  async uploadByUrl(url: any) {
                    const data = {
                      url,
                    };
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
            delimiter: {
              class: Delimiter as any,
              inlineToolbar: true,
              shortcut: "CMD+SHIFT+ENTER",
            },
            marker: {
              class: Marker as any,
              inlineToolbar: true,
              toolbox:{data: {}}, 
            }, 
        
          },
          onReady: () => {
            console.log("Editor.js is ready to work!");
          },
          onChange: (api: any, event: any) => {
            console.log(
              api,
              "Now I know that Editor's content changed!",
              event
            );
          },
        });

        // Load default data if available
        // if (defaultData) {
        //   console.log('this is the default data    ',defaultData);
        //   await editorInstance.isReady;
        //   editorInstance.render(defaultData)
        // }

        editorRef.current = editorInstance;
      }
    };

    initializeEditor();

    // return () => {
    //   if (editorRef.current) {
    //     editorRef.current?.destroy();
    //     editorRef.current = null;
    //   }
    // };
  }, [editorRef, defaultData, holderId]);

  return (
    <Container
      id={holderId ? `editorjs-${holderId}` : `editorjs`}
      sx={{
        padding: "10px",
        border: "5px solid #ccc",
        borderRadius: "4px",
        width: {
          xs: "95%",
          md: "600%",
        },
        margin: "auto",
      }}
    />
  );
};

export default EditorForCreateArticle;
