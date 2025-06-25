import { DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Modal,
  Space,
  Spin,
  Table,
  Upload,
  message,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { productApi } from "api/product.api";
import axios from "axios";
import { useProductCategory } from "hooks/useProductCategory";
import { useStore } from "hooks/useStore";
import moment from "moment";
import { useEffect, useState } from "react";
import { DeliveryTypeTrans, EDeliveryType } from "types/deliveryType";
import { ProductCategory } from "types/product-category";
import { getToken } from "utils/auth";
import productExportDemo, {
  DataSheet1,
  ExcelDataType,
} from "utils/downloadExcelDemo/productExcelDemo";
import { readerData } from "utils/excel2";
import { useHandlerProductCustomField } from "views/ProductCustomField/handler/useHandlerProductCustomField";

const { Dragger } = Upload;

export type ColumnImportDocumentType = Omit<ColumnsType<any>, "render"> & {
  render?: (data: any) => React.ReactNode;
};

export interface IRules {
  required?: {
    data?: any;
    message?: string;
  };
  unique?: {
    data?: any;
    message?: string;
  };
  includes?: {
    data?: any[];
    message?: string;
  };
  callback?: {
    data?: any;
    message?: string;
    cb?: () => void;
  };
}

interface IProps {
  columnsKey: any;
  columns: Omit<ColumnsType<any>, "render"> & {
    render?: (data: any) => React.ReactNode;
  };
  validateRules: {
    [key: string]: IRules;
  };
  getFormData: (data: any) => any;
  createApi: (data: any) => any;
  onCancel: () => void;
  visible: boolean;
  onSuccess: () => void;
}

const ImportDocument = ({
  validateRules,
  columns,
  columnsKey,
  getFormData,
  createApi,
  visible,
  onCancel,
  onSuccess,
}: IProps) => {
  const [errorsData, setErrorsData] = useState<any[]>([]);
  const [errorsLog, setErrorsLog] = useState<any>("");
  const [dataPosts, setDataPosts] = useState<any[]>([]);

  const {
    fetchProductCategory: fetchProductCategory,
    productCategories,
    categoryLoading,
  } = useProductCategory();
  const { fetchStores, stores, storeLoading } = useStore();
  const { data: productCustomFields, fetchData: fetchProductCustomField } =
    useHandlerProductCustomField({
      initQuery: {
        search: "",
        page: 1,
        limit: 100,
      },
    });

  useEffect(() => {
    fetchProductCategory({ page: 1, limit: 100 });
    fetchProductCustomField();
  }, []);

  const finalColumns = [
    {
      key: "line",
      dataIndex: "line",
      title: "Dòng",
    },
    ...columns.map((column: any) => ({
      ...column,
      render: (text: any, record: any) =>
        (text && <span className="text-error">{text}</span>) ||
        (column?.render
          ? column?.render(record["originData"][column.dataIndex])
          : record["originData"][column.dataIndex]),
    })),
  ];

  const handleOnImport = async () => {
    if (!!errorsData.length || !dataPosts.length)
      return message.error("Danh sách sản phẩm rỗng.", 5);
    const promises: any[] = [];
    dataPosts.forEach((data, index) => {
      promises.push(
        (async () => {
          try {
            const formData = data;
            const res = await productApi.create(formData);
            if (!res.status) {
              throw index;
            }
          } catch (error: any) {
            const response = error["response"];
            const message =
              response["data"]["message"] || "Lỗi không xác định.";
            return `Dòng ${index + 1}: ${message}`;
          }
        })()
      );
    });

    const data = await Promise.all(promises);
    const errors = data.filter(Boolean);
    onSuccess();
    setDataPosts([]);
    setErrorsLog(() => (
      <>
        <pre className="text-success">
          {dataPosts.length - errors.length > 0 && (
            <p>
              Đã có {dataPosts.length - errors.length} record được tạo thành
              công!
            </p>
          )}
          {errors.length > 0 && (
            <p className="text-error">
              Có {errors.length} record không thành công.
            </p>
          )}
        </pre>
        <pre className="text-error">{errors.join("\n")}</pre>
      </>
    ));
  };

  const getProductCategoryId = (
    cate: string,
    productCategories: ProductCategory[]
  ) => {
    const find = productCategories?.find((item) => item?.name == cate);
    if (find) {
      return find?.id;
    } else {
      return undefined;
    }
  };

  const handleValidateRecord = (
    rules: ExcelDataType[],
    data: Record<string, any>,
    position: number,
    uniqueCode: any[]
  ) =>
    new Promise((resolve, reject) => {
      let error = "";

      const handleCheckUnique = (record: any) => {
        if (uniqueCode.includes(record)) {
          return true;
        } else {
          uniqueCode.push(record);
          return false;
        }
      };

      const isError = Object.keys(rules).some((key: any) => {
        const validateData = rules[key];
        // @ts-ignore
        const record = data[validateData?.title];
        if (validateData.required) {
          if (!record) {
            error = `[LỖI DÒNG ${position}]: ${validateData?.title} là bắt buộc!`;
            return true;
          }
        }

        if (validateData.unique) {
          if (record) {
            const isExist = handleCheckUnique(record);
            if (isExist) {
              error = `[LỖI DÒNG ${position}]: ${validateData?.title} phải là duy nhât!`;
              return true;
            }
          }
        }

        return false;
      });

      if (isError) {
        return reject(error);
      }
      return resolve(true);
    });

  const getProductData = async (excelData: any) => {
    try {
      const { results } = excelData;

      if (results?.length == 0) return message.error("Danh sách dữ liệu rỗng.");

      let data = [];
      let uniqueCode: any[] = [];

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        await handleValidateRecord(DataSheet1, result, i + 2, uniqueCode);

        const productCategoryId = getProductCategoryId(
          result["Danh mục"],
          productCategories
        );

        const images = result["Đường dẫn hình ảnh khác"]
          ?.split(",")
          ?.filter(Boolean);

        const dataPost = {
          product: {
            code: result["Mã SP"],
            name: result["Tên SP"],
            description: result["Mô tả chi tiết"],
            videoUrl: result["Đường dẫn video sản phẩm"],
            image: result["Đường dẫn hình ảnh"],
            unitPrice: result["Giá bán lẻ"],
            refPoint: result["Hoa hồng chiết khấu khi giới thiệu (%)"],
            sold: result["Số lượng sản phẩm đã bán ban đầu"],
            lifeCycleDay: result["Số ngày nhắc mua lại sản phẩm (ngày)"],
            isHighlight: result["Nổi bật"] == "Bật",
            isActive: result["Trạng thái"] == "Hiện",
            weight: result["Cân nặng (gr)"],
            height: result["Cao (cm)"],
            length: result["Dài (cm)"],
            width: result["Rộng (cm)"],
          },
          images: Array.isArray(images) ? images : [],
          productCategoryId,
        };

        console.log("IMPORT DATA: ", dataPost);
        data.push(dataPost);
      }

      console.log();

      setDataPosts(data);
    } catch (error) {
      console.log("IMPORT DATA ERROR: ", error);
      setDataPosts([]);
      if (typeof error === "string") {
        message.error(error, 5);
      }
    }
  };

  return (
    <Modal
      maskClosable={false}
      width={1000}
      style={{ top: 50 }}
      visible={visible}
      onCancel={onCancel}
      destroyOnClose={true}
      afterClose={() => {
        setErrorsData([]);
        setDataPosts([]);
        setErrorsLog("");
      }}
      title="Import data"
      footer={[
        <Button
          type="primary"
          disabled={!!errorsData.length || !dataPosts.length}
          onClick={() => {
            handleOnImport();
          }}
          style={{ color: "#fff" }}
        >
          Nhập sản phẩm ngay
        </Button>,
      ]}
    >
      <Spin spinning={storeLoading || categoryLoading}>
        <Alert
          style={{ padding: "10px", marginBottom: "10px" }}
          message={<b>Lưu ý</b>}
          type="warning"
          description={
            <ul>
              <li>
                <p>
                  Vui lòng tải và sử dụng file mẫu dưới đây để import sản phẩm.
                </p>
              </li>
              <li>
                <p>
                  Hạn chế thay đổi tiêu đề trong file csv mẫu để tránh import
                  thiếu dữ liệu.
                </p>
              </li>
            </ul>
          }
        />
        <Button
          type="link"
          onClick={(e) => {
            productExportDemo({
              categories: productCategories,
            });
            e.preventDefault();
          }}
          // to="/exportFile/File mẫu Import sản phẩm.xlsx"
          // target="_blank"
          // download
        >
          <Space>
            <DownloadOutlined />
            Tải file import mẫu
          </Space>
        </Button>

        <Dragger
          style={{ marginTop: "0.5em" }}
          maxCount={1}
          multiple={false}
          beforeUpload={async (file) => {
            //Check file type
            const isCSVFile = file.name.includes("xlsx");
            if (isCSVFile === false) {
              message.error("You can only upload XLSX file!");
              return Upload.LIST_IGNORE;
            }

            const excelData = await readerData(file);
            console.log(excelData);
            getProductData(excelData);

            return false;
          }}
          onChange={(info) => {
            //reset data
            if (info.fileList.length == 0) {
              setErrorsLog(null);
              setErrorsData([]);
            }
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Kéo thả hoặc click vào đây để upload file
          </p>
        </Dragger>

        {errorsData.length !== 0 && (
          <>
            <Table
              pagination={{
                pageSize: 10,
              }}
              style={{
                marginTop: "10px",
              }}
              columns={finalColumns}
              bordered
              rowKey="id"
              dataSource={errorsData}
            ></Table>
          </>
        )}
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
      </Spin>
      <Space
        style={{ width: "100%", justifyContent: "end", marginTop: "1em" }}
      ></Space>
    </Modal>
  );
};

export default ImportDocument;
