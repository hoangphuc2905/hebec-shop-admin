import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { settings } from "settings";
import { getImageSize } from "utils";
import { getToken } from "utils/auth";
import { $url } from "utils/url";

interface SingleImageUploadProps {
  uploadUrl?: string;
  imageUrl: string;
  onUploadOk: (path: string) => void;
  width?: number | string;
  recommendSize?: { width: number; height: number };
  height?: number | string;
  disabled?: boolean;
  limitSize?: number;
}

const checkFileSize = async (
  file: File,
  limitSize: number
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    console.log(file.size / 1024 / 1024);

    if (file.size / 1024 / 1024 > limitSize) {
      message.error(`Kích thước hình ảnh tối đa để tải lên là ${limitSize}MB`);
      return resolve(false);
    } else {
      return resolve(true);
    }
  });
};

export const SingleImageUpload = React.memo(
  ({
    uploadUrl = import.meta.env.VITE_API_URL + "/v1/store/image/upload",
    imageUrl,
    onUploadOk,
    height = 150,
    width = 150,
    disabled,
    limitSize,
    recommendSize,
  }: SingleImageUploadProps) => {
    const [loading, setLoading] = useState(false);
    const uploadRef = useRef(null);
    const [singleUploadId, setsingleUploadId] = useState(
      `single-upload-${moment().valueOf()}`
    );
    const [imageSize, setImageSize] = useState<{
      width: number;
      height: number;
    }>({ width: 0, height: 0 });

    const checkSize = async (file: File): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        if (recommendSize) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.addEventListener("load", (event) => {
            //@ts-ignore
            const _loadedImageUrl = event.target.result;
            const image = document.createElement("img");

            //@ts-ignore
            image.src = _loadedImageUrl;
            image.addEventListener("load", () => {
              const { width, height } = image;
              if (
                width > recommendSize.width ||
                height > recommendSize.height
              ) {
                message.error(
                  `Kích thước quá lớn (Đề xuất: ${recommendSize.width}x${recommendSize.height})`
                );

                return resolve(false);
              } else {
                resolve(true);
              }
            });
          });
        } else {
          return resolve(true);
        }
      });
    };

    const beforeUpload = async (file: File) => {
      const notLargeSize = await checkSize(file);
      let notLargeSizeFile = true;

      if (limitSize) {
        notLargeSizeFile = await checkFileSize(file, limitSize);
      }

      const isImg = file.type.includes("image");

      if (!isImg) {
        message.error("Only accept image format");
      }

      return notLargeSize && isImg && notLargeSizeFile;
    };

    const handleChange = (info: UploadChangeParam<any>) => {
      if (info.file.status === "uploading") {
        setLoading(true);
        return;
      }
      if (info.file.status === "done") {
        if (recommendSize) {
          getImageSize(setImageSize, $url(info.file.response.data.path));
        }
        onUploadOk($url(info.file.response.data.path));
        setLoading(false);
      }
      if (info.file.status === "error") {
        message.error(info.file.response?.message);
        setLoading(false);
        return;
      }
    };

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    useEffect(() => {
      const container = document.querySelector<HTMLDivElement>(
        `.${singleUploadId} .ant-upload-select`
      );
      if (container) {
        container.style.width = typeof width == "number" ? `${width}px` : width;
        container.style.height =
          typeof height == "number" ? `${height}px` : height;
      }
    }, []);

    useEffect(() => {
      if (recommendSize) {
        if (imageUrl) {
          getImageSize(setImageSize, imageUrl);
        } else {
          setImageSize({ height: 0, width: 0 });
        }
      }
    }, [imageUrl]);

    return (
      <>
        {recommendSize &&
          (imageSize.width > recommendSize?.width ||
            imageSize.height > recommendSize.height) && (
            <p style={{ color: "red" }}>
              Kích thước hình ảnh quá lớn cần chỉnh sửa lại
            </p>
          )}
        <Upload
          name="file"
          listType="picture-card"
          className={singleUploadId}
          showUploadList={false}
          action={uploadUrl}
          headers={{
            token: getToken() || "",
            version: settings.version,
          }}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          ref={uploadRef}
          disabled={disabled}
          style={{
            width: 200,
          }}
        >
          {imageUrl ? (
            <img
              src={$url(imageUrl)}
              alt="avatar"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </>
    );
  }
);
