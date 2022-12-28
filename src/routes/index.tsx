import { Landing } from "@/features/misc";
import { protectedRoutes } from "./protectedRoutes";
import { publicRoutes } from "./publicRoutes";

export const AppRoutes = () => {
  const commonRoutes = [
    {
      path: "/",
      element: <Landing />
    }
  ];

  const routes = true ? protectedRoutes : publicRoutes;

  return [...routes, ...commonRoutes];
};
