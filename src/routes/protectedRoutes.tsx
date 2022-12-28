import React from "react";
import { Loading } from "@/components/screens";
import { Outlet } from "react-router";
import { MainLayout } from "@/layouts";
import { ProjectRoutes } from "@/features/project";
import { ErrorScreen } from "@/components/screens/error";

const App = () => {
  return (
    <MainLayout>
      <React.Suspense fallback={<Loading />}>
        <Outlet />
      </React.Suspense>
    </MainLayout>
  );
};
export const protectedRoutes = [
  {
    path: "/app",
    element: <App />,
    errorElement: <ErrorScreen />,
    children: [{ ...ProjectRoutes }]
  }
];
