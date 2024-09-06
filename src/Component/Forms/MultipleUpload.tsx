import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import Image from "next/image";
import { Grid, IconButton } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

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
  isAdminImages?: boolean;
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
}

const UploadMultipleImageField = ({
  name,
  runAfterChange,
  required,
  title,
  isMultiple,
  isAdminImages,
}: ImageUploadPropsType) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(
    isMultiple?.isMultiple ? isMultiple.defaultImageUrls : []
  );

  useEffect(() => {
    if (imageUrls.length > 0 && isMultiple?.getImageDatas) {
      isMultiple?.getImageDatas(imageUrls);
    }
  }, [imageUrls, isMultiple]);

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

  const handleDeleteImage = async (index: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/delete/${imageUrls[index]}`
      );
      setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleImageUpload = async (files: FileList) => {
    const formData = new FormData();
    console.log("first files to upload ", files);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/upload/multiple`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // const uploadedImageUrls: any =   response?.data?.files
      const uploadedImageUrls = response?.data?.files?.map(
        (file: any) => file.url
      );
      console.log(" uploaded image   ", uploadedImageUrls, response);
      setImageUrls((prevUrls) => [...uploadedImageUrls, ...prevUrls]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };
  return (
    <Grid container display={"flex"}>
      {/* <Upload
        name={name}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        multiple={true}
        fileList={fileList}
      >
        {uploadButton}
      </Upload> */}
      <div className="flex flex-col items-center justify-center mb-1">
        <label htmlFor="file-upload" className="cursor-pointer">
          <div
            className="
            w-32 h-32
            flex flex-col items-center justify-center
            border-2 border-dashed border-gray-300
            rounded-md
            text-gray-400
            hover:border-gray-400 hover:text-gray-500
            transition-colors
            relative
          "
          >
            <span className="text-2xl font-semibold">+</span>
            <span className="mt-2 text-sm">
              Pictures <sup className="text-red-500">*</sup>
            </span>
          </div>
          <input
            id="file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                handleImageUpload(e.target.files);
              }
            }}
          />
        </label>
        {/* {files && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            {files.length} file(s) selected.
          </p>
        </div>
      )} */}
      </div>
      <Grid container gap={1}>
        {isMultiple &&
          imageUrls.map((img, index) => (
            <Grid
              sx={{ mt: index >= 3 ? 2 : 0 }}
              item
              xs={isAdminImages ? 2 : 2.8}
              key={index}
            >
              <Image
                width={50}
                height={50}
                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/get/${img}`}
                alt="uploaded-image"
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
          ))}
      </Grid>
    </Grid>
  );
};

export default UploadMultipleImageField;
