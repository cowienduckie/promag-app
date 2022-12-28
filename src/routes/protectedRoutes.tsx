import React from "react";
import { Loading } from "@/components/screens";
import { Outlet } from "react-router";
import { MainLayout } from "@/components/layouts";
import { ProjectRoutes } from "@/features/project";

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
    children: [{ ...ProjectRoutes }]
  }
];
