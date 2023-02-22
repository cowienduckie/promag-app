import { StrictModeDroppable } from "@/features/project/libs/strict-mode-droppable";
import { Container } from "@/features/project/components/container";
import { Column } from "@/features/project/components/column";
import { DragDropContext } from "react-beautiful-dnd";
import { useDragDrop } from "@/features/project/pages/detail";

export const KanbanBoard = () => {
  const { onDragEnd, state } = useDragDrop();

  return (
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
