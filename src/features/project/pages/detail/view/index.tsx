import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../interface";
import { ProjectProvider } from "@/features/project/contexts/projectContext";
import { KanbanBoard } from "@/features/project/components/kanban-board";
import { Button } from "antd";
import { useDisclosure } from "@/hooks/useDisclosure";
import { CustomRuleDrawer } from "@/features/project/components/custom-rule-drawer";

export const ProjectDetailPage = () => {
  const { project } = useLoaderData() as LoaderData;
  const { open, close, isOpen } = useDisclosure(false);

  return (
    <ProjectProvider initialProject={project}>
      <div className="m-0 h-full">
        <div className="justify m-10 mb-5 flex flex-row justify-between">
          <h1 className="text-2xl font-bold">
            PROJECT {">"} {project.name.toLocaleUpperCase()}
          </h1>
          <Button type="primary" onClick={open}>
            Custom Rules
          </Button>
        </div>
        <KanbanBoard />
        <CustomRuleDrawer isOpen={isOpen} close={close} project={project} />
      </div>
    </ProjectProvider>
  );
};
