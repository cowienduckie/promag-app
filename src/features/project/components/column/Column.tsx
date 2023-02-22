import { Container } from "@/features/project/components/container";
import { Task } from "@/features/project/components/task";
import { TaskList } from "@/features/project/components/tasks-list";
import { StrictModeDroppable } from "@/features/project/libs/strict-mode-droppable";
import { IColumn, ITask } from "@/features/project/types";
import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AddTaskModal } from "../add-task-modal";

type ColumnProps = {
  column: IColumn;
  tasks: ITask[];
  index: number;
};

const InnerTaskList = memo(({ tasks }: { tasks: ITask[] }) => (
  <>
    {tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ))}
  </>
));

const Column = (props: ColumnProps) => {
  const { column, tasks, index } = props;

  return (
    <Draggable key={column.id} draggableId={column.id} index={index}>
      {(provided) => (
        <Container
          className="m-5 flex max-h-fit w-1/4 min-w-fit flex-col rounded bg-gray-100 p-5"
          {...provided.draggableProps}
          innerRef={provided.innerRef}
        >
          <h1 className="mb-3 text-2xl font-bold" {...provided.dragHandleProps}>
            {column.name}
          </h1>
          <StrictModeDroppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                className={`flex flex-grow flex-col rounded p-3 
                  ${snapshot.isDraggingOver ? "bg-gray-400" : ""}`}
                innerRef={provided.innerRef}
                {...provided.droppableProps}
              >
                <InnerTaskList tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </StrictModeDroppable>
          <AddTaskModal column={column} />
        </Container>
      )}
    </Draggable>
  );
};

export default memo(Column);
