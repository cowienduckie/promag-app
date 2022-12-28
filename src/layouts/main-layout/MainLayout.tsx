import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import { useMenuData } from "./data";
import { useLocation } from "react-router-dom";

const { Content, Sider } = Layout;

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const { menuItems } = useMenuData();
  const location = useLocation();
  const activeMenuItem =
    "/" + location.pathname.split("/").slice(1, 3).join("/");

  return (
    <Layout className="min-h-screen bg-blue-100">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <h1 className="my-5 text-center text-2xl font-bold text-white">
          {!collapsed ? "PROMAG" : "PM"}
        </h1>
        <Menu
          theme="dark"
          className="bg-inherit pt-5"
          mode="inline"
          selectedKeys={Array<string>(activeMenuItem)}
          items={menuItems}
        />
      </Sider>
      <Layout className="bg-inherit">
        <Content
          className="border-1 m-5 rounded shadow-md"
          style={{ background: colorBgContainer }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
