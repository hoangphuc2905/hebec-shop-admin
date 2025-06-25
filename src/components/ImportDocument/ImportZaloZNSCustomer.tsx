import { DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Form,
  Input,
  Modal,
  Space,
  Spin,
  Table,
  Upload,
  message,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { ColumnsType } from "antd/lib/table";
import { znsCampaignApi } from "api/znsCampaign.api";
import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ExcelDataType } from "utils/downloadExcelDemo/productExcelDemo";
import { readerData } from "utils/excel2";
import { requiredRule } from "utils/validate-rules";

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

export const ZNSSheetValidate: (ExcelDataType & { format?: string })[] = [
  {
    title: "Mã hóa đơn",
    required: true,
    unique: true,
    description: [
      "Mã hóa đơn là thông tin giúp phân loại hóa đơn, mã hóa đơn là duy nhất không trùng lặp.",
    ],
  },
  {
    title: "Mã đặt hàng",
    description: ["Mã đặt hàng."],
  },

  {
    title: "Khách hàng",
    required: true,
    description: ["Tên của khách hàng."],
  },

  {
    title: "Điện thoại",
    required: true,
    description: ["Số điện thoại của khách hàng."],
  },
  {
    title: "Khách cần trả",
    required: true,
    description: ["Số tiền khách cần trả"],
  },
  {
    title: "Thời gian giao hàng",
    required: true,
    format: "DD/MM/YYYY HH:mm",
    description: ["Thời gian giao hàng của đơn"],
  },
];

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

