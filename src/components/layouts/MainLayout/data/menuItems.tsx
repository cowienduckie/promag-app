import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

export const useMenuData = () => {
  const menuItems: MenuItem[] = [
    getItem("Dashboard", "1", <PieChartOutlined />),
    getItem("Projects", "2", <DesktopOutlined />),
    getItem("User", "sub1", <UserOutlined />, [
      getItem("Minh Tran", "3"),
      getItem("Trang Nguyen", "4")
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8")
    ]),
    getItem("Files", "9", <FileOutlined />)
  ];

  return { menuItems };
};
