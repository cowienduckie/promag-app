import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

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
    getItem(<Link to="/app">Dashboard</Link>, "/app", <PieChartOutlined />),
    getItem(
      <Link to="/app/projects/list">Projects</Link>,
      "/app/projects",
      <DesktopOutlined />
    )
  ];

  return { menuItems };
};
