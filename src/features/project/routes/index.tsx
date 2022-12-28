import { ProjectDetailLoader } from "../pages/detail/data";
import { ProjectDetailPage } from "../pages/detail";
import { ProjectListPage } from "../pages/list/ProjectListPage";

export const ProjectRoutes = {
  path: "projects/*",
  children: [
    {
      path: "list",
      element: <ProjectListPage />
    },
    {
      path: "detail/:projectId",
      element: <ProjectDetailPage />,
      loader: ProjectDetailLoader
    }
  ]
};
