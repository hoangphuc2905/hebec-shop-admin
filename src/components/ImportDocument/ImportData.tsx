import { DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import { Alert, Button, message, Modal, Space, Spin, Upload } from "antd";
import { customerApi } from "api/customer.api";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Link } from "react-router-dom";
import { readerData } from "utils/excel2";
import { InfoTab } from "views/Shop/components/TabPane/InfoTab";

const { Dragger } = Upload;

export interface ImportDataModal {
  open: () => void;
  close: () => void;
}
interface IProps {
  onSuccess?: () => void;
  createApi: (data: any) => any;
  onUploaded?: (excelData: any, setData: (data: any) => any) => void;
  demoExcel?: string;
  guide?: React.ReactNode[];
  uploadText?: string;
  okText?: string;
  onClose?: () => void;
  titleText?: string;
  validateMessage?: any[];
  onDownloadDemoExcel?: () => void;
}

const ImportDocument = forwardRef(
  (
    {
      onSuccess,
      createApi,
      onUploaded,
      onClose,
      validateMessage,
      guide,
      demoExcel,
      uploadText = "Kéo thả hoặc click vào đây để upload file",
      okText = "Nhập dữ liệu ngay",
      titleText = "Nhập excel dữ liệu",
      onDownloadDemoExcel,
    }: IProps,
    ref
  ) => {
    const [errorsLog, setErrorsLog] = useState<any>("");
    const [dataPosts, setDataPosts] = useState<any[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      if (validateMessage?.length) {
        setErrorsLog("");
      }
    }, [validateMessage]);

    const handleOnImport = async () => {
      if (!dataPosts.length) return;
      const promises: any[] = [];
      const limitPerUpload = 500;
      const numCallApi = dataPosts.length / limitPerUpload;

      setLoading(true);
      let errors: any[] = [];
      for (let i = 0; i < numCallApi; i++) {
        //Lấy prop customer do bên ngoài set
        const customers = dataPosts
          .slice(i * limitPerUpload, (i + 1) * limitPerUpload)
          .map((it) => it.customer);

        try {
          await customerApi.import({ customers });
        } catch (error: any) {
          //Hùng chỉ viết...
          // message.error("Có lỗi xảy ra khi import, vui lòng thử lại sau");
          errors.push(
            error?.response?.data?.message ||
              "Có lỗi xảy ra khi import, vui lòng thử lại sau"
          );
        }
      }
      setLoading(false);
      if (!errors.length) {
        return onSuccess?.();
      }
      setDataPosts([]);
      setErrorsLog(() => (
        <>
          <pre className="text-success">
            Đã có {dataPosts.length - errors.length} record được tạo thành công!{" "}
            {errors.length} record không thành công.
          </pre>
          <pre className="text-error">{errors.join("\n")}</pre>
        </>
      ));

      // dataPosts.forEach((data, index) => {
      //   promises.push(
      //     (async () => {
      //       try {
      //         const formData = data;
      //         const res = await createApi(formData);
      //         if (!res.status) {
      //           throw index;
      //         }
      //       } catch (error: any) {
      //         const response = error["response"];
      //         const message =
      //           response["data"]["message"] || "Lỗi không xác định.";
      //         return `Dòng ${index + 1}: ${message}`;
      //       }
      //     })()
      //   );
      // });
      // try {
      //   setLoading(true);
      //   const data = await Promise.all(promises);
      //   const errors = data.filter(Boolean);
      //   if (!errors.length) {
      //     return onSuccess?.();
      //   }
      //   setDataPosts([]);
      //   setErrorsLog(() => (
      //     <>
      //       <pre className="text-success">
      //         Đã có {dataPosts.length - errors.length} record được tạo thành
      //         công! {errors.length} record không thành công.
      //       </pre>
      //       <pre className="text-error">{errors.join("\n")}</pre>
      //     </>
      //   ));
      // } catch (error) {
      // } finally {
      //   setLoading(false);
      // }
    };

    const handleOnCancel = () => {
      setVisible(false);
      onClose?.();
    };
    useImperativeHandle(
      ref,
      () => ({
        open: () => setVisible(true),
        close: () => setVisible(false),
      }),
      []
    );

    return (
      <Modal
        maskClosable={false}
        width={1000}
        style={{ top: 50 }}
        visible={visible}
        onCancel={handleOnCancel}
        destroyOnClose={true}
        afterClose={() => {
          setDataPosts([]);
          setErrorsLog("");
        }}
        title={titleText}
        footer={[
          <Button
            key={1}
            loading={loading}
            type="primary"
            disabled={!dataPosts.length}
            onClick={() => {
              handleOnImport();
            }}
            style={{ color: "#fff" }}
          >
            {okText}
          </Button>,
        ]}
      >
        <Spin spinning={false}>
          {guide && (
            <Alert
              style={{ padding: "10px", marginBottom: "10px" }}
              message={<b>Lưu ý</b>}
              type="warning"
              description={
                <ul>
                  {guide.map((text, index) => (
                    <li key={index}>
                      <p>{text}</p>
                    </li>
                  ))}
                </ul>
              }
            />
          )}
          {demoExcel && (
            <Link to={demoExcel} target="_blank" download>
              <Space>
                <DownloadOutlined />
                Tải file import mẫu
              </Space>
            </Link>
          )}
          {onDownloadDemoExcel && (
            <a>
              <Space onClick={() => onDownloadDemoExcel()}>
                <DownloadOutlined />
                Tải file import mẫu
              </Space>
            </a>
          )}

          <Dragger
            style={{ marginTop: "0.5em" }}
            maxCount={1}
            multiple={false}
            beforeUpload={async (file) => {
              //Check file type
              const isCSVFile = file.name.includes("xlsx");
              if (isCSVFile === false) {
                message.error("Bạn chỉ có thể upload file excel!");
                return Upload.LIST_IGNORE;
              }
              const excelData = await readerData(file);
              onUploaded?.(excelData, setDataPosts);

              return false;
            }}
            onChange={(info) => {
              //reset data
              if (info.fileList.length == 0) {
                setErrorsLog(null);
                setDataPosts([]);
              }
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">{uploadText}</p>
          </Dragger>

          {errorsLog && (
            <div
              className="logs"
              style={{
                marginTop: "10px",
                width: "100%",
                maxHeight: "400px",
                border: "thin solid rgba(0,0,0,0.2)",
                minHeight: "200px",
                overflowY: "auto",
                backgroundColor: "rgba(0,0,0,0.1)",
                padding: "15px",
                fontSize: "18px",
              }}
            >
              {errorsLog}
            </div>
          )}
          {!!validateMessage?.length && !errorsLog && (
            <Alert
              style={{ maxHeight: 300, overflow: "auto", marginTop: "10px" }}
              message={
                <>
                  <h3 style={{ fontWeight: "normal" }}>
                    Các cửa hàng dưới đây sẽ không được nhập vào hệ thống do nội
                    dung không hợp lệ
                  </h3>
                  <ul style={{ margin: 0 }}>
                    {validateMessage?.map((item, index) => (
                      <li key={index}>
                        <b>Dòng {item.index + 1}</b> {item.message}
                      </li>
                    ))}
                  </ul>
                </>
              }
              type="error"
            />
          )}
        </Spin>
        <Space
          style={{ width: "100%", justifyContent: "end", marginTop: "1em" }}
        ></Space>
      </Modal>
    );
  }
);

export default ImportDocument;
