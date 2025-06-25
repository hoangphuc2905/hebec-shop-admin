import { InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  FormInstance,
  Input,
  Popconfirm,
  Row,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import Column from "antd/lib/table/Column";
import Title from "antd/lib/typography/Title";
import { InputNumberVN } from "components/InputNumberVN/InputNumberVN";
import { debounce, uniqueId } from "lodash";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Product } from "types/product";
import {
  PromotionCampaign,
  PromotionCampaignDetail,
  PromotionConditionType,
  PromotionDiscountType,
} from "types/promotion-campaign";
import { formatVND } from "utils";
import { IFlashSaleProduct } from "views/PromotionCampaign/components/PromotionProductsSection";
import {
  ISelectProductsPromotionModalInterface,
  SelectProductsPromotionModal,
} from "./components/SelectProductsPromotionModal";
import moment from "moment";
import { useWatch } from "antd/lib/form/Form";

export interface IPromotionProductSelectRef {
  resetData: () => void;
  setData: (data: Product[]) => void;
}

export const PromotionProductSelect = React.forwardRef(
  (
    {
      isGift,
      discountType,
      form,
      isDisable = false,
    }: {
      isGift?: boolean;
      isDisable?: boolean;
      discountType: PromotionDiscountType;
      form: FormInstance<PromotionCampaign>;
    },
    ref
  ) => {
    const [productsSrc, setProductsSrc] = useState<Product[]>([]);
    const selectProductsModalRef =
      useRef<ISelectProductsPromotionModalInterface>();
    const conditionType = useWatch("conditionType", form);

    useImperativeHandle(
      ref,
      () => {
        return {
          resetData() {
            setProductsSrc([]);
          },
          setData(data: PromotionCampaignDetail[]) {
            console.log("OPEN DATA: ", data);
            const finalData = data.map((item) => ({
              ...item?.product,
              ...item,
              promotionCampaignDetailId: item.id,
              id: item.product.id,
            }));

            console.log(finalData);

            setProductsSrc(finalData);
          },
        };
      },
      []
    );

    const handleOnDeleteRow = (id: number, record?: Product) => {
      //Xóa giá trị trong form ( tránh trường hợp lấy giá trị cũ khi thêm lại sản phẩm )

      //Xóa số lượng tặng đối với quà tặng
      if (isGift) {
        form.setFieldsValue({
          [`product-quantity-${id}`]: 1,
        });
      } else {
        //Xóa số lượng cần đối với sản phẩm khuyến mãi
        form.setFieldsValue({
          [`quantity-${id}`]: 1,
        });
      }

      const newProducts = productsSrc.filter((product) => product.id !== id);
      setProductsSrc(newProducts);
    };

    const checkForm = () => {
      let isValidate = true;
      const { startAt, endAt, isStartNow } = form.getFieldsValue([
        "startAt",
        "endAt",
        "isStartNow",
      ]);

      if (!startAt && !isStartNow) {
        form.setFields([
          {
            name: "startAt",
            errors: ["Vui lòng chọn ngày bắt đầu"],
          },
        ]);
        isValidate = false;
      }
      if (!endAt) {
        form.setFields([
          {
            name: "endAt",
            errors: ["Vui lòng chọn ngày kết thúc"],
          },
        ]);
        isValidate = false;
      }

      if (!isValidate) {
        message.error("Vui lòng chọn ngày bắt đầu, ngày kết thúc");
      }

      return isValidate;
    };

    const debounceOnChangePercent = useCallback(
      debounce((percent, index) => {
        let finalPercent = percent;
        if (percent > 50) {
          finalPercent = 50;
        }
        if (percent < 0) {
          finalPercent = 0;
        }
        //cập nhật giá trị vào state
        const productPrice = productsSrc[index].unitPrice;
        //@ts-ignore
        productsSrc[index].discountPercent = finalPercent;
        productsSrc[index].finalPrice = Math.floor(
          productPrice - (productPrice * finalPercent) / 100
        );

        setProductsSrc([...productsSrc]);
      }, 300),
      [productsSrc]
    );

    useEffect(() => {
      const finalData = productsSrc.map((item) => ({
        ...item,
        productId: item.id,
        isGift,
      }));
      if (isGift) {
        form.setFieldsValue({
          giftsDetails: finalData,
        });
      } else {
        form.setFieldsValue({
          promotionCampaignDetails: finalData,
        });
      }
      form.setFieldsValue({
        conditionType: PromotionConditionType.SomeProduct,
      });
    }, [productsSrc, isGift]);

    return (
      <>
        <Form form={form}>
          <Form.Item
            hidden
            name={isGift ? "giftsDetails" : "promotionCampaignDetails"}
          >
            <Input />
          </Form.Item>

          <Card style={{ marginTop: "1em" }}>
            <section>
              {/* giá trị{conditionType} */}
              <Space size={10}>
                <Title level={4}>
                  {isGift ? "Quà tặng" : "Sản phẩm áp dụng khuyến mãi"}
                </Title>
                <Button
                  hidden={
                    !isGift &&
                    conditionType == PromotionConditionType.AllProduct
                  }
                  style={{ marginBottom: 10 }}
                  disabled={isDisable}
                  onClick={() => {
                    if (!checkForm()) return;
                    const { startAt, endAt, isStartNow } = form.getFieldsValue([
                      "startAt",
                      "endAt",
                      "isStartNow",
                    ]);

                    console.log(startAt, endAt, isStartNow);

                    console.log(productsSrc);

                    selectProductsModalRef.current?.open(
                      {
                        //@ts-ignore
                        startAt: isStartNow ? moment().unix() : startAt?.unix(),
                        //@ts-ignore
                        endAt: endAt?.unix(),
                        isVariantProduct: true,
                      },
                      productsSrc
                    );
                  }}
                >
                  <PlusCircleOutlined /> Thêm sản phẩm
                </Button>{" "}
              </Space>
              <Form.Item hidden name={"conditionType"}></Form.Item>

              <Row
                style={{ marginTop: "1em" }}
                hidden={
                  !isGift && conditionType == PromotionConditionType.AllProduct
                }
              >
                <Col span={24}>
                  <Table
                    pagination={false}
                    rowKey="id"
                    dataSource={productsSrc}
                  >
                    <Column
                      title="Ảnh SP"
                      dataIndex="image"
                      key="product.image"
                      render={(text) => <img width={46} src={text}></img>}
                    />
                    <Column title="Mã SP" dataIndex="code" key="product.code" />
                    <Column
                      title="Tên SP"
                      dataIndex="name"
                      key="product.name"
                      render={(text, record: Product) => text}
                    />
                    <Column
                      align="right"
                      title="Giá gốc"
                      dataIndex="unitPrice"
                      key="product.unitPrice"
                      render={(text, record: Product, index) =>
                        text
                          ? formatVND(text)
                          : formatVND(record.minPrice) +
                            (record.minPrice == record.maxPrice
                              ? ""
                              : "-" + formatVND(record.maxPrice))
                      }
                    />
                    {discountType == PromotionDiscountType.Percent && (
                      <Column
                        width={130}
                        align="right"
                        title={
                          <>
                            <Tooltip title={"Tối đa 50%"}>
                              Phần trăm giảm{" "}
                            </Tooltip>

                            <InfoCircleOutlined style={{ fontSize: 12 }} />
                          </>
                        }
                        dataIndex="discountPercent"
                        key="product.discountPercent"
                        render={(text, record: Product, index) => (
                          <InputNumberVN
                            width={50}
                            disabled={isDisable}
                            //@ts-ignore
                            addonAfter="%"
                            // defaultValue={0}
                            min={0}
                            max={50}
                            onChange={(e) => debounceOnChangePercent(e, index)}
                            onBlur={(e) => debounceOnChangePercent(e, index)}
                            //@ts-ignore
                            value={record.discountPercent}
                          />
                        )}
                      />
                    )}

                    {discountType !== PromotionDiscountType.Gift && (
                      <Column
                        align="right"
                        width={200}
                        title="Giá sau khuyến mãi"
                        dataIndex="finalPrice"
                        key="product.finalPrice"
                        render={(text, record: IFlashSaleProduct, index) =>
                          formatVND(record.finalPrice)
                        }
                      />
                    )}
                    {!isGift && discountType == PromotionDiscountType.Gift && (
                      <Column
                        align="right"
                        width={200}
                        title="Số lượng cần mua"
                        dataIndex="needed"
                        key="product.needed"
                        render={(text, record: Product, index) => {
                          return (
                            <Form.Item
                              initialValue={text || 1}
                              noStyle
                              name={`quantity-${record.id}`}
                            >
                              <InputNumberVN
                                onBlur={() => setProductsSrc([...productsSrc])}
                                onChange={(value) => {
                                  productsSrc[index].needed = Number(value);
                                }}
                                // defaultValue={text}
                                readOnly={isDisable}
                                //@ts-ignore
                                controls={false}
                                //@ts-ignore
                                className="input-text-align-right"
                                style={{
                                  pointerEvents: isDisable ? "none" : "unset",
                                  border: isDisable
                                    ? "unset"
                                    : "thin solid rgba(0,0,0,0.1)",
                                  textAlign: "right",
                                }}
                              />
                            </Form.Item>
                          );
                        }}
                      />
                    )}

                    {isGift && discountType == PromotionDiscountType.Gift && (
                      <Column
                        align="right"
                        width={200}
                        title="Số lượng tặng"
                        dataIndex="quantity"
                        key="product.quantity"
                        render={(text, record: Product, index) => {
                          return (
                            <Form.Item
                              initialValue={text || 1}
                              noStyle
                              name={`product-quantity-${record.id}`}
                            >
                              <InputNumberVN
                                defaultValue={text}
                                onBlur={() => setProductsSrc([...productsSrc])}
                                onChange={(value) => {
                                  productsSrc[index].quantity = Number(value);
                                }}
                                readOnly={isDisable}
                                //@ts-ignore
                                controls={false}
                                //@ts-ignore
                                className="input-text-align-right"
                                style={{
                                  pointerEvents: isDisable ? "none" : "unset",
                                  border: isDisable
                                    ? "unset"
                                    : "thin solid rgba(0,0,0,0.1)",
                                  textAlign: "right",
                                }}
                              />
                            </Form.Item>
                          );
                        }}
                      />
                    )}

                    <Column
                      title="Thao tác"
                      key="action"
                      render={(text, record: Product) => (
                        <span>
                          <Popconfirm
                            disabled={isDisable}
                            placement="top"
                            title="Xác nhận xóa sản phẩm này"
                            cancelText="Đóng"
                            okText="Xóa"
                            onConfirm={() =>
                              handleOnDeleteRow(record.id, record)
                            }
                          >
                            <Button disabled={isDisable} danger>
                              Xóa
                            </Button>
                          </Popconfirm>
                        </span>
                      )}
                    />
                  </Table>
                </Col>
              </Row>

              <SelectProductsPromotionModal
                isGift={true}
                ref={selectProductsModalRef}
                onOk={(selectedProducts: Product[]) => {
                  setProductsSrc((old) => {
                    const newProductSrc = selectedProducts.map((data) => ({
                      ...data,
                      quantity: isGift
                        ? form.getFieldValue(`product-quantity-${data.id}`) || 1
                        : 0,
                      needed: isGift
                        ? 0
                        : form.getFieldValue(`quantity-${data.id}`) || 1,
                      product: data,
                    }));
                    return newProductSrc;
                  });
                  selectProductsModalRef.current?.close();
                }}
              />
            </section>
          </Card>
        </Form>
      </>
    );
  }
);
