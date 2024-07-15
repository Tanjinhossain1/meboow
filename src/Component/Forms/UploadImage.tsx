import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import Image from "next/image";
import { Grid, IconButton } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

interface ImageUploadPropsType {
  name: string;
  runAfterChange?: (file: any) => void;
  getImageDatas?: (images: any) => void;
  required?: boolean;
  title?: string;
  isMultiple?: {
    isMultiple: boolean;
    urls: string;
    defaultImageUrls: string[];
    getImageDatas?: (images: any) => void;
  };
  isSingleImage?: {
    isSingleImage: boolean;
    imageUrl: string;
    urls: string;
    getImageDatas?: (image: any) => void;
  };
}

const UploadImageField = ({
  name,
  runAfterChange,
  required,
  title,
  isMultiple,
  isSingleImage,
}: ImageUploadPropsType) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(
    isSingleImage?.isSingleImage ? isSingleImage.imageUrl : ""
  );
  const [imageUrls, setImageUrls] = useState<string[]>(
    isMultiple?.isMultiple ? isMultiple.defaultImageUrls : []
  );
  // const {setValue,reset} = useFormContext()

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info?.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info?.file.status === "done") {
      // Get this url from response in real world.
      // setValue(name,info.file.originFileObj);
      if (!isMultiple && runAfterChange) {
        runAfterChange(info?.file.originFileObj);
      }

      if (isMultiple) {
        const imageDataUrls = async (file: any) => {
          console.log("Uploading file ", file);
          const formData = new FormData();
          formData.append("file", file);
          try {
            const response = await axios.post(`${isMultiple?.urls}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

            if (response.data.success === 1) {
              console.log("File uploaded successfully", response.data);
              setImageUrls((prevUrls) => [
                response.data?.file?.url,
                ...prevUrls,
              ]);
              setLoading(false);
              // }
            } else {
              setLoading(false);
              throw new Error("Upload failed");
            }
          } catch (error) {
            setLoading(false);
            console.error("Error uploading file:", error);
            throw error;
          }
        };
        imageDataUrls(info.file.originFileObj);
      } else if (isSingleImage) {
        const imageDataUrls = async (file: any) => {
          console.log("Uploading file ", file);
          const formData = new FormData();
          formData.append("file", file);
          try {
            const response = await axios.post(
              `${isSingleImage?.urls}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            if (response.data.success === 1) {
              console.log("File uploaded successfully", response.data);
              setImageUrl(response.data?.file?.url);
              setLoading(false);
              // }
            } else {
              setLoading(false);
              throw new Error("Upload failed");
            }
          } catch (error) {
            setLoading(false);
            console.error("Error uploading file:", error);
            throw error;
          }
        };
        imageDataUrls(info?.file.originFileObj);
      } else {
        getBase64(info?.file.originFileObj as RcFile, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
      }
    }
  };

  useEffect(() => {
    if (imageUrls && imageUrls[0]) {
      if (isMultiple?.isMultiple && isMultiple?.getImageDatas) {
        isMultiple?.getImageDatas(imageUrls);
      }
    }
  }, [imageUrls, isMultiple]);

  useEffect(() => {
    if (imageUrl) {
      if (isSingleImage?.isSingleImage && isSingleImage?.getImageDatas) {
        isSingleImage?.getImageDatas(imageUrl);
      }
    }
  }, [imageUrl, isSingleImage]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>
        {title ? title : "Upload"}{" "}
        {required === true ? (
          <sup style={{ color: "red", display: "inline", fontSize: 15 }}>*</sup>
        ) : (
          ""
        )}
      </div>
    </div>
  );
  const handleDeleteImage = (index: number) => {
    setImageUrls((prevUrls) => {
      const updatedUrls = [...prevUrls];
      updatedUrls.splice(index, 1);
      return updatedUrls;
    });
  };
  return (
    <>
      <Upload
        name={name}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/file"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        // disabled={ isMultiple ? false : imageUrl ? true : false}
      >
        {uploadButton}
      </Upload>
      {imageUrl ? (
        <>
          <Image
            width={50}
            height={50}
            src={imageUrl}
            alt="avatar"
            style={{ width: "100%" }}
          />
          <IconButton
            onClick={() => setImageUrl("")}
            aria-label="delete"
            // sx={{ position: "absolute",  zIndex: 1000,p:0}}
          >
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </>
      ) : null}
      <Grid container gap={1}>
        {isMultiple
          ? imageUrls &&
            imageUrls.map((img, index) => (
              <Grid sx={{ mt: index >= 3 ? 2 : 0 }} item xs={2.8} key={index}>
                <Image
                  width={50}
                  height={50}
                  src={img}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
                <IconButton
                  onClick={() => handleDeleteImage(index)}
                  aria-label="delete"
                  sx={{ position: "absolute", zIndex: 1000, p: 0 }}
                >
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </Grid>
            ))
          : null}
      </Grid>
    </>
  );
};

export default UploadImageField;
