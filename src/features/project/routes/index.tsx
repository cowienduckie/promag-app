import { Route, Routes } from "react-router-dom";
import { ProjectView } from "./ProjectView";

export const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="list" element={<ProjectView />} />
    </Routes>
  );
};
