import React, { useRef } from "react";
import { Pagination as AntPagination, PaginationProps } from "antd";

export interface IPagination {
  total: number;
  showTotal?: boolean;
  onChange: ({ page, limit }: { page: number; limit: number }) => void;
  currentPage: number;
  defaultPageSize?: number;
  scrollTop?: boolean;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  totalText?: string;
}

export const Pagination = ({
  total,
  onChange,
  currentPage,
  defaultPageSize = 50,
  showTotal = true,
  scrollTop = true,
  showSizeChanger,
  showQuickJumper,
  totalText,
}: IPagination) => {
  return (
    <AntPagination
      current={currentPage}
      style={{ marginTop: 12 }}
      total={total}
      showSizeChanger={showSizeChanger}
      onChange={(page, limit) => {
        onChange({
          page,
          limit,
        });
        scrollTop ? (document.body.scrollTop = 0) : undefined; // For Safari
        scrollTop ? (document.documentElement.scrollTop = 0) : undefined;
      }}
      // onShowSizeChange={(limit) => {
      //   onChange({
      //     page: currentPage,
      //     limit,
      //   });
      //   document.body.scrollTop = 0; // For Safari
      //   document.documentElement.scrollTop = 0;
      // }}
      showQuickJumper={showQuickJumper}
      defaultPageSize={defaultPageSize}
      showTotal={(total) =>
        showTotal ? totalText || `Tổng ${total} dòng` : null
      }
    />
  );
};
