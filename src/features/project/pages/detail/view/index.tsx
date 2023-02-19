import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "@/features/project/components/column";
import { Container } from "@/features/project/components/container";
import { StrictModeDroppable } from "@/features/project/libs/strict-mode-droppable";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../interface";
import { useDragDrop } from "../data";
import { useEffect, useState } from "react";
import { getProjectById } from "@/features/project/apis";

export const ProjectDetailPage = () => {
  const { projectId, project } = useLoaderData() as LoaderData;
  const { onDragEnd, state, setState } = useDragDrop({ project });
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await getProjectById(projectId ?? "");
      setState(response);
      setLastUpdated(new Date().toLocaleTimeString());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="m-0 h-full">
      <h1 className="m-10 mb-2 text-2xl font-bold">
        PROJECT {">"} {state.name.toLocaleUpperCase()}
      </h1>
      <p className="m-10 mt-0 mb-5">Last updated: {lastUpdated}</p>
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Container
              className="m-3 flex"
              innerRef={provided.innerRef}
              {...provided.droppableProps}
            >
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => state.tasks[taskId]
                );

                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
};
