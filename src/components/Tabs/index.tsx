import { Segmented, TabPaneProps } from "antd";

interface MyTabProps {
  defaultActiveKey: string;
  tabs: TabPaneProps[];
  onTabClick: (
    activeKey: string,
    e: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>
  ) => void;
}

const MyTabs = ({ tabs, onTabClick, defaultActiveKey }: MyTabProps) => {
  const options = tabs.map((item) => ({ label: item.tab, value: item.tabKey }));
  return (
    <Segmented
      //@ts-ignore
      options={options}
      //@ts-ignore
      onChange={(value) => onTabClick(value)}
      defaultValue={defaultActiveKey}
    />
  );
};

export default MyTabs;
