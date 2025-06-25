import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Modal, Popconfirm, Progress, Spin, Upload } from "antd";
import { FormInstance } from "antd/es/form/Form";
import { UploadFile } from "antd/lib/upload/interface";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { settings } from "settings";
import { getToken } from "utils/auth";
import { $url } from "utils/url";

interface UploadVideoProps {
  onUpload: (files: string[] | string) => void;
  multiple?: boolean;
  maxCount?: number;
  form?: FormInstance<any>;
  name: string;
  status: "create" | "update";
}

const UploadVideo = ({
  onUpload,
  multiple,
  maxCount = 1,
  form,
  name,
  status,
}: UploadVideoProps) => {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const previewLink = useRef<string>();
  const uploadVideoRef = useRef<any>();
  const defaultProps = useRef<any>(null);
  const detailData = form?.getFieldValue(name);
  const [loading, setLoading] = useState<boolean>(false);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleInitialData = debounce(() => {
    setLoading(true);
    const defaultValues = form?.getFieldValue(name);
    let defaultList = [];

    if (defaultValues) {
      if (defaultValues) {
        if (multiple) {
          defaultList = defaultValues.map((url: string) => ({
            uid: url,
            url: url,
            name: defaultValues,
          }));
        } else {
          defaultList = [
            {
              uid: defaultValues,
              url: defaultValues,
              name: defaultValues,
            },
          ];
        }
      }
    }

    defaultProps.current = {
      defaultFileList: defaultList,
    };
    setLoading(false);
  }, 500);

  useEffect(() => {
    handleInitialData();

    return () => {
      defaultProps.current = null;
    };
  }, [detailData]);

  const handleOnUploadError = debounce((file, action) => {
    message.error(file.response?.message);
    action.remove();
  }, 500);

  const beforeUpload = async (file: File) => {
    const isVideo = file.type.includes("video");
    if (!isVideo) {
      message.error("Vui lòng gửi lên tệp video!");
    }
    return isVideo || Upload.LIST_IGNORE;
  };

  const handleChange = ({ file }: { file: UploadFile<any> }) => {
    if (file.status === "done" || file.status === "removed") {
      let files = [];
      if (multiple) {
        files = uploadVideoRef.current.fileList.map((file: any) =>
          $url(file?.response?.data?.path || file.url)
        );
      } else {
        files = [
          $url(
            file.status === "removed"
              ? ""
              : file?.response?.data?.path || file.url
          ),
        ];
      }
      onUpload(files);
    }
  };

  return (
    <Spin spinning={loading}>
      {defaultProps?.current?.defaultFileList && (
        <Upload
          ref={uploadVideoRef}
          className="upload-video"
          multiple={multiple}
          defaultFileList={defaultProps.current?.defaultFileList}
          headers={{ token: getToken() || "", version: settings.version }}
          action={import.meta.env.VITE_API_URL + "/v1/store/media/upload/video"}
          maxCount={multiple ? maxCount : 1}
          listType="picture-card"
          beforeUpload={beforeUpload}
          onChange={handleChange}
          onPreview={(file) => {
            //@ts-ignore
            const url = file?.response?.data?.path
              ? $url(file?.response?.data?.path)
              : file.url;
            previewLink.current = url;
            setPreviewVisible(true);
          }}
          itemRender={(originNode, file, files, action) => {
            if (file?.response?.data?.path || file.url) {
              const url = file?.response?.data?.path
                ? $url(file?.response?.data?.path)
                : file.url;
              return (
                <div className="video-item">
                  <video>
                    <source src={url} type="video/mp4"></source>
                  </video>
                  <div className="pseudo">
                    <div className="actions">
                      <EyeOutlined onClick={action.preview} />
                      <Popconfirm
                        placement="topLeft"
                        title={`Xác nhận xóa video này?`}
                        onConfirm={() => action.remove()}
                        okText="Xóa"
                        cancelText="Không"
                      >
                        <DeleteOutlined />
                      </Popconfirm>
                    </div>
                  </div>
                </div>
              );
            } else {
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
              if (file.response?.message) {
                handleOnUploadError(file, action);
              }
            }
          }}
        >
          {uploadButton}
        </Upload>
      )}

      <Modal
        maskClosable={false}
        visible={previewVisible}
        footer={null}
        title="Preview Video"
        destroyOnClose
        width={800}
        onCancel={() => {
          setPreviewVisible(false);
          previewLink.current = "";
        }}
      >
        <video style={{ width: "100%" }} autoPlay controls>
          <source src={previewLink.current} />
        </video>
      </Modal>
    </Spin>
  );
};

export default UploadVideo;
