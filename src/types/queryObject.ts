export type QueryObject = SortType | SingleFiler | RangeFilter | MultiFiler;

type MultiFiler = {
  type: "multi-filter";
  field: string;
  value: string[];
};

type SingleFiler = {
  type: "single-filter";
  field: string;
  value: string;
  operator?: string;
};

type RangeFilter = {
  type: "range";
  field: string;
  value1: string;
  value2: string;
  operator1?: string;
  operator2?: string;
};

type SortType = {
  type: "sort";
  field: string;
  value: "ASC" | "DESC";
};
