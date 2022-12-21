import { useRoutes } from "react-router-dom";
import { Landing } from "@/features/misc";
import { protectedRoutes } from "./protectedRoutes";
import { publicRoutes } from "./publicRoutes";

export const AppRoutes = () => {
  const auth = {
    user: null
  };

  const commonRoutes = [
    {
      path: "/",
      element: <Landing />
    }
  ];

  const routes = true ? protectedRoutes : publicRoutes;

  const elements = useRoutes([...routes, ...commonRoutes]);

  return <>{elements}</>;
};
