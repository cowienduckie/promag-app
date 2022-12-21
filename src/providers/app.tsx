import * as React from "react";
import { Loading } from "@/components/screens";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { ConfigProvider } from "antd";
import { themeConfig } from "@/config";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ConfigProvider theme={themeConfig}>
      <React.Suspense fallback={<Loading />}>
        <AuthProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </AuthProvider>
      </React.Suspense>
    </ConfigProvider>
  );
};
