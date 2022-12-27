import * as React from "react";
import { Loading } from "@/components/screens";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { ConfigProvider } from "antd";
import { themeConfig } from "@/config";
import { AppRoutes } from "@/routes";

const router = createBrowserRouter(AppRoutes());

export const AppProvider = () => {
  return (
    <ConfigProvider theme={themeConfig}>
      <React.Suspense fallback={<Loading />}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </React.Suspense>
    </ConfigProvider>
  );
};