const ImportZaloZNSCustomer = ({
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

  const [loadingImport, setLoadingImport] = useState(false);

  const [form] = useForm();

  const finalColumns = [
    {
      key: "line",
      dataIndex: "line",
      title: "Dòng",
    },
    {
      key: "errorText",
      dataIndex: "errorText",
      title: "Lỗi",
      render: (text: string) => <span className="text-error">{text}</span>,
    },
    ...columns.map((column: any) => ({
      ...column,
      render: (text: any, record: any) =>
        text ||
        (column?.render
          ? column?.render(record["originData"][column.dataIndex])
          : record["originData"]?.[column.dataIndex]),
    })),
  ];

  const handleOnImport = async () => {
    try {
      setLoadingImport(true);
      await form.validateFields();

      const campaignName = form.getFieldValue("campaignName");

      if (!!errorsData.length || !dataPosts.length)
        return message.error("Danh sách sản phẩm rỗng.", 5);

      console.log(campaignName, "dataPosts", dataPosts);

      const { data } = await znsCampaignApi.create({
        znsCampaign: {
          name: campaignName,
          sendAt: moment().unix(),
        },
        details: dataPosts,
      });
      // const errors = data.filter(Boolean);
      onSuccess();
      setDataPosts([]);
      // setErrorsLog(() => (
      //   <>
      //     <pre className="text-success">
      //       {dataPosts.length - errors.length > 0 && (
      //         <p>
      //           Đã có {dataPosts.length - errors.length} record được tạo thành
      //           công!
      //         </p>
      //       )}
      //       {errors.length > 0 && (
      //         <p className="text-error">
      //           Có {errors.length} record không thành công.
      //         </p>
      //       )}
      //     </pre>
      //     <pre className="text-error">{errors.join("\n")}</pre>
      //   </>
      // ));
    } catch (error) {
      console.log("import ZNS failed", error);
    } finally {
      setLoadingImport(false);
    }
  };

  const handleValidateRecord = (
    rules: (ExcelDataType & { format?: string })[],
    data: Record<string, any>,
    position: number,
    uniqueCode: any[]
  ) => {
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
          error = `${validateData?.title} là bắt buộc!`;
          return true;
        }
      }

      if (validateData.unique) {
        if (record) {
          const isExist = handleCheckUnique(record);
          if (isExist) {
            error = `${validateData?.title} phải là duy nhât!`;
            return true;
          }
        }
      }

      if (validateData.format) {
        if (record) {
          if (!moment(record, validateData.format, true).isValid()) {
            error = `${validateData?.title} không đúng dịnh dạng`;
            return true;
          }
        }
      }

      return false;
    });

    if (isError) {
      return { isError: true, error };
    }
    return { isError: false };
  };

  const getZaloZNSData = async (excelData: any) => {
    try {
      setLoadingImport(true);
      const { results } = excelData;

      if (results?.length == 0) return message.error("Danh sách dữ liệu rỗng.");

      let details: any[] = [];
      let uniqueCode: any[] = [];
      let errorValidations: any[] = [];

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const validateRes = handleValidateRecord(
          ZNSSheetValidate,
          result,
          i + 2,
          uniqueCode
        );

        if (validateRes.isError) {
          errorValidations.push({
            line: i + 2,
            errorText: validateRes.error,
            ...result,
          });
        } else {
          const detailItem = {
            phone: result["Điện thoại"],
            orderCode: result["Mã hóa đơn"],
            orderDate: result["Thời gian giao hàng"],
            orderMoney: result["Khách cần trả"],
          };
          details.push(detailItem);
        }
      }

      if (errorValidations.length > 0) {
        message.error(`CÓ LỖI TRONG FILE IMPORT`);
        setErrorsData(errorValidations);
        setDataPosts([]);
      } else {
        setErrorsData([]);
        setDataPosts(details);
      }
    } catch (error) {
      console.log("IMPORT DATA ERROR: ", error);
      setDataPosts([]);
      // if (typeof error === "string") {
      //   message.error(error, 5);
      // }
    } finally {
      setLoadingImport(false);
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
      footer={
        <Button
          type="primary"
          disabled={!!errorsData.length || !dataPosts.length}
          onClick={() => {
            handleOnImport();
          }}
          style={{ color: "#fff" }}
          loading={loadingImport}
        >
          Thêm chiến dịch
        </Button>
      }
    >
      {/* <Spin spinning={storeLoading || categoryLoading}> */}
      <Form form={form} layout="vertical">
        <Form.Item
          rules={[requiredRule]}
          label="Tên chiến dịch"
          name={"campaignName"}
        >
          <Input placeholder="Nhập tên chiến dịch" />
        </Form.Item>
      </Form>
      <Alert
        style={{ padding: "10px", marginBottom: "10px" }}
        message={<b>Lưu ý</b>}
        type="warning"
        description={
          <ul>
            <li>
              Vui lòng tải và sử dụng file mẫu dưới đây để import sản phẩm.
            </li>
            <li>
              Hạn chế thay đổi tiêu đề trong file csv mẫu để tránh import thiếu
              dữ liệu.
            </li>
          </ul>
        }
      />
      <Spin spinning={loadingImport}>
        <Link
          // type="link"
          // onClick={async (e) => {
          //   e.preventDefault();
          //   // try {
          //   //   setLoadingGetDataExport(true);
          //   //   const exportData = await getExportData<Product>({
          //   //     dataField: "products",
          //   //     api: productApi.findAll,
          //   //     query: {},
          //   //     limit: 100,
          //   //   });

          //   //   const exportExcelDemo = new ExportImportExcelDemoFile([
          //   //     {
          //   //       header: "Mã SP",
          //   //       key: "code",
          //   //     },
          //   //     {
          //   //       header: "Tên SP",
          //   //       key: "name",
          //   //     },
          //   //     {
          //   //       header: "Mã SP Kiot Việt",
          //   //       key: "kvCode",
          //   //     },
          //   //     {
          //   //       header: "Tên SP Kiot Việt",
          //   //       key: "kvName",
          //   //     },
          //   //   ]);

          //   //   exportExcelDemo.init("Mẫu nhập Kiot Việt");
          //   //   exportExcelDemo.demoSheet.addRows(
          //   //     exportData.map((it) => ({
          //   //       code: it.code,
          //   //       name: it.name,
          //   //       kvCode: it.kvCode,
          //   //       kvName: it.kvName,
          //   //     }))
          //   //   );
          //   //   exportExcelDemo.autoWidth(exportExcelDemo.demoSheet);

          //   //   exportExcelDemo.download("Mẫu nhập Kiot Việt.xlsx");
          //   // } catch (error) {
          //   //   console.log("Download mẫu failed", error);
          //   // } finally {
          //   //   setLoadingGetDataExport(false);
          //   // }
          // }}
          to="/exportFile/Mẫu nhập ZNS.xlsx"
          target="_blank"
          download
        >
          <Space>
            <DownloadOutlined />
            Tải file import mẫu
          </Space>
        </Link>

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
            console.log("excelData", excelData);
            getZaloZNSData(excelData);

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
      </Spin>

      {errorsData.length !== 0 && (
        <>
          <Table
            // pagination={{
            //   pageSize: 10,
            // }}
            style={{
              marginTop: "10px",
            }}
            size="small"
            columns={finalColumns}
            bordered
            rowKey="line"
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
      <Space
        style={{ width: "100%", justifyContent: "end", marginTop: "1em" }}
      ></Space>
    </Modal>
  );
};

export default ImportZaloZNSCustomer;
