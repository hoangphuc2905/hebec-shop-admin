import {
  CloudUploadOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Image, Modal, Progress, Upload, message } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { mediaApi } from "api/media.api";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { settings } from "settings";
import { MediaType } from "types/media";
import { getImageSize } from "utils";
import { getToken } from "utils/auth";
import { $url } from "utils/url";

export interface MultiImageUploadProps {
  uploadImageUrl?: string;
  uploadVideoUrl?: string;
  onUploadOk: (fileList: Array<any>) => void;
  recommendSize?: { width: number; height: number };
  fileListProp: UploadFile<any>[];
}

export interface MultiImageUpload {
  handleUpdatePosition: (image: string[]) => void;
}

const { Dragger } = Upload;

export const MultiImageUpload = React.forwardRef(
  (
    {
      uploadImageUrl = import.meta.env.VITE_API_URL + "/v1/store/media/upload",
      uploadVideoUrl = import.meta.env.VITE_API_URL +
        "/v1/store/media/upload/video",
      fileListProp,
      recommendSize,
      onUploadOk,
    }: MultiImageUploadProps,
    ref
  ) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState<UploadFile<any>[]>();
    const [imageSize, setImageSize] = useState<{
      width: number;
      height: number;
    }>({ width: 0, height: 0 });

    const videoPreviewRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          handleUpdatePosition(fileList: UploadFile<any>[]) {
            const newFileList = fileList.map((item) => item.url);
            setFileList([...fileList]);

            // const filePathList: string[] = [];

            // fileList.forEach((file) => {
            //   if (file.status !== "error") {
            //     console.log(file);

            //     filePathList.push(file);
            //   }
            // });
            onUploadOk(newFileList);
          },
        };
      },
      []
    );

    const handleChange = async ({
      fileList,
      file,
    }: {
      fileList: UploadFile<any>[];
      file: UploadFile<any>;
    }) => {
      const filePathList: any[] = [];
      if (file.status == "done" && file.type?.includes("video")) {
        const res = await mediaApi.generateThumbnail({
          videoPath: file?.response?.data?.path,
        });
        file.response.data.thumbnail = res.data.thumbnail;
        file.response.data.type = MediaType.Video;
      }
      fileList.forEach((file) => {
        if (file.status === "error") {
          // message.config({ maxCount: 1 });
          message.error(file.response?.message);
        } else {
          filePathList.push($url(file.response?.data.path) || $url(file.url));
        }
      });
      setFileList(fileList.filter((e) => e.status != "error"));

      onUploadOk(filePathList);

      if (recommendSize) {
        if (fileList.length == 0) {
          setImageSize({ width: 0, height: 0 });
        }
        filePathList.every((path) => {
          const imageSize = getImageSize(setImageSize, path);
          if (
            imageSize.width > recommendSize.width ||
            imageSize.height > recommendSize.height
          ) {
            return false;
          } else return true;
        });
      }
    };

    const handlePreview = (file: UploadFile) => {
      console.log(file);
      setPreviewImage(file.url || $url(file.response.data.path));
      setPreviewTitle(file.name);
      setPreviewVisible(true);
      if (videoPreviewRef.current && file.type?.includes("mp4")) {
        videoPreviewRef.current.play();
      }
    };

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

      const isCheckType = ["image", "video"].some((e) => file.type.includes(e));
      if (!isCheckType) {
        message.error("Only accept image format");
      }

      return (notLargeSize && isCheckType) || Upload.LIST_IGNORE;
    };

    useEffect(() => {
      setFileList(() => fileListProp.map((e) => ({ ...e })));

      if (recommendSize) {
        for (let i = 0; i < fileListProp.length; i++) {
          // debugger;
          const file = fileListProp[i];
          if (file.url) {
            getImageSize(({ width, height }) => {
              if (
                width > recommendSize.width ||
                height > recommendSize.height
              ) {
                return setImageSize({ width, height });
              }
            }, file.url);
          }
        }
      }
    }, [fileListProp]);

    const uploadButton = (
      <div>
        <p className="ant-upload-drag-icon">
          <CloudUploadOutlined />
        </p>
        <p className="ant-upload-text">
          Kéo hoặc chọn hình ảnh / video vào đây để tải lên
        </p>
        <p
          className="ant-upload-hint"
          style={{ marginLeft: 50, textAlign: "start" }}
        >
          <ul>
            <li>Vui lòng gửi ảnh có định dạng JPG/JPEG/PNG</li>
            <li>Vui lòng gửi video có định dạng MP4</li>
          </ul>
        </p>
      </div>
    );

    return (
      <>
        {recommendSize &&
          (imageSize.width > recommendSize?.width ||
            imageSize.height > recommendSize.height) && (
            <p style={{ color: "red" }}>
              Kích thước hình ảnh quá lớn cần chỉnh sửa lại
            </p>
          )}
        <Dragger
          multiple
          headers={{ token: getToken() || "", version: settings.version }}
          action={(file) => {
            return file.type.includes("video")
              ? uploadVideoUrl
              : uploadImageUrl;
          }}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          itemRender={(originNode, file, files, action) => {
            if (file?.type?.includes("video")) {
              const url = file?.response?.data?.path
                ? $url(file?.response?.data?.path)
                : file.url;
              if (file.status === "uploading") {
                return (
                  <div className="video-item">
                    <div
                      className="pseudo"
                      style={{
                        opacity: 1,
                      }}
                    >
                      <p>Đang tải lên</p>
                      <div
                        className="actions"
                        style={{
                          flexDirection: "column",
                          backgroundColor: "white",
                        }}
                      >
                        <Progress
                          style={{
                            width: "100%",
                          }}
                          percent={file.percent || 0}
                          size="small"
                        />
                      </div>
                    </div>
                  </div>
                );
              }
              return file.type?.includes("video") ? (
                <div className="video-item">
                  <video>
                    <source src={url} type="video/mp4"></source>
                  </video>
                  <div className="pseudo">
                    <div className="actions">
                      <EyeOutlined onClick={action.preview} />
                      <DeleteOutlined onClick={action.remove} />
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              );
            }
            return originNode;
          }}
        >
          {uploadButton}
        </Dragger>
        <Modal
          maskClosable={false}
          visible={previewVisible && previewImage.includes(".mp4")}
          title={previewTitle}
          footer={null}
          onCancel={() => {
            setPreviewVisible(false);
            if (previewImage.includes(".mp4") && videoPreviewRef.current) {
              videoPreviewRef.current.pause();
            }
          }}
        >
          {previewImage.includes(".mp4") ? (
            <video
              style={{ width: "100%" }}
              autoPlay
              controls
              ref={videoPreviewRef}
            >
              <source src={previewImage} />
            </video>
          ) : (
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          )}
        </Modal>

        <Image
          width={200}
          style={{ display: "none" }}
          preview={{
            visible: previewVisible,
            src: previewImage,
            onVisibleChange: (value) => {
              setPreviewVisible(value);
            },
          }}
        />
      </>
    );
  }
);
