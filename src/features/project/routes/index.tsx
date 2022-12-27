import { Route, Routes } from "react-router-dom";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { ProjectListPage } from "./ProjectListPage";

export const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="list" element={<ProjectListPage />} />
      <Route path="detail/:projectId" element={<ProjectDetailPage />} />
    </Routes>
  );
};
