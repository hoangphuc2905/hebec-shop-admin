import { Form, message } from "antd";
import { customerFilterApi } from "api/customer-filter.api";
import { useFetchTableData } from "hooks/useFetchTableData";
import { CustomerFilter } from "types/customer-filter";
import { QueryParam } from "types/query";

interface Props {
  initQuery?: QueryParam;
}

export function useHandlerCustomerFilter({
  initQuery = {} as QueryParam,
}: Props) {
  const [form] = Form.useForm<any>();
  const fetch = useFetchTableData<CustomerFilter>({
    initQuery,
    queryFunc: async (query) => {
      const res = await customerFilterApi.findAll(query);
      return { data: res.data.customerFilters, total: res.data.total };
    },
    deleteFunc: async (id) => {
      await customerFilterApi.delete(id);
      message.info("Xóa thành công!");
    },
    createFunc: async () => {
      await form!.validateFields();
      const data = {
        customerFilter: form!.getFieldsValue(),
      };
      await customerFilterApi.create(data);
      message.success("Tạo mới thành công!");
    },
    editFunc: async (id) => {
      await form!.validateFields();
      const data = {
        customerFilter: form!.getFieldsValue(),
      };
      await customerFilterApi.update(id, data);
      message.success("Cập nhật thành công!");
    },
  });

  return { ...fetch, form };
}
