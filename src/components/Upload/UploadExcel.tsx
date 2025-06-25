import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { ExcelUtil } from "utils/ExcelUtil";

const { Dragger } = Upload;

interface UploadExcelProps {
  onOk: ({ headers, data }: { headers: string[]; data: any[] }) => void;
}

export const UploadExcel = ({ onOk }: UploadExcelProps) => {
  return (
    <Dragger
      style={{ marginTop: "0.5em" }}
      maxCount={1}
      multiple={false}
      beforeUpload={(file) => {
        //Check file type
        const isExcelFile = file.name.includes("xls" || "xlsx");
        if (!isExcelFile) {
          message.error("You can only upload XLSX/XLS file!");
          return Upload.LIST_IGNORE;
        }
        ExcelUtil.readExcel(file).then((data: any) => {
          onOk(data);
        });
        return false;
      }}
      onChange={(info) => {
        //reset data
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click hoặc kéo file excel vào đây</p>
    </Dragger>
  );
};
