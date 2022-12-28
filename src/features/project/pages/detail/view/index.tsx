import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "@/features/project/components/column";
import { Container } from "@/features/project/components/container";
import { StrictModeDroppable } from "@/features/project/libs/strict-mode-droppable";
import { useLoaderData } from "react-router-dom";
import { LoaderData } from "../interface";
import { useDragDrop } from "../data";

export const ProjectDetailPage = () => {
  const { project } = useLoaderData() as LoaderData;
  const { onDragEnd, state } = useDragDrop({ project });

  return (
    <div className="m-0 h-full">
      <h1 className="m-10 mb-5 text-2xl font-bold">
        PROJECT {">"} {project.name.toLocaleUpperCase()}
      </h1>
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
