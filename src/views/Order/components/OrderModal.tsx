import {
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Steps,
  Empty,
  Button,
  Table,
  InputNumber,
  Select,
} from "antd";
import { Rule } from "antd/lib/form";
import { orderApi } from "api/order.api";
import { productApi } from "api/product.api";
import { customerApi } from "api/customer.api";
import { cityApi } from "api/city.api";
import { districtApi } from "api/district.api";
import { wardApi } from "api/ward.api";
import React, { useEffect, useImperativeHandle, useState, useRef } from "react";
import { ModalStatus } from "types/modal";
import { Order, PaymentMethod } from "types/order";
import { CustomerModal } from "../../Customer/components/CustomerModal";
import { ProductSelectModal } from "./ProductSelectModal";

const rules: Rule[] = [{ required: true }];

export interface OrderModal {
  handleCreate: () => void;
  handleUpdate: (order: Order) => void;
}
interface OrderModalProps {
  onClose: () => void;
  onSubmitOk: () => void;
}

export const OrderModal = React.forwardRef(
  ({ onClose, onSubmitOk }: OrderModalProps, ref) => {
    const [form] = Form.useForm<Order>();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState<ModalStatus>("create");
    const [currentStep, setCurrentStep] = useState(0);
    const [cart, setCart] = useState<any[]>([]); // Sản phẩm trong giỏ hàng
    const [productModalVisible, setProductModalVisible] = useState(false);
    const [customerModalVisible, setCustomerModalVisible] = useState(false);
    const [customerOptions, setCustomerOptions] = useState<any[]>([]);
    const [customerLoading, setCustomerLoading] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
    const [selectedAddress, setSelectedAddress] = useState<any>(null); // Địa chỉ được chọn
    const [addressModalVisible, setAddressModalVisible] = useState(false);
    const [cityList, setCityList] = useState<any[]>([]);
    const [districtList, setDistrictList] = useState<any[]>([]);
    const [wardList, setWardList] = useState<any[]>([]);
    const [addressForm] = Form.useForm();
    const customerModalRef = useRef<any>(null);

    useImperativeHandle<any, OrderModal>(
      ref,
      () => ({
        handleCreate() {
          form.resetFields();
          setVisible(true);
          setStatus("create");
        },
        handleUpdate(order: Order) {
          form.setFieldsValue({ ...order });
          setVisible(true);
          setStatus("update");
        },
      }),
      []
    );

    const createData = async () => {
      const valid = await form.validateFields();
      const data = { order: form.getFieldsValue() };

      setLoading(true);
      try {
        const res = await orderApi.create(data);
        message.success("Create Order successfully!");
        onClose();
        onSubmitOk();
      } finally {
        setLoading(false);
      }
    };

    const updateData = async () => {
      const valid = await form.validateFields();
      const data = { order: form.getFieldsValue() };
      setLoading(true);
      try {
        const res = await orderApi.update(data.order.id || 0, data);
        message.success("Update Order successfully!");
        onClose();
        onSubmitOk();
      } finally {
        setLoading(false);
      }
    };

    // Thêm sản phẩm vào giỏ hàng (mở modal)
    const handleAddProduct = () => {
      setProductModalVisible(true);
    };

    // Khi chọn sản phẩm từ modal
    const handleSelectProduct = (product: any) => {
      setCart((prevCart) => {
        const idx = prevCart.findIndex(
          (item) => item.productId === product.id 
        );
        if (idx !== -1) {
          return prevCart.map((item, i) =>
            i === idx ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          // Nếu chưa có, thêm mới
          return [
            ...prevCart,
            {
              id: Date.now(), 
              productId: product.id,
              name: product.name,
              unitPrice: product.unitPrice ?? product.price,
              price: product.unitPrice ?? product.price,
              finalPrice: product.unitPrice ?? product.price,
              quantity: 1,
            },
          ];
        }
      });
      setProductModalVisible(false);
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const handleRemoveProduct = (id: number) => {
      setCart(cart.filter((item) => item.id !== id));
    };

    // Thay đổi số lượng sản phẩm trong giỏ hàng
    const handleChangeQuantity = (id: number, value: number) => {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: value } : item
        )
      );
    };

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalMoney = cart.reduce(
      (sum, item) => sum + (item.unitPrice || 0) * item.quantity,
      0
    );

    // Hàm tìm kiếm khách hàng realtime
    const handleCustomerSearch = async (value: string) => {
      setCustomerLoading(true);
      try {
        const res = await customerApi.findAll({
          search: value,
          page: 1,
          limit: 20,
        });
        setCustomerOptions(res.data?.items || res.data?.customers || []);
      } catch (e) {
        setCustomerOptions([]);
      } finally {
        setCustomerLoading(false);
      }
    };

    // Lấy danh sách tỉnh/thành
    const fetchCities = async () => {
      try {
        const res = await cityApi.findAll();
        setCityList(res.data?.items || []);
      } catch {}
    };
    // Lấy danh sách quận/huyện
    const fetchDistricts = async (cityCode: string) => {
      try {
        const res = await districtApi.findAll({ cityCode });
        setDistrictList(res.data?.items || []);
      } catch {}
    };
    // Lấy danh sách xã/phường
    const fetchWards = async (districtCode: string) => {
      try {
        const res = await wardApi.findAll({ districtCode });
        console.log("Ward API response:", res.data); // Thêm dòng này để kiểm tra dữ liệu trả về
        setWardList(res.data?.wards || res.data?.items || []);
      } catch (e) {
        console.error("Ward API error:", e);
      }
    };

    // Các bước
    const steps = [
      {
        title: "Giỏ hàng",
        content: (
          <>
            <Button
              type="primary"
              onClick={handleAddProduct}
              style={{ marginBottom: 16 }}
            >
              + Thêm sản phẩm
            </Button>
            <Table
              dataSource={cart}
              rowKey="id"
              pagination={false}
              bordered
              locale={{ emptyText: <Empty description="Trống" /> }}
            >
              <Table.Column title="Sản phẩm" dataIndex="name" key="name" />
              <Table.Column
                title={
                  <div style={{ textAlign: "right" }}>
                    Đơn giá
                    <div style={{ fontWeight: "normal", fontSize: 12 }}></div>
                  </div>
                }
                dataIndex="unitPrice"
                key="unitPrice"
                align="right"
                render={(v) => (v ? v.toLocaleString("vi-VN") : 0)}
              />
              <Table.Column
                title={
                  <div style={{ textAlign: "right" }}>
                    Khuyến mãi
                    <div style={{ fontWeight: "normal", fontSize: 12 }}></div>
                  </div>
                }
                key="discount"
                align="right"
                render={(_, r) =>
                  r.price && r.unitPrice && r.price - r.unitPrice > 0
                    ? (r.price - r.unitPrice).toLocaleString("vi-VN")
                    : 0
                }
              />
              <Table.Column
                title={<div style={{ textAlign: "right" }}>Số lượng</div>}
                dataIndex="quantity"
                key="quantity"
                align="right"
                render={(_, r) => (
                  <InputNumber
                    min={1}
                    value={r.quantity}
                    onChange={(value) => handleChangeQuantity(r.id, value || 1)}
                    style={{ width: 70 }}
                  />
                )}
              />
              <Table.Column
                title={
                  <div style={{ textAlign: "right" }}>
                    Thành tiền
                    <div style={{ fontWeight: "normal", fontSize: 12 }}></div>
                  </div>
                }
                key="total"
                align="right"
                render={(_, r) =>
                  ((r.unitPrice || 0) * r.quantity).toLocaleString("vi-VN")
                }
              />
              <Table.Column
                title="Hành động"
                key="action"
                render={(_, r) => (
                  <Button danger onClick={() => handleRemoveProduct(r.id)}>
                    Xóa
                  </Button>
                )}
              />
            </Table>
            <div style={{ marginTop: 16, textAlign: "right" }}>
              <b>Tổng kết</b> &nbsp; Số lượng: <b>{totalQuantity}</b> &nbsp;
              Thành tiền: <b>{totalMoney.toLocaleString("vi-VN")}</b>
            </div>
            <ProductSelectModal
              visible={productModalVisible}
              onSelect={handleSelectProduct}
              onCancel={() => setProductModalVisible(false)}
            />
          </>
        ),
      },
      {
        title: "Thông tin nhận hàng",
        content: (
          <>
            <Form layout="vertical" form={form} style={{ marginTop: 16 }}>
              <Form.Item label="Khách hàng">
                <div style={{ display: "flex", gap: 8 }}>
                  <Select
                    showSearch
                    allowClear
                    placeholder="Tìm kiếm khách hàng theo tên, số điện thoại, email"
                    loading={customerLoading}
                    filterOption={false}
                    onSearch={handleCustomerSearch}
                    onFocus={() => handleCustomerSearch("")}
                    onChange={(value) => {
                      const customer = customerOptions.find(
                        (c) => c.id === value
                      );
                      setSelectedCustomer(customer || null);
                      setSelectedAddress(null);
                    }}
                    value={selectedCustomer?.id}
                    style={{ width: 400 }}
                    optionFilterProp="children"
                    notFoundContent={
                      customerLoading
                        ? "Đang tải..."
                        : "Không tìm thấy khách hàng"
                    }
                  >
                    {customerOptions.map((c) => (
                      <Select.Option key={c.id} value={c.id}>
                        {c.fullName || c.name} - {c.phone}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </Form.Item>
              <Form.Item label="Thông tin nhận hàng">
                <div style={{ display: "flex", gap: 8 }}>
                  <Select
                    showSearch
                    allowClear
                    placeholder="Chọn địa chỉ nhận hàng từ KH."
                    value={selectedAddress?.id}
                    style={{ width: 400 }}
                    disabled={!selectedCustomer}
                    onChange={(value) => {
                      const addr = (selectedCustomer?.addresses || []).find(
                        (a: any) => a.id === value
                      );
                      setSelectedAddress(addr || null);
                      if (addr) {
                        form.setFieldsValue({
                          receiverName: addr.receiverName,
                          receiverPhone: addr.receiverPhone,
                          receiverAddress: addr.address,
                        });
                      } else {
                        form.setFieldsValue({
                          receiverName: undefined,
                          receiverPhone: undefined,
                          receiverAddress: undefined,
                        });
                      }
                    }}
                  >
                    {(selectedCustomer?.addresses || []).map((a: any) => (
                      <Select.Option key={a.id} value={a.id}>
                        {a.address}
                      </Select.Option>
                    ))}
                  </Select>
                  <Button
                    type="primary"
                    disabled={!selectedCustomer}
                    onClick={async () => {
                      setAddressModalVisible(true);
                      // Gọi lại API lấy tỉnh/thành khi mở modal
                      const res = await cityApi.findAll();
                      setCityList(res.data?.cities || res.data?.items || []);
                      // Truyền tên và phone vào form địa chỉ
                      addressForm.setFieldsValue({
                        receiverName:
                          selectedCustomer?.fullName ||
                          selectedCustomer?.name ||
                          "",
                        receiverPhone: selectedCustomer?.phone || "",
                        cityCode: undefined,
                        districtCode: undefined,
                        wardCode: undefined,
                        detail: undefined,
                      });
                      setDistrictList([]);
                      setWardList([]);
                    }}
                  >
                    Thêm mới
                  </Button>
                </div>
              </Form.Item>

              <div
                style={{
                  background: "#fafafa",
                  border: "1px solid #eee",
                  borderRadius: 4,
                  padding: 16,
                  marginBottom: 8,
                }}
              >
                <div>
                  <b>Khách hàng:</b>{" "}
                  {selectedCustomer
                    ? `${
                        selectedCustomer.fullName || selectedCustomer.name
                      } - ${selectedCustomer.phone}`
                    : "--"}
                </div>
                <div>
                  <b>Tên người nhận:</b> {selectedAddress?.receiverName || "--"}
                </div>
                <div>
                  <b>Số điện thoại người nhận:</b>{" "}
                  {selectedAddress?.receiverPhone || "--"}
                </div>
                <div>
                  <b>Địa chỉ người nhận:</b> {selectedAddress?.address || "--"}
                </div>
              </div>
            </Form>
            <Modal
              visible={addressModalVisible}
              title="Thêm mới địa chỉ nhận hàng"
              onCancel={() => setAddressModalVisible(false)}
              footer={null}
              width={500}
            >
              <Form form={addressForm} layout="vertical">
                <Form.Item
                  label="Tên người nhận"
                  name="receiverName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại người nhận"
                  name="receiverPhone"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Tỉnh/Thành phố"
                  name="cityCode"
                  rules={[{ required: true }]}
                >
                  <Select
                    showSearch
                    placeholder="Chọn tỉnh/thành phố"
                    optionFilterProp="children"
                    onChange={(cityCode) => {
                      addressForm.setFieldsValue({
                        districtCode: undefined,
                        wardCode: undefined,
                      });
                      setDistrictList([]);
                      setWardList([]);
                      const city = cityList.find(
                        (c) => c.code === cityCode || c.id === cityCode
                      );
                      const cityCodeVal = city?.code || cityCode;
                      if (cityCodeVal) {
                        districtApi
                          .findAll({ parentCode: cityCodeVal })
                          .then((res) => {
                            setDistrictList(
                              res.data?.items || res.data?.districts || []
                            );
                          });
                      }
                    }}
                    filterOption={(input, option) =>
                      (option?.label as string)
                        ?.toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={cityList.map((city) => ({
                      label: city.nameWithType || city.name,
                      value: city.code || city.id,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  label="Quận/Huyện"
                  name="districtCode"
                  rules={[{ required: true }]}
                >
                  <Select
                    showSearch
                    placeholder="Chọn quận/huyện"
                    optionFilterProp="children"
                    disabled={!addressForm.getFieldValue("cityCode")}
                    onChange={(districtCode) => {
                      addressForm.setFieldsValue({ wardCode: undefined });
                      setWardList([]);
                      const district = districtList.find(
                        (d) => d.code === districtCode || d.id === districtCode
                      );
                      const districtCodeVal = district?.code || districtCode;
                      if (districtCodeVal) {
                        wardApi
                          .findAll({ parentCode: districtCodeVal })
                          .then((res) => {
                            setWardList(
                              res.data?.items || res.data?.wards || []
                            );
                          });
                      }
                    }}
                    filterOption={(input, option) =>
                      (option?.label as string)
                        ?.toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={districtList.map((d) => ({
                      label: d.nameWithType || d.name,
                      value: d.code || d.id,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  label="Xã/Phường"
                  name="wardCode"
                  rules={[{ required: true }]}
                >
                  <Select
                    showSearch
                    placeholder="Chọn xã/phường"
                    options={wardList.map((w) => ({
                      label: w.nameWithType,
                      value: w.code,
                    }))}
                    disabled={!addressForm.getFieldValue("districtCode")}
                  />
                </Form.Item>
                <Form.Item
                  label="Địa chỉ cụ thể"
                  name="detail"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Số nhà và tên đường" />
                </Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 8,
                  }}
                >
                  <Button onClick={() => setAddressModalVisible(false)}>
                    Hủy
                  </Button>
                  <Button
                    type="primary"
                    onClick={async () => {
                      const values = await addressForm.validateFields();
                      const newAddress = {
                        id: Date.now(),
                        ...values,
                        address: `${values.detail}, ${
                          wardList.find((w) => w.code === values.wardCode)
                            ?.nameWithType || ""
                        }, ${
                          districtList.find(
                            (d) => d.code === values.districtCode
                          )?.nameWithType || ""
                        }, ${
                          cityList.find((c) => c.code === values.cityCode)
                            ?.nameWithType || ""
                        }`,
                      };
                      if (selectedCustomer) {
                        selectedCustomer.addresses = [
                          ...(selectedCustomer.addresses || []),
                          newAddress,
                        ];
                        setSelectedAddress(newAddress);
                      }
                      setAddressModalVisible(false);
                      addressForm.resetFields();
                    }}
                  >
                    OK
                  </Button>
                </div>
              </Form>
            </Modal>
          </>
        ),
      },
      {
        title: "Thông đơn hàng",
        content: (
          <div style={{ marginTop: 16 }}>
            <b>Kiểm tra lại thông tin đơn hàng trước khi xác nhận.</b>
            <div style={{ marginTop: 8 }}>
              <b>Sản phẩm:</b>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} x {item.quantity} -{" "}
                    {(item.finalPrice * item.quantity).toLocaleString("vi-VN")}đ
                  </li>
                ))}
              </ul>
              <b>Người nhận:</b>{" "}
              {form.getFieldValue("receiverName") ||
                selectedAddress?.receiverName ||
                "--"}
              <br />
              <b>SĐT:</b>{" "}
              {form.getFieldValue("receiverPhone") ||
                selectedAddress?.receiverPhone ||
                "--"}
              <br />
              <b>Địa chỉ:</b>{" "}
              {form.getFieldValue("receiverAddress") ||
                selectedAddress?.address ||
                "--"}
              <div style={{ marginTop: 8 }}>
                <b>Tổng tiền:</b> {totalMoney.toLocaleString("vi-VN")}đ
              </div>
              {/* Thêm chọn phương thức thanh toán */}
              <Form
                form={form}
                layout="vertical"
                style={{ marginTop: 16, maxWidth: 300 }}
              >
                <Form.Item
                  name="paymentMethod"
                  label="Phương thức thanh toán"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn phương thức thanh toán!",
                    },
                  ]}
                  initialValue={PaymentMethod.COD}
                >
                  <Select>
                    <Select.Option value={PaymentMethod.COD}>
                      Thanh toán khi nhận hàng (COD)
                    </Select.Option>
                    <Select.Option value={PaymentMethod.BankTransfer}>
                      Chuyển khoản ngân hàng
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Form>
            </div>
          </div>
        ),
      },
    ];

    const getWardId = () => {
      // Nếu selectedAddress.wardId có, ưu tiên dùng
      if (selectedAddress?.wardId) return Number(selectedAddress.wardId);
      // Nếu chỉ có wardCode, map sang id từ wardList
      if (selectedAddress?.wardCode) {
        const found = wardList.find((w) => w.code == selectedAddress.wardCode);
        return found ? Number(found.id) : 0;
      }
      return 0;
    };

    return (
      <Modal
        onCancel={() => {
          onClose?.();
          setVisible(false);
          setCurrentStep(0);
          setCart([]);
        }}
        visible={visible}
        title="Tạo đơn hàng"
        style={{ top: 20 }}
        width={900}
        footer={null}
      >
        <Steps current={currentStep} style={{ marginBottom: 24 }}>
          {steps.map((item) => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div>{steps[currentStep].content}</div>
        <div style={{ marginTop: 24, textAlign: "right" }}>
          <Button
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
            style={{ marginRight: 8 }}
          >
            Quay lại
          </Button>
          {currentStep < steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                if (currentStep === 1 && selectedAddress) {
                  form.setFieldsValue({
                    receiverName: selectedAddress.receiverName,
                    receiverPhone: selectedAddress.receiverPhone,
                    receiverAddress: selectedAddress.address,
                  });
                }
                setCurrentStep(currentStep + 1);
              }}
              disabled={currentStep === 0 && cart.length === 0}
            >
              Tiếp tục
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button
              type="primary"
              loading={loading}
              onClick={async () => {
                try {
                  await form.validateFields();
                  if (!selectedCustomer || !selectedCustomer.id) {
                    message.error(
                      "Vui lòng chọn khách hàng trước khi xác nhận!"
                    );
                    return;
                  }
                  // Đảm bảo form luôn có thông tin nhận hàng đúng
                  if (selectedAddress) {
                    form.setFieldsValue({
                      receiverName: selectedAddress.receiverName,
                      receiverPhone: selectedAddress.receiverPhone,
                      receiverAddress: selectedAddress.address,
                    });
                  }
                  setLoading(true);
                  const formData = form.getFieldsValue();
                  const payload = {
                    order: {
                      receiverName:
                        formData.receiverName ||
                        selectedAddress?.receiverName ||
                        "",
                      receiverPhone:
                        formData.receiverPhone ||
                        selectedAddress?.receiverPhone ||
                        "",
                      receiverAddress:
                        formData.receiverAddress ||
                        selectedAddress?.address ||
                        "",
                      note: "",
                      paymentMethod:
                        formData.paymentMethod || PaymentMethod.COD, // <-- Lấy từ form
                    },
                    details: cart.map((item) => ({
                      productId: item.productId,
                      quantity: item.quantity,
                      manualDiscount: 0,
                      name: item.name,
                    })),
                    customerId: Number(selectedCustomer.id),
                    cityId:
                      Number(
                        selectedAddress?.cityId || selectedAddress?.cityCode
                      ) || 0,
                    districtId:
                      Number(
                        selectedAddress?.districtId ||
                          selectedAddress?.districtCode
                      ) || 0,
                    wardId: getWardId(),
                  };
                  await orderApi.create(payload);
                  message.success("Tạo đơn hàng thành công!");
                  setVisible(false);
                  setCurrentStep(0);
                  setCart([]);
                  onSubmitOk();
                } catch (e) {
                  // Có thể show message lỗi ở đây nếu muốn
                } finally {
                  setLoading(false);
                }
              }}
            >
              Xác nhận
            </Button>
          )}
        </div>
        {customerModalVisible && (
          <CustomerModal
            visible={customerModalVisible}
            onCancel={() => setCustomerModalVisible(false)}
            onOk={(newCustomer) => {
              setCustomerOptions((prev) => [newCustomer, ...prev]);
              setSelectedCustomer(newCustomer);
              setCustomerModalVisible(false);
            }}
            ref={customerModalRef}
            onClose={() => {}}
            onSubmitOk={async () => {
              // Sau khi thêm mới, reload lại danh sách khách hàng
              await handleCustomerSearch("");
            }}
          />
        )}
      </Modal>
    );
  }
);
