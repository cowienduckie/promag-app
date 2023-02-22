import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../interface";
import { ProjectProvider } from "@/features/project/contexts/projectContext";
import { KanbanBoard } from "@/features/project/components/kanban-board";

export const ProjectDetailPage = () => {
  const { project } = useLoaderData() as LoaderData;

  return (
    <ProjectProvider initialProject={project}>
      <div className="m-0 h-full">
        <h1 className="m-10 mb-5 text-2xl font-bold">
          PROJECT {">"} {project.name.toLocaleUpperCase()}
        </h1>
        <KanbanBoard />
      </div>
    </ProjectProvider>
  );
};
