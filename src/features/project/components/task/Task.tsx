import { ITask } from "@/features/project/interfaces";
import { Container } from "@/features/project/components/container";
import { Draggable } from "react-beautiful-dnd";
import { memo } from "react";
import { Checkbox } from "antd";

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
          className={`my-2 rounded p-4 ${
            snapshot.isDragging ? "bg-green-100" : "bg-white"
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
        >
          <p>
            <strong>{task.content}</strong>
          </p>
          <Checkbox className="mt-5" checked={task.isCompleted}>
            Is Completed?
          </Checkbox>
        </Container>
      )}
    </Draggable>
  );
};

export default memo(Task);
