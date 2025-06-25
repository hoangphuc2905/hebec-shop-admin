import { Button, Spin } from "antd";
import { Pagination } from "components/Pagination";
import { useProduct } from "hooks/useProduct";
import { useProductCategory } from "hooks/useProductCategory";
import { useEffect, useState } from "react";
import { settings } from "settings";
import { Product } from "types/product";
import { ProductCategory } from "types/product-category";
import { formatVND, getTitle } from "utils";

const ClientPage = ({ title = "" }) => {
  const {
    fetchData: fetchProductCategory,
    loading: loadingProductCategory,
    productCategories,
  } = useProductCategory({ initQuery: { limit: 100, page: 1 } });
  const {
    fetchData: fetchProduct,
    loading: loadingProduct,
    products,
    query,
    setQuery,
    total,
  } = useProduct({ initQuery: { limit: 8, page: 1 } });

  const [currCate, setCurrCate] = useState<ProductCategory>();

  useEffect(() => {
    document.title = getTitle(title);
    fetchProductCategory();
  }, []);

  useEffect(() => {
    query.productCategoryId = currCate?.id;
    setQuery({ ...query });
    fetchProduct({ ...query });
  }, [currCate]);

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "10px",
        position: "relative",
      }}
    >
      <div
        style={{
          flexShrink: "0",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          borderRadius: "6px",
          boxShadow: "0px 2px 5px #cecece",
          height: "fit-content",
        }}
      >
        <h1>Danh mục sản phẩm</h1>
        <Button
          danger
          disabled={!currCate}
          style={{ margin: "0 0 10px" }}
          onClick={() => {
            setCurrCate(undefined);
          }}
        >
          Bỏ lọc
        </Button>
        {productCategories.map((cate, i) => (
          <ProductCategoryItem
            isCurrent={currCate?.id == cate.id}
            item={cate}
            key={i}
            onClick={(item) => {
              setCurrCate(item);
            }}
          />
        ))}
      </div>
      <div
        style={{
          width: "100%",
          padding: "10px",
        }}
      >
        <h1>Danh sách sản phẩm</h1>
        <Spin spinning={loadingProduct}>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "20px",
            }}
          >
            {products.map((product, i) => (
              <ProductItem
                currCate={currCate}
                item={product}
                key={i}
                onClick={(item) => {}}
              />
            ))}
          </div>
        </Spin>
        <Pagination
          defaultPageSize={query.limit}
          currentPage={query.page}
          total={total}
          totalText={`Tổng ${total} sản phẩm`}
          onChange={({ limit, page }) => {
            query.limit = limit;
            query.page = page;
            setQuery({ ...query });
            fetchProduct({ ...query });
          }}
        />
      </div>
    </div>
  );
};

export default ClientPage;

interface ProductCategoryItemProps {
  item: ProductCategory;
  onClick?: (item: ProductCategory) => void;
  isCurrent: boolean;
}
const ProductCategoryItem = ({
  item,
  onClick,
  isCurrent,
}: ProductCategoryItemProps) => {
  console.log({ isCurrent });
  return (
    <div
      className="product-category-item"
      style={{
        backgroundColor: isCurrent ? "#a3d2ff" : "",
        fontWeight: isCurrent ? "600" : "normal",
      }}
      onClick={() => onClick?.(item)}
    >
      {item.name}
    </div>
  );
};
interface ProductItemProps {
  item: Product;
  currCate?: ProductCategory;
  onClick?: (item: Product) => void;
}
const ProductItem = ({ item, currCate, onClick }: ProductItemProps) => {
  return (
    <div className="product-item" style={{}} onClick={() => onClick?.(item)}>
      <div className="product-item_image">
        <img
          src={item.image || settings.productDefault}
          className="product-item_image_blur"
        />
        <img
          src={item.image || settings.productDefault}
          className="product-item_image_main"
        />
      </div>
      <div className="product-item_info">
        <div style={{ color: "red", fontWeight: 500, fontSize: 18 }}>
          {formatVND(item.unitPrice)}
        </div>
        <h2 style={{ lineHeight: "1.5rem" }}>{item.name}</h2>
        <div>{item.description}</div>
      </div>
    </div>
  );
};
