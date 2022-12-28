import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column } from "@/features/project/components/column";
import { Container } from "@/features/project/components/container";
import { StrictModeDroppable } from "@/features/project/libs/strict-mode-droppable";
import initialData from "@/features/project/initial-data";
import { useLoaderData } from "react-router-dom";
import { ProjectType } from "@/features/project/types";

export const ProjectDetailView = () => {
  const data = useLoaderData() as { project: ProjectType };

  console.log(data);

  const [state, setState] = useState(initialData);

  const onDragEnd = (result: DropResult): void => {
    const { draggableId, source, destination, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);

      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder
      };

      setState(newState);

      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      // Moving task in same column
      const newTaskIds = Array.from(start.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      };

      setState(newState);
    } else {
      // Move task from column to another
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);

      const newStart = {
        ...start,
        taskIds: startTaskIds
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);

      const newFinish = {
        ...finish,
        taskIds: finishTaskIds
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [start.id]: newStart,
          [finish.id]: newFinish
        }
      };

      setState(newState);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable
        droppableId="all-columns"
        direction="horizontal"
        type="column"
      >
        {(provided) => (
          <Container
            className="m-3 flex h-full"
            innerRef={provided.innerRef}
            {...provided.droppableProps}
          >
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns[columnId];
              const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

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
  );
};
