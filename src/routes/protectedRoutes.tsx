import React from "react";
import { Loading } from "@/components/screens";
import { Outlet } from "react-router";

const App = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Outlet />
    </React.Suspense>
  );
};
export const protectedRoutes = [
  {
    path: "/app",
    element: <App />
  }
];
// Routes for logged in users
