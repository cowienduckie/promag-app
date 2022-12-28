import { ITask } from "@/features/project/types";
import { Container } from "@/features/project/components/container";
import { Draggable } from "react-beautiful-dnd";
import { memo } from "react";

type TaskProps = {
  task: ITask;
  index: number;
};

const Task = (props: TaskProps) => {
  const { task, index, ...otherProps } = props;

  return (
    <Draggable
      draggableId={task.id}
      index={index}
      key={task.id}
      {...otherProps}
    >
      {(provided, snapshot) => (
        <Container
          className={`my-2 w-full rounded p-4 ${
            snapshot.isDragging ? "bg-green-100" : "bg-white"
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default memo(Task);
