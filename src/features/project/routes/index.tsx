import { Route, Routes } from "react-router-dom";
import { ProjectDetailLoader } from "../containers/project-detail";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { ProjectListPage } from "./ProjectListPage";

export const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="list" element={<ProjectListPage />} />
      <Route
        path="detail/:projectId"
        element={<ProjectDetailPage />}
        loader={ProjectDetailLoader}
      />
    </Routes>
  );
};
