import { Select, Spin } from "antd";
import type { SelectProps } from "antd/es/select";
import { newsTagApi } from "api/news-tag.api";
import debounce from "lodash/debounce";
import React, { useEffect, useMemo, useRef, useState } from "react";

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
  defaultOptions?: any[];
  api: any;
  dataField: string;
}

function InputSelect<
  ValueType extends { key?: string; label: React.ReactNode } = any
>({
  fetchOptions,
  debounceTimeout = 800,
  defaultOptions = [],
  api,
  dataField,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>(defaultOptions);
  const fetchRef = useRef(0);

  useEffect(() => {
    if (defaultOptions.length) {
      setOptions(defaultOptions);
    }
  }, [defaultOptions]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await api({ page: 1, limit: 50 });
    setOptions(res.data[dataField]);
  };

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      filterOption={false}
      optionLabelProp="name"
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      fieldNames={props.fieldNames}
      options={options}
    />
  );
}

export default React.memo(InputSelect);
