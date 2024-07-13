import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import Image from 'next/image';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

interface ImageUploadPropsType {
  name: string;
  runAfterChange?: (file: any)=>void;
  required?:boolean;
}

const UploadImageField = ({name,runAfterChange,required}: ImageUploadPropsType) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  // const {setValue,reset} = useFormContext()

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info?.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info?.file.status === 'done') {
      // Get this url from response in real world.
      // setValue(name,info.file.originFileObj);
      if(runAfterChange){
        runAfterChange(info?.file.originFileObj)
      }
      getBase64(info?.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload {
            required === true ? <sup style={{color:'red',display:"inline",fontSize:15}}>*</sup>:""
          }</div>
    </div>
  );

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
      >
        {imageUrl ? <Image width={100} height={100} src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>

    </>
  );
};

export default UploadImageField;
