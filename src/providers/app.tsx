import * as React from "react";
import { Loading } from "@/components/screens";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { AppRoutes } from "@/routes";
import { StyleProvider } from "@ant-design/cssinjs";

const router = createBrowserRouter(AppRoutes());

export const AppProvider = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <StyleProvider hashPriority="high">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </StyleProvider>
    </React.Suspense>
  );
};
