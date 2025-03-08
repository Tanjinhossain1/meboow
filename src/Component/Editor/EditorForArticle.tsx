import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import axios from "axios";
import { ResizableImageTool } from "./EditorImage";
import { Button, Container, Tooltip } from "@mui/material";
import Delimiter from "@editorjs/delimiter";
import Marker from "@editorjs/marker";
import SearchAndLinkTool from "./SearchAndLinkTool";
import SearchAndAddText from "./SearchAndAddText";
import { CopyIcon } from "lucide-react";

const EditorForArticle = ({
  holderId,
  defaultData,
  isMobileArticle,
  onChange,
  value,
}: {
  holderId?: string;
  defaultData?: any;
  isMobileArticle?: boolean;
  onChange?: any;
  value?: any;
}) => {
  const editorRef = useRef<any>(null);
  useEffect(() => {
    const initializeEditor = async () => {
      if (!editorRef.current) {
        const editorInstance = new EditorJS({
          // defaultBlock: defaultData?.blocks,
          data: value ? value : defaultData,
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
            searchAndLink: SearchAndLinkTool as any,
            searchAndAddText: SearchAndAddText as any,
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
              toolbox: { data: {} },
            },
          },
          onReady: () => {
            console.log("Editor.js is ready to work!");
          },
          onChange: async (api: any, event: any) => {
            console.log(
              api,
              "Now I know that Editor's content changed!",
             await editorRef.current?.save()
            );
            const content = await editorRef.current?.save();
            onChange(content); // Pass data to form
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
  }, [editorRef, defaultData, holderId,onChange,value]);
  const handleCopyText = async () => {
    if (editorRef.current) {
      const content = await editorRef.current.save();
      const text = content.blocks.map((block: any) => block.data.text).join("\n");

      try {
        await navigator.clipboard.writeText(text);
         
         
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };


  return (
    <>
   <div className="flex justify-end">
   <Tooltip title={ "Copy Text"}>
        <Button
          variant="contained"
          startIcon={<CopyIcon />}
          onClick={handleCopyText}
          sx={{
            display: "flex",
            justifyContent:"end",
            margin: "10px auto",
          }}
        >
          Copy
        </Button>
      </Tooltip>
   </div>
    <Container
      id={holderId ? `editorjs-${holderId}` : `editorjs`}
      sx={{
        padding: "10px",
        border: "5px solid #ccc",
        borderRadius: "4px",
        width: isMobileArticle
          ? "700px"
          : {
              xs: "95%",
              md: "600%",
            },
        margin: "auto",
      }}
    />
    </>
  );
};

export default EditorForArticle;
