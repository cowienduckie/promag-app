import { ProjectDetailPage, ProjectDetailLoader } from "../pages/detail";
import { ProjectListPage, ProjectListLoader } from "../pages/list";

export const ProjectRoutes = {
  path: "projects",
  children: [
    {
      index: true,
      element: <ProjectListPage />,
      loader: ProjectListLoader
    },
    {
      path: "detail/:projectId",
      element: <ProjectDetailPage />,
      loader: ProjectDetailLoader
    }
  ]
};
