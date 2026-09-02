"use client";
import React from "react";
import Link from "next/link";
import "@/app/globals.css";
import "@/app/assets/materialize.css";
import "@/app/assets/style.css";
import { EllipsisOutlined, StarOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import AdminSignOut from "@/components/admin-sign-out";
const { Header, Content, Sider } = Layout;

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [
  {
    key: "project",
    icon: <EllipsisOutlined />,
    label: "專案",
    children: [
      {
        key: "/admin/projects",
        label: <Link href="/admin/projects">作品列表</Link>,
      },
      {
        key: "/admin/projects/create",
        label: <Link href="/admin/projects/create">新增專案</Link>,
      },
    ],
  },
  {
    key: "news",
    icon: <StarOutlined />,
    label: "最新消息",
    children: [
      {
        key: "/admin/news/dataIndex",
        label: <Link href="/admin/news/">最新消息列表</Link>,
      },
      {
        key: "/admin/news/create",
        label: <Link href="/admin/news/create">新增最新消息</Link>,
      },
    ],
  },
];

export default function AdminLayout({ children }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <html lang="zh-tw">
      <body>
        <Layout>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="demo-logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={items1}
              style={{
                flex: 1,
                minWidth: 0,
              }}
            />
            <AdminSignOut />
          </Header>
          <Layout>
            <Sider
              width={200}
              style={{
                background: colorBgContainer,
              }}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{
                  height: "100%",
                  borderRight: 0,
                }}
                items={items2}
              />
            </Sider>
            <Layout
              style={{
                padding: "0 24px 24px",
              }}
            >
              <Breadcrumb
                items={[
                  {
                    title: "Home",
                  },
                  {
                    title: "List",
                  },
                  {
                    title: "App",
                  },
                ]}
                style={{
                  margin: "16px 0",
                }}
              />
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}
