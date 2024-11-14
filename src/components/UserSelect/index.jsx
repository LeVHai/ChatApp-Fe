import React, { useMemo, useState } from "react";
import { Select, Spin, Avatar, Space, Flex, Typography, Tag } from "antd";
import debounce from "lodash/debounce";
import { useDispatch } from "react-redux";
import { searchUser } from "../../core/action/userAction";

export const UserSelect = ({
  value,
  style,
  debounceTimeout = 800,
  onChange,
  maxTagCount,
  ...props
}) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);
      dispatch(
        searchUser({ search: value, limit: 10, page: 1 }, (res) => {
          if (res.status === 200) {
            setOptions(res.data.data);
          }
          setFetching(false);
        })
      );
    };
    return debounce(loadOptions, debounceTimeout);
  }, [dispatch, debounceTimeout]);

  const handleChange = (value) => {
    const selectedIds = value.map((item) => item.value);
    if (onChange) {
      onChange(selectedIds);
    }
  };

  return (
    <Select
      mode="multiple"
      maxTagCount={maxTagCount}
      style={style}
      value={value}
      allowClear={true}
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
      fieldNames={{ label: "name", value: "_id" }}
      onChange={handleChange}
      tagRender={(option) => {
        return (
          <Tag style={{display:"flex", alignItems:"center" ,gap:"5px"}}>
              <Avatar size={20} />
              <Typography.Text>{option.label}</Typography.Text>
          </Tag>
        );
      }}
      optionRender={(option) => (
        <Space>
          <Avatar src={option?.avatar} />
          <Flex vertical>
            <span>{option.label}</span>
            <span style={{ fontSize: 12 }}>{option.data.email}</span>
          </Flex>
        </Space>
      )}
    />
  );
};
